import React, { useState, useEffect, useCallback } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Mail,
  BookOpen,
  FileText,
  Settings,
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { getUnreadRegistrationsCount, markAllRegistrationsRead } from '../api/students';
import { getUnreadMessagesCount } from '../api/contact';

export default function AdminLayout({ children, title, subtitle }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout, token } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [unread, setUnread] = useState({ registrations: 0, messages: 0 });

  const refreshUnread = useCallback(async () => {
    if (!token) return;
    try {
      const [regCount, msgCount] = await Promise.all([
        getUnreadRegistrationsCount(token),
        getUnreadMessagesCount(token),
      ]);
      setUnread({ registrations: regCount, messages: msgCount });
    } catch (err) {
      console.error('Failed to fetch unread counts:', err);
    }
  }, [token]);

  // Poll for new registrations/messages every 30s + refresh on demand
  useEffect(() => {
    refreshUnread();
    const interval = setInterval(refreshUnread, 30000);
    const onRefresh = () => refreshUnread();
    window.addEventListener('qoa:refresh-notifications', onRefresh);
    return () => {
      clearInterval(interval);
      window.removeEventListener('qoa:refresh-notifications', onRefresh);
    };
  }, [refreshUnread]);

  // Opening the Registrations page marks all registrations as read
  useEffect(() => {
    if (token && location.pathname.startsWith('/admin/students')) {
      markAllRegistrationsRead(token).then(() => refreshUnread());
    }
  }, [token, location.pathname, refreshUnread]);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Registrations', path: '/admin/students', icon: Users },
    { name: 'Messages', path: '/admin/messages', icon: Mail },
    { name: 'Courses', path: '/admin/courses', icon: BookOpen },
    { name: 'Blog Posts', path: '/admin/blog', icon: FileText },
    { name: 'Settings', path: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#0f172a] flex flex-col md:flex-row text-slate-300">

      {/* Mobile Top Header */}
      <div className="md:hidden bg-[#111a2e] text-white px-4 py-3 flex items-center justify-between border-b border-slate-800 sticky top-0 z-40">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
            <BookOpen className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-sm">Admin Panel</span>
        </div>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 text-slate-300 hover:text-white rounded-lg focus:outline-none"
        >
          {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar Overlay for Mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:sticky top-0 left-0 z-50 h-screen w-64 bg-[#111a2e] flex flex-col justify-between transition-transform duration-300 ease-in-out shrink-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div>
          {/* Brand */}
          <div className="p-5 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shrink-0">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <div className="overflow-hidden">
              <h2 className="font-bold text-white text-sm leading-tight truncate">Admin Panel</h2>
              <span className="text-xs text-slate-500 truncate block">Quran Online Academia</span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="px-3 mt-2 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 ${
                      isActive
                        ? 'bg-amber-500/15 text-amber-400'
                        : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'
                    }`
                  }
                >
                  <Icon className="w-4.5 h-4.5 shrink-0" />
                  <span>{item.name}</span>
                  {(item.name === 'Registrations' && unread.registrations > 0) ||
                  (item.name === 'Messages' && unread.messages > 0) ? (
                    <span className="ml-auto flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full bg-amber-400 text-[11px] font-bold text-slate-900 animate-pulse">
                      {item.name === 'Registrations' ? unread.registrations : unread.messages}
                    </span>
                  ) : null}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Footer: Logout */}
        <div className="p-4">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-sm text-slate-400 hover:bg-white/5 hover:text-red-400 transition-colors w-full"
          >
            <LogOut className="w-4.5 h-4.5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <main className="p-4 sm:p-6 lg:p-8 flex-1">
          <div className="mb-6">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">{title}</h1>
            {subtitle && <p className="text-slate-400 text-sm mt-1">{subtitle}</p>}
          </div>
          {children}
        </main>
      </div>

    </div>
  );
}
