import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Menu, X } from 'lucide-react';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About Us', path: '/about' },
  { name: 'Courses', path: '/courses' },
  { name: 'Fees', path: '/fees' },
  { name: 'Blogs', path: '/blogs' },
  { name: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'backdrop-blur-xl bg-white/95 border-b border-gray-200 shadow-md' : 'bg-white/80 backdrop-blur-md'
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-14 relative">

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-1.5 rounded-lg text-slate-700 hover:bg-gray-100 transition-colors order-1"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            {/* Logo */}
            <Link
              to="/"
              className="flex items-center gap-2 lg:order-1 order-2 absolute left-1/2 -translate-x-1/2 lg:static lg:translate-x-0"
              onClick={() => window.scrollTo(0, 0)}
            >
              <img
                src="/images/logo-real.png"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = '/images/logo.png';
                }}
                alt="QURAN ONLINE ACADEMIA"
                className="h-10 w-auto"
              />
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden lg:flex items-center gap-1 lg:order-2">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  end={link.path === '/'}
                  onClick={() => window.scrollTo(0, 0)}
                  className={({ isActive: active }) =>
                    `px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                      active ? 'bg-brand-green text-white' : 'text-slate-700 hover:text-brand-green hover:bg-gray-100'
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </div>

            {/* WhatsApp Button */}
            <div className="hidden lg:flex items-center gap-3 lg:order-3">
              <motion.a
                href="https://wa.me/923177479286"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-brand-green text-white font-medium text-sm shadow-md shadow-[#345B46]/30 hover:bg-[#2a4a38] transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp</span>
              </motion.a>
            </div>

            <div className="lg:hidden order-3 w-8" />
          </div>
        </div>
      </motion.header>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-14 z-40 lg:hidden"
          >
            <div className="bg-slate-900 border-b border-slate-700 shadow-xl">
              <div className="container mx-auto px-4 py-3 space-y-1">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    end={link.path === '/'}
                    onClick={() => {
                      setIsOpen(false);
                      window.scrollTo(0, 0);
                    }}
                    className={({ isActive: active }) =>
                      `block px-3 py-2.5 rounded-lg text-sm font-medium text-white transition-all ${
                        active ? 'bg-brand-green' : 'hover:bg-white/10'
                      }`
                    }
                  >
                    {link.name}
                  </NavLink>
                ))}
                <div className="pt-2 space-y-1">
                  <a
                    href="https://wa.me/923177479286"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg bg-brand-green text-white font-medium text-sm hover:bg-[#2a4a38]"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Contact on WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
