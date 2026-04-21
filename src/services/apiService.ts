const API_URL = '/api';

async function handleResponse(res: Response) {
  const contentType = res.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || `Request failed with status ${res.status}`);
    return data;
  } else {
    const text = await res.text();
    if (!res.ok) {
      console.error(`Non-JSON Error Response (${res.status}):`, text.substring(0, 200));
      throw new Error(`Server returned ${res.status}: ${text.substring(0, 50)}...`);
    }
    return text;
  }
}

export const authService = {
  async register(email: string, password: string) {
    const res = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    return handleResponse(res);
  },

  async login(email: string, password: string) {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    return handleResponse(res);
  },

  async loginWithGoogle(firebaseToken: string, email: string) {
    const res = await fetch(`${API_URL}/auth/google`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ firebaseToken, email }),
    });
    return handleResponse(res);
  }
};

export const progressService = {
  async getProgress(token: string) {
    const res = await fetch(`${API_URL}/progress`, {
      headers: { 'Authorization': `Bearer ${token}` },
    });
    return handleResponse(res);
  },

  async saveProgress(token: string, progress: any) {
    const res = await fetch(`${API_URL}/progress`, {
      method: 'POST',
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(progress),
    });
    return handleResponse(res);
  }
};
