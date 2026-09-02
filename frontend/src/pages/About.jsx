import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Award, Users, Globe, ShieldCheck, CheckCircle2, MessageCircle, Mail } from 'lucide-react';

export default function About() {
  return (
    <div className="pt-24 pb-20 space-y-16 bg-slate-50">
      
      {/* Header Banner */}
      <section className="bg-hero-gradient text-white py-16 relative overflow-hidden text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-4">
          <span className="font-arabic text-3xl text-gold font-bold block">
            مَنْ سَلَكَ طَرِيقًا يَلْتَمِسُ فِيهِ عِلْمًا سَهَّلَ اللَّهُ لَهُ بِهِ طَرِيقًا إِلَى الْجَنَّةِ
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-serif text-white">
            About QURAN ONLINE ACADEMIA
          </h1>
          <p className="text-slate-300 text-base max-w-2xl mx-auto font-light">
            Dedicated to providing authentic, spiritual, and high-quality online Quranic education to students worldwide from Bahawalpur, Pakistan.
          </p>
        </div>
      </section>

      {/* Founder Story Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-white rounded-3xl p-8 sm:p-12 shadow-xl border border-slate-100">
          <div className="space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-800 bg-emerald-100 px-4 py-1.5 rounded-full">
              Leadership & Passion
            </span>
            <h2 className="text-3xl font-bold font-serif text-slate-900">
              Founded by Ustaz Abdul Muhaymin
            </h2>
            <p className="text-slate-600 leading-relaxed font-light">
              QURAN ONLINE ACADEMIA was established with a singular mission: to make authentic Quranic education accessible to every Muslim household worldwide, regardless of geographical barriers.
            </p>
            <p className="text-slate-600 leading-relaxed font-light">
              Based in Bahawalpur, Pakistan, Ustaz Abdul Muhaymin has accumulated over 5 years of experience in teaching Noorani Qaida, Nazra, Tajweed, and Hifz. Under his guidance, over 3,000 students have learned to recite the Quran with precision and beauty.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 text-center">
                <span className="text-2xl font-bold text-emerald-900 font-serif block">5+ Years</span>
                <span className="text-xs text-slate-600">Teaching Experience</span>
              </div>
              <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 text-center">
                <span className="text-2xl font-bold text-emerald-900 font-serif block">600+</span>
                <span className="text-xs text-slate-600">Active Students</span>
              </div>
              <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 text-center">
                <span className="text-2xl font-bold text-emerald-900 font-serif block">3000+</span>
                <span className="text-xs text-slate-600">Graduates</span>
              </div>
            </div>
          </div>

          <div className="bg-emerald-950 text-white rounded-3xl p-8 shadow-2xl border border-gold/30 text-center space-y-6">
            <div className="w-24 h-28 mx-auto rounded-2xl bg-emerald-900 border-2 border-gold flex items-center justify-center shadow-lg">
              <BookOpen className="w-12 h-12 text-gold" />
            </div>
            <h3 className="text-2xl font-bold font-serif text-gold">Ustaz Abdul Muhaymin</h3>
            <p className="text-xs uppercase tracking-widest text-emerald-300">Founder & Principal Scholar</p>
            <p className="text-slate-300 text-sm italic">
              "We treat each student with individualized care and spiritual devotion, ensuring they learn the Book of Allah with proper Tajweed and genuine understanding."
            </p>
            <a
              href="https://wa.me/923177479286"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#395240] hover:bg-[#2d4233] text-white font-bold text-sm rounded-xl transition-colors w-full"
            >
              <MessageCircle className="w-4 h-4" /> Contact Ustaz via WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Core Values / Why Choose Us */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <h2 className="text-3xl font-bold font-serif text-slate-900">Why Choose Our Academy?</h2>
          <p className="text-slate-600">Discover what makes QURAN ONLINE ACADEMIA a trusted choice globally.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl shadow-md border border-slate-100 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
              <Users className="w-6 h-6 text-emerald-800" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 font-serif">1-on-1 Live Sessions</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Every student gets 100% individual attention. No crowded classrooms or rushed lessons.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-md border border-slate-100 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6 text-emerald-800" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 font-serif">Certified Male & Female Scholars</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Qualified tutors trained in Tajweed and pedagogy, offering comfortable instruction for sisters and children.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-md border border-slate-100 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-gold/20 text-gold flex items-center justify-center">
              <Globe className="w-6 h-6 text-amber-700" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 font-serif">24/7 Global Scheduling</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Flexible timing tailored to USA, UK, Canada, Australia, and Middle East time zones.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-emerald-950 text-white rounded-3xl p-10 text-center space-y-6 shadow-2xl border border-gold/30">
          <h2 className="text-3xl font-bold font-serif text-white">Ready to Start Your Quran Journey?</h2>
          <p className="text-slate-300 text-base max-w-xl mx-auto">
            Book your free 3-day trial class today and experience our interactive 1-on-1 teaching.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              to="/register"
              className="px-8 py-3.5 bg-gold hover:bg-gold-light text-emerald-950 font-bold text-sm rounded-full shadow-lg"
            >
              Start Free Trial Class
            </Link>
            <Link
              to="/courses"
              className="px-8 py-3.5 bg-emerald-900 hover:bg-emerald-800 text-gold font-bold text-sm rounded-full border border-gold/30"
            >
              View Available Courses
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
