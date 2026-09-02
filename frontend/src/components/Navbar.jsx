import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { BookOpen, Menu, X, Shield, MessageCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Courses', path: '/courses' },
    { name: 'Fees', path: '/pricing' },
    { name: 'Blogs', path: '/blog' },
    { name: 'Contact', path: '/contact' },
  ];

  const activeClass = "text-gold font-semibold border-b-2 border-gold pb-1";
  const inactiveClass = "text-slate-200 hover:text-gold transition-colors duration-200 font-medium pb-1";

  return (
    <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
      scrolled ? 'bg-emerald-950/95 backdrop-blur-md shadow-xl py-3 border-b border-emerald-800/40' : 'bg-emerald-950 py-4 border-b border-emerald-900/50'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-800 to-emerald-900 border border-gold/40 flex items-center justify-center shadow-md group-hover:border-gold transition-colors">
              <BookOpen className="w-5 h-5 text-gold" />
            </div>
            <div>
              <span className="text-lg sm:text-xl font-bold tracking-tight text-white block leading-tight font-serif uppercase">
                QURAN ONLINE <span className="text-gold font-normal">ACADEMIA</span>
              </span>
              <span className="text-[10px] text-emerald-300 tracking-wider uppercase font-sans">
                Bahawalpur, Pakistan
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) => (isActive ? activeClass : inactiveClass)}
                end={link.path === '/'}
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          {/* CTA & WhatsApp Button */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated && (
              <Link
                to="/admin/dashboard"
                className="flex items-center gap-1.5 text-xs text-gold border border-gold/30 hover:bg-gold/10 px-3 py-2 rounded-full transition-colors"
                title="Admin Dashboard"
              >
                <Shield className="w-3.5 h-3.5" />
                <span>Admin</span>
              </Link>
            )}

            {/* Green WhatsApp button (#395240) */}
            <a
              href="https://wa.me/923177479286"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#395240] hover:bg-[#2d4233] text-white text-sm font-semibold rounded-full shadow-md transition-all duration-300 border border-emerald-600/30"
            >
              <MessageCircle className="w-4 h-4 text-emerald-300" />
              <span>WhatsApp</span>
            </a>

            <Link
              to="/register"
              className="relative inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-emerald-950 transition-all duration-300 bg-gold rounded-full shadow-md hover:bg-gold-light"
            >
              Start Free Trial
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <a
              href="https://wa.me/923177479286"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-[#395240] text-white rounded-full text-xs font-semibold flex items-center justify-center"
              title="WhatsApp"
            >
              <MessageCircle className="w-4 h-4" />
            </a>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-slate-200 hover:text-gold focus:outline-none"
              aria-label="Toggle Navigation"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isOpen && (
        <div className="md:hidden bg-emerald-950 border-b border-emerald-800 px-4 pt-3 pb-6 mt-2 space-y-3 shadow-2xl animate-fadeIn">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `block py-2 text-base font-medium rounded-md px-3 ${
                  isActive ? 'bg-emerald-900 text-gold font-semibold' : 'text-slate-200 hover:bg-emerald-900/50 hover:text-gold'
                }`
              }
              end={link.path === '/'}
            >
              {link.name}
            </NavLink>
          ))}
          <div className="pt-2 border-t border-emerald-900/80 flex flex-col gap-2">
            {isAuthenticated && (
              <Link
                to="/admin/dashboard"
                className="w-full text-center py-2 text-sm text-gold bg-emerald-900/60 rounded-lg font-medium border border-gold/30"
              >
                Admin Dashboard
              </Link>
            )}
            <a
              href="https://wa.me/923177479286"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full text-center py-2.5 text-sm font-semibold text-white bg-[#395240] rounded-lg shadow hover:bg-[#2d4233] transition-colors flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              Chat on WhatsApp (+92 317 7479 286)
            </a>
            <Link
              to="/register"
              className="w-full text-center py-2.5 text-sm font-semibold text-emerald-950 bg-gold rounded-lg shadow hover:bg-gold-light transition-colors"
            >
              Start Free Trial
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
