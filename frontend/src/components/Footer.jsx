import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Facebook, Instagram, Youtube } from 'lucide-react';

const quickLinks = [
  { name: 'Home', path: '/' },
  { name: 'About Us', path: '/about' },
  { name: 'Courses', path: '/courses' },
  { name: 'Fees', path: '/fees' },
  { name: 'Blogs', path: '/blogs' },
  { name: 'Contact', path: '/contact' },
];

const courseLinks = [
  'Basic Qaidah',
  'Quran Reading (Nazra)',
  'Quran Memorization (Hifz)',
  'Tajweed Course',
  'Quran Translation',
  'Daily Duas & Kalimas',
  'Hadith Studies',
  'Islamic Studies',
];

const socialLinks = [
  { href: 'https://www.facebook.com/share/1AGStMPxry/', icon: Facebook, label: 'Facebook' },
  { href: 'https://www.instagram.com/quran_online_academia?igsh=MXM4M2NxMDhmMHI5cw==', icon: Instagram, label: 'Instagram' },
  { href: 'https://www.tiktok.com/@quranonlineacademia.com?_r=1&_t=ZT-98PF4IcNOJi', icon: 'tiktok', label: 'TikTok' },
  { href: 'https://youtube.com/@quran_online_academia?si=D2-F7qNs4-FLgJrR', icon: Youtube, label: 'YouTube' },
];

function TikTokIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.84-.1z" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="relative overflow-hidden">
      <div className="bg-white pt-20 pb-8 relative">
        <div className="absolute top-0 left-0 right-0 h-1 bg-brand-green" />
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">

            {/* Column 1: Logo & Description */}
            <div>
              <Link to="/" className="flex items-center gap-3 mb-6">
                <img
                  src="/images/logo-real.png"
                  onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/images/logo.png'; }}
                  alt="QURAN ONLINE ACADEMIA Logo"
                  loading="lazy"
                  className="h-20 w-auto brightness-110 contrast-110"
                />
              </Link>
              <p className="text-slate-600 text-sm mb-6 leading-relaxed">
                Spreading the light of the Holy Quran to students worldwide through personalized online classes with expert teachers.
              </p>
              <div className="flex gap-3">
                {socialLinks.map((social, idx) => (
                  <motion.a
                    key={idx}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-300 flex items-center justify-center text-slate-600 hover:text-brand-green hover:border-brand-green transition-all"
                    aria-label={social.label}
                  >
                    {social.icon === 'tiktok' ? <TikTokIcon className="w-5 h-5" /> : <social.icon className="w-5 h-5" />}
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Column 2: Quick Links */}
            <div>
              <h4 className="text-brand-green font-bold text-lg mb-6">Quick Links</h4>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.path}>
                    <Link to={link.path} className="text-slate-700 hover:text-brand-green transition-colors text-sm flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-green/50" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Our Courses */}
            <div>
              <h4 className="text-brand-green font-bold text-lg mb-6">Our Courses</h4>
              <ul className="space-y-3">
                {courseLinks.map((name) => (
                  <li key={name}>
                    <Link to="/courses" className="text-slate-700 hover:text-brand-green transition-colors text-sm flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-green/50" />
                      {name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: Contact Us */}
            <div>
              <h4 className="text-brand-green font-bold text-lg mb-6">Contact Us</h4>
              <div className="space-y-4">
                <a href="https://wa.me/923177479286" target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 group">
                  <div className="p-2 rounded-lg bg-brand-green/10 text-brand-green group-hover:bg-brand-green/20 transition-colors">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-slate-900 text-sm font-medium">+92 317 7479 286</p>
                    <p className="text-slate-600 text-xs">WhatsApp Available</p>
                  </div>
                </a>
                <a href="mailto:quranonlineacademia@gmail.com" className="flex items-start gap-3 group">
                  <div className="p-2 rounded-lg bg-brand-green/10 text-brand-green group-hover:bg-brand-green/20 transition-colors">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-slate-900 text-sm font-medium">quranonlineacademia@gmail.com</p>
                    <p className="text-slate-600 text-xs">Email us anytime</p>
                  </div>
                </a>
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-brand-green/10 text-brand-green">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-slate-900 text-sm font-medium">Bahawalpur, Pakistan</p>
                    <p className="text-slate-600 text-xs">Serving Students Worldwide</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-gray-200 pt-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-slate-600 text-sm text-center md:text-left">
                © {new Date().getFullYear()} QURAN ONLINE ACADEMIA. All rights reserved.
              </p>
              <div className="flex items-center gap-4 text-sm">
                <Link to="/privacy-policy" className="text-slate-600 hover:text-brand-green transition-colors">Privacy Policy</Link>
                <span className="text-slate-300">|</span>
                <Link to="/terms" className="text-slate-600 hover:text-brand-green transition-colors">Terms & Conditions</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
