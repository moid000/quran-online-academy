import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Mail, Phone, MapPin, MessageCircle, Shield, ArrowRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-emerald-950 text-slate-300 pt-16 pb-8 border-t border-emerald-900/60 relative overflow-hidden">
      {/* Decorative Islamic Pattern Overlay */}
      <div className="absolute inset-0 bg-islamic-pattern opacity-30 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Column 1: Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-900 border border-gold/40 flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-gold" />
              </div>
              <span className="text-xl font-bold font-serif text-white tracking-wide uppercase">
                QURAN ONLINE <span className="text-gold font-normal">ACADEMIA</span>
              </span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Premium online Quran academy dedicated to providing authentic 1-on-1 Quran, Tajweed, Hifz, and Islamic education worldwide under expert teachers.
            </p>
            <div className="pt-2">
              <span className="font-arabic text-lg text-gold/90 block">
                بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
              </span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-base mb-4 border-b border-emerald-800/80 pb-2 inline-block">
              Quick Navigation
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="hover:text-gold transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-gold" /> Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-gold transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-gold" /> About Us
                </Link>
              </li>
              <li>
                <Link to="/courses" className="hover:text-gold transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-gold" /> Courses
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="hover:text-gold transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-gold" /> Fee Structure
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-gold transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-gold" /> Our Blog
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-gold transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-gold" /> Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Featured Courses */}
          <div>
            <h3 className="text-white font-semibold text-base mb-4 border-b border-emerald-800/80 pb-2 inline-block">
              Our Courses
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/courses/basic-qaidah" className="hover:text-gold transition-colors">
                  Basic Qaidah
                </Link>
              </li>
              <li>
                <Link to="/courses/quran-reading-nazra" className="hover:text-gold transition-colors">
                  Quran Reading Nazra
                </Link>
              </li>
              <li>
                <Link to="/courses/quran-memorization-hifz" className="hover:text-gold transition-colors">
                  Quran Memorization Hifz
                </Link>
              </li>
              <li>
                <Link to="/courses/tajweed-course" className="hover:text-gold transition-colors">
                  Tajweed Course
                </Link>
              </li>
              <li>
                <Link to="/courses/quran-translation-tafseer" className="hover:text-gold transition-colors">
                  Quran Translation & Tafseer
                </Link>
              </li>
              <li>
                <Link to="/courses/daily-duas-kalimas" className="hover:text-gold transition-colors">
                  Daily Duas & Kalimas
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div>
            <h3 className="text-white font-semibold text-base mb-4 border-b border-emerald-800/80 pb-2 inline-block">
              Get In Touch
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-gold shrink-0 mt-1" />
                <span>Bahawalpur, Pakistan</span>
              </li>
              <li className="flex items-center gap-3">
                <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href="https://wa.me/923177479286" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors">
                  +92 317 7479 286
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-gold shrink-0" />
                <a href="mailto:quranonlineacademia@gmail.com" className="hover:text-gold transition-colors">
                  quranonlineacademia@gmail.com
                </a>
              </li>
            </ul>

            <div className="mt-6 pt-4 border-t border-emerald-900/60 flex items-center justify-between">
              <Link
                to="/admin/login"
                className="text-xs text-slate-400 hover:text-gold transition-colors flex items-center gap-1.5"
              >
                <Shield className="w-3.5 h-3.5 text-gold" /> Admin Panel
              </Link>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-emerald-900/80 text-center text-xs text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} QURAN ONLINE ACADEMIA. All Rights Reserved.</p>
          <div className="flex items-center gap-4 text-slate-400">
            <Link to="/register" className="hover:text-gold transition-colors">Register Student</Link>
            <span>•</span>
            <Link to="/pricing" className="hover:text-gold transition-colors">Fee Structure</Link>
            <span>•</span>
            <Link to="/contact" className="hover:text-gold transition-colors">Free Trial Class</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
