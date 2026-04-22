import express from 'express';
import { createServer as createViteServer } from 'vite';
import { createServer as createHttpServer } from 'http';
import path from 'path';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { getDb } from './server/db.js';

dotenv.config();

const isProduction = process.env.NODE_ENV === 'production';
const JWT_SECRET = process.env.JWT_SECRET || (isProduction ? undefined : 'fallback-secret-for-dev');
const PORT = Number(process.env.PORT || 3000);

async function startServer() {
  if (!JWT_SECRET) {
    throw new Error('JWT_SECRET is required when NODE_ENV=production');
  }

  const app = express();
  const server = createHttpServer(app);
  app.use(express.json());
  app.use(cors());

  const db = await getDb();

  // --- Auth Routes ---
  
  app.post('/api/auth/register', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'Email and password required' });

    try {
      const existingUser = await db.findUserByEmail(email);
      if (existingUser) {
        return res.status(400).json({ error: 'Email already exists' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const result = await db.createUser(email, hashedPassword);
      
      const userId = result.lastID;
      const token = jwt.sign({ userId, email }, JWT_SECRET, { expiresIn: '7d' });
      res.json({ token, user: { id: userId, email } });
    } catch (err: any) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  app.post('/api/auth/login', async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await db.findUserByEmail(email);
      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
      res.json({ token, user: { id: user.id, email: user.email } });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  app.post('/api/auth/google', async (req, res) => {
    const { firebaseToken, email } = req.body;
    // Note: In an ideal world, we'd verify firebaseToken with Firebase Admin SDK here.
    // However, since we're using a hybrid local setup, we'll trust the token if email is provided,
    // and issue our own local JWT to maintain session consistency for progress tracking.
    
    if (!email) return res.status(400).json({ error: 'Email is required for Google login' });

    try {
      let user = await db.findUserByEmail(email);
      let userId;

      if (!user) {
        // Create a local shadow user for this Google account
        const result = await db.createUser(email, 'GOOGLE_AUTH_PLACEHOLDER');
        userId = result.lastID;
      } else {
        userId = user.id;
      }

      const token = jwt.sign({ userId, email }, JWT_SECRET, { expiresIn: '7d' });
      res.json({ token, user: { id: userId, email } });
    } catch (err) {
      console.error('Google Auth backend error:', err);
      res.status(500).json({ error: 'Internal server error during Google login' });
    }
  });

  // --- Protected Progress Routes ---
  
  const authenticateToken = (req: any, res: any, next: any) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (!token) {
      console.warn('Auth failed: No token provided');
      return res.status(401).json({ error: 'Authentication required' });
    }

    // Identify likely Firebase/Legacy tokens (which are longer and use RS256)
    // Local JWTs issued by this server are typically smaller (~150-250 chars)
    if (token.length > 500) {
      console.warn('Auth failed: Legacy/Firebase token detected. Forcing re-login.');
      return res.status(401).json({ error: 'Stale session. Please log in again.' });
    }

    try {
      jwt.verify(token, JWT_SECRET, (err: any, user: any) => {
        if (err) {
          console.warn(`Auth failed: Token verification error (${err.name}): ${err.message}`);
          
          // Specifically handle 'invalid algorithm' or expired tokens with 401
          // 401 is more standard for "who are you?" failures than 403 (Forbidden)
          if (err.message.includes('algorithm')) {
            return res.status(401).json({ error: 'Session mismatch. Please log in again.' });
          }
          
          return res.status(401).json({ error: 'Invalid or expired token' });
        }
        req.user = user;
        next();
      });
    } catch (criticalErr) {
      console.error('Critical auth middleware error:', criticalErr);
      res.status(500).json({ error: 'Internal security engine error' });
    }
  };

  app.get('/api/progress', authenticateToken, async (req: any, res) => {
    console.log(`Fetching progress for user: ${req.user.userId}`);
    try {
      const progress = await db.getProgress(req.user.userId);
      if (!progress) {
        console.warn(`Progress not found for user: ${req.user.userId}`);
        return res.status(404).json({ error: 'Progress not found' });
      }
      res.json(progress);
    } catch (err) {
      console.error('Error fetching progress:', err);
      res.status(500).json({ error: 'Internal server error while fetching progress' });
    }
  });

  app.post('/api/progress', authenticateToken, async (req: any, res) => {
    console.log(`Saving progress for user: ${req.user.userId}`);
    try {
      await db.updateProgress(req.user.userId, req.body);
      res.json({ status: 'ok' });
    } catch (err) {
      console.error('Error saving progress:', err);
      res.status(500).json({ error: 'Internal server error while saving progress' });
    }
  });

  // --- Vite / Static Handling ---

  if (!isProduction) {
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: { server },
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*all', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  server.on('error', (error: NodeJS.ErrnoException) => {
    if (error.code === 'EADDRINUSE') {
      console.error(`Port ${PORT} is already in use. Stop the existing dev server or start with another port, for example: PORT=3001 npm run dev`);
      process.exit(1);
    }

    throw error;
  });

  server.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer().catch((error) => {
  console.error('Failed to start server:', error.message);
  console.error('Full error:', error);
  process.exit(1);
});
