import { JSONFilePreset } from 'lowdb/node';
import fs from 'fs';
import path from 'path';
import type { UserProgress } from '../src/types';

interface User {
  id: number;
  email: string;
  password: string;
  created_at: string;
}

interface DBData {
  users: User[];
  user_progress: Record<number, UserProgress>;
}

const defaultData: DBData = { 
  users: [], 
  user_progress: {} 
};

let dbInstance: any = null;

export async function getDb() {
  if (dbInstance) return dbInstance;

  const dbPath = process.env.AIRFRAME_DB_PATH || path.join(process.cwd(), 'database.json');
  fs.mkdirSync(path.dirname(dbPath), { recursive: true });
  const db = await JSONFilePreset<DBData>(dbPath, defaultData);
  
  dbInstance = {
    data: db.data,
    
    // User operations
    async findUserByEmail(email: string) {
      return db.data.users.find(u => u.email === email);
    },
    
    async findUserById(id: number) {
      return db.data.users.find(u => u.id === id);
    },
    
    async createUser(email: string, passwordHash: string) {
      const id = Date.now();
      const newUser: User = {
        id,
        email,
        password: passwordHash,
        created_at: new Date().toISOString()
      };
      db.data.users.push(newUser);
      
      // Initialize progress
      db.data.user_progress[id] = {
        totalXp: 0,
        streakDays: 0,
        level: 1,
        completedLessonIds: [],
        quizHistory: [],
        achievements: []
      } as any;
      
      await db.write();
      return { lastID: id };
    },
    
    // Progress operations
    async getProgress(userId: number) {
      return db.data.user_progress[userId];
    },
    
    async updateProgress(userId: number, progress: any) {
      db.data.user_progress[userId] = {
        ...db.data.user_progress[userId],
        ...progress
      };
      await db.write();
    }
  };

  return dbInstance;
}
