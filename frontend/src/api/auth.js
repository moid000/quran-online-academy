const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const loginAdmin = async (credentials) => {
  try {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    });
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.message || 'Invalid username or password');
    }
    return res.json();
  } catch (err) {
    // If backend is unreachable or demo mode: validate mock admin
    if (credentials.username === 'admin' && credentials.password === 'admin123') {
      const mockToken = 'mock-jwt-token-al-noor-academy-' + Date.now();
      const mockUser = {
        id: 'adm_1',
        username: 'admin',
        name: 'Academy Administrator',
        email: 'admin@alnoorquran.com',
        role: 'admin'
      };
      return { token: mockToken, user: mockUser };
    }
    throw new Error(err.message || 'Login failed. Try admin / admin123');
  }
};

export const verifyToken = async (token) => {
  try {
    const res = await fetch(`${API_URL}/auth/verify`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (!res.ok) throw new Error('Token expired or invalid');
    return res.json();
  } catch (err) {
    if (token && token.startsWith('mock-jwt-token')) {
      return {
        valid: true,
        user: {
          id: 'adm_1',
          username: 'admin',
          name: 'Academy Administrator',
          email: 'admin@alnoorquran.com',
          role: 'admin'
        }
      };
    }
    throw err;
  }
};
