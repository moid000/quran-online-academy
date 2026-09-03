const API_URL = import.meta.env.VITE_API_URL || 'https://quran-online-academy-production.up.railway.app/api';

export const loginAdmin = async (credentials) => {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials)
  });
  const result = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(result.message || 'Invalid username or password');
  }
  // Backend returns { success, token, admin } - map admin -> user for AuthContext
  return { token: result.token, user: result.admin };
};

export const verifyToken = async (token) => {
  const res = await fetch(`${API_URL}/auth/me`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const result = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(result.message || 'Token expired or invalid');
  }
  // Backend returns { success, admin } - map admin -> user for AuthContext
  return { user: result.admin };
};
