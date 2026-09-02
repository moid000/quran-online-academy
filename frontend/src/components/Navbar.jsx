import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { MessageCircle, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Courses', path: '/courses' },
    { name: 'Fees', path: '/fees' },
    { name: 'Blogs', path: '/blogs' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <>
      <header className="fixed top-0 w-full bg-white shadow-sm z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-brand-green flex items-center justify-center text-white shadow-sm shrink-0">
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M12 2L9.5 6H14.5L12 2ZM12 7C9.2 7 7 9.2 7 12V20H17V12C17 9.2 14.8 7 12 7ZM10 14H14V20H10V14ZM4 12V20H6V12H4ZM18 12V20H20V12H18ZM5 10L3 12H6L5 10ZM19 10L18 12H21L19 10Z" />
              </svg>
            </div>
            <span className="font-bold text-slate-900 text-base sm:text-lg md:text-xl tracking-tight">
              QURAN ONLINE ACADEMY
            </span>
          </Link>

          {/* Desktop Nav Links Centered */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.path === '/'}
                className={({ isActive }) =>
                  isActive
                    ? 'text-brand-green font-medium'
                    : 'text-slate-700 hover:text-brand-green transition-colors'
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          {/* Right WhatsApp Button */}
          <div className="hidden md:flex items-center">
            <a
              href="https://wa.me/923177479286"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-green text-white font-medium text-sm shadow-lg shadow-[#345B46]/30 hover:bg-[#2a4a38] transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-slate-700 hover:text-brand-green focus:outline-none"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        {isOpen && (
          <div className="md:hidden bg-white border-b border-gray-100 px-4 pt-2 pb-6 space-y-3 shadow-lg">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.path === '/'}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `block py-2 text-base font-medium rounded-md px-3 ${
                    isActive
                      ? 'text-brand-green font-medium bg-emerald-50'
                      : 'text-slate-700 hover:text-brand-green hover:bg-gray-50'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
            <div className="pt-2 border-t border-gray-100">
              <a
                href="https://wa.me/923177479286"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="w-full flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-brand-green text-white font-medium text-sm shadow-lg shadow-[#345B46]/30 hover:bg-[#2a4a38] transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp (+92 317 7479 286)</span>
              </a>
            </div>
          </div>
        )}
      </header>
      {/* Spacer for fixed top navbar */}
      <div className="h-20" />
    </>
  );
}
