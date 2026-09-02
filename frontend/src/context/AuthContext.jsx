import React, { createContext, useContext, useState, useEffect } from 'react';
import { loginAdmin, verifyToken } from '../api/auth';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem('quran_admin_token') || null);
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('quran_admin_user');
    return stored ? JSON.parse(stored) : null;
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      if (token) {
        try {
          const data = await verifyToken(token);
          if (data.user) {
            setUser(data.user);
          }
        } catch (err) {
          console.error('Session expired or invalid token:', err);
          logout();
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, [token]);

  const login = async (credentials) => {
    const data = await loginAdmin(credentials);
    if (data.token) {
      setToken(data.token);
      setUser(data.user);
      localStorage.setItem('quran_admin_token', data.token);
      localStorage.setItem('quran_admin_user', JSON.stringify(data.user));
    }
    return data;
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('quran_admin_token');
    localStorage.removeItem('quran_admin_user');
  };

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider value={{ token, user, isAuthenticated, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
