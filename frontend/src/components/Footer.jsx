import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, MessageCircle } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Column 1: Logo & Description */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-brand-green flex items-center justify-center text-white shadow-sm shrink-0">
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2L9.5 6H14.5L12 2ZM12 7C9.2 7 7 9.2 7 12V20H17V12C17 9.2 14.8 7 12 7ZM10 14H14V20H10V14ZM4 12V20H6V12H4ZM18 12V20H20V12H18ZM5 10L3 12H6L5 10ZM19 10L18 12H21L19 10Z" />
                </svg>
              </div>
              <span className="font-bold text-white text-lg tracking-tight uppercase">
                QURAN ONLINE ACADEMIA
              </span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed">
              Spreading the light of the Holy Quran to students worldwide through personalized online classes with expert teachers.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="text-slate-300 hover:text-amber-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-slate-300 hover:text-amber-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/courses" className="text-slate-300 hover:text-amber-400 transition-colors">
                  Courses
                </Link>
              </li>
              <li>
                <Link to="/fees" className="text-slate-300 hover:text-amber-400 transition-colors">
                  Fees
                </Link>
              </li>
              <li>
                <Link to="/blogs" className="text-slate-300 hover:text-amber-400 transition-colors">
                  Blogs
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-slate-300 hover:text-amber-400 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Our Courses */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Our Courses</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/courses/basic-qaidah" className="text-slate-300 hover:text-amber-400 transition-colors">
                  Basic Qaidah
                </Link>
              </li>
              <li>
                <Link to="/courses/quran-reading-nazra" className="text-slate-300 hover:text-amber-400 transition-colors">
                  Quran Reading (Nazra)
                </Link>
              </li>
              <li>
                <Link to="/courses/quran-memorization-hifz" className="text-slate-300 hover:text-amber-400 transition-colors">
                  Quran Memorization (Hifz)
                </Link>
              </li>
              <li>
                <Link to="/courses/tajweed-course" className="text-slate-300 hover:text-amber-400 transition-colors">
                  Tajweed Course
                </Link>
              </li>
              <li>
                <Link to="/courses/quran-translation-tafseer" className="text-slate-300 hover:text-amber-400 transition-colors">
                  Quran Translation
                </Link>
              </li>
              <li>
                <Link to="/courses/daily-duas-kalimas" className="text-slate-300 hover:text-amber-400 transition-colors">
                  Daily Duas & Kalimas
                </Link>
              </li>
              <li>
                <Link to="/courses/hadith-studies" className="text-slate-300 hover:text-amber-400 transition-colors">
                  Hadith Studies
                </Link>
              </li>
              <li>
                <Link to="/courses/islamic-studies" className="text-slate-300 hover:text-amber-400 transition-colors">
                  Islamic Studies
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Us */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-3 text-slate-300">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <a href="https://wa.me/923177479286" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition-colors">
                  +92 317 7479 286 <span className="text-slate-400 text-xs">(WhatsApp Available)</span>
                </a>
              </li>
              <li className="flex items-center gap-3 text-slate-300">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <a href="mailto:quranonlineacademia@gmail.com" className="hover:text-amber-400 transition-colors">
                  quranonlineacademia@gmail.com <span className="text-slate-400 text-xs">(Email us anytime)</span>
                </a>
              </li>
              <li className="flex items-start gap-3 text-slate-300">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>Bahawalpur, Pakistan <span className="text-slate-400 text-xs block">(Serving Students Worldwide)</span></span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/10 text-center text-xs text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 QURAN ONLINE ACADEMIA. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link to="/contact" className="hover:text-amber-400 transition-colors">Privacy Policy</Link>
            <span>|</span>
            <Link to="/contact" className="hover:text-amber-400 transition-colors">Terms & Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
