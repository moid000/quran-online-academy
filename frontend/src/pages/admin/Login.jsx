import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { BookOpen, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/admin/dashboard';

  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!username.trim() || !password.trim()) {
      setError('Please enter both email/username and password');
      return;
    }

    setIsSubmitting(true);

    try {
      await login({ username, password });
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message || 'Invalid credentials. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-[#1c2536] rounded-[2rem] p-10 shadow-2xl">

          {/* Icon */}
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center mx-auto shadow-lg shadow-orange-900/40">
            <BookOpen className="w-9 h-9 text-white" strokeWidth={2} />
          </div>

          {/* Heading */}
          <h1 className="text-3xl font-extrabold text-white text-center mt-6">
            Admin Login
          </h1>
          <p className="text-slate-400 text-sm text-center mt-2">
            Enter your credentials to access the admin panel
          </p>

          {error && (
            <div className="mt-6 p-4 bg-red-500/10 border border-red-500/30 rounded-2xl text-red-400 text-sm font-medium flex items-center gap-3">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 mt-8">
            <input
              type="text"
              name="admin_username_field"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Email or Username"
              required
              autoComplete="off"
              className="w-full px-5 py-4 bg-slate-100 border-none rounded-xl text-slate-900 placeholder-slate-500 text-base focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all"
            />

            <input
              type="password"
              name="admin_password_field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              autoComplete="new-password"
              className="w-full px-5 py-4 bg-slate-100 border-none rounded-xl text-slate-900 placeholder-slate-500 text-base focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all"
            />

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-bold text-base rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50 mt-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Logging in...</span>
                </>
              ) : (
                <span>Login</span>
              )}
            </button>
          </form>

        </div>
      </div>
    </div>
  );
}
