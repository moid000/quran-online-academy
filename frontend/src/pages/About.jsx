import React from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, Target, Eye, Users, ShieldCheck, Globe, Sparkles, 
  GraduationCap, CheckCircle2, MessageCircle, ArrowRight
} from 'lucide-react';
import { motion } from 'framer-motion';
import SectionHeader from '../components/SectionHeader';
import GlassCard from '../components/GlassCard';
import AnimatedCounter from '../components/AnimatedCounter';

export default function About() {
  const stats = [
    { value: '5+', numericValue: 5, suffix: '+', label: 'Years Experience' },
    { value: '600+', numericValue: 600, suffix: '+', label: 'Active Students' },
    { value: '3000+', numericValue: 3000, suffix: '+', label: 'Students Taught' },
    { value: 'Certified', isText: true, label: 'Quran Educator' },
  ];

  const features = [
    {
      title: '1-on-1 Live Interactive Classes',
      description: 'Dedicated individual attention in every session, ensuring proper correction of Tajweed and articulation points.',
      icon: Users,
    },
    {
      title: 'Certified Male & Female Scholars',
      description: 'Qualified tutors trained in Tajweed, Qirat, and pedagogy, offering comfortable learning for sisters and kids.',
      icon: ShieldCheck,
    },
    {
      title: '24/7 Global Scheduling',
      description: 'Flexible class timings tailored to your local timezone in the USA, UK, Canada, Australia, and Middle East.',
      icon: Globe,
    },
    {
      title: 'Structured Curriculum',
      description: 'Step-by-step progress tracking from basic Qaida to complete Quran memorization and Tajweed mastery.',
      icon: BookOpen,
    },
    {
      title: 'Free 3-Day Trial',
      description: 'Experience our high-quality teaching and interactive virtual platform with no advance financial commitment.',
      icon: Sparkles,
    },
    {
      title: 'Multilingual Support',
      description: 'Instructors fluent in English, Urdu, and Arabic for clear communication with children and adults.',
      icon: GraduationCap,
    },
  ];

  return (
    <div className="pt-20 space-y-0 bg-white min-h-screen">
      
      {/* 1. HERO SECTION */}
      <section className="bg-slate-900 text-white py-20 lg:py-28 relative overflow-hidden text-center">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#345B46]/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl" />
        </div>
        <img
          src="https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=1920&q=80"
          alt="Quran Background"
          className="absolute inset-0 w-full h-full object-cover opacity-10 pointer-events-none"
        />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
        >
          <div className="text-amber-400 font-arabic text-2xl md:text-3xl mb-3">
            بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            About Our Academy
          </h1>
          <p className="text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Dedicated to spreading the light of Quran across the world since 2019
          </p>
        </motion.div>
      </section>

      {/* 2. MEET OUR FOUNDER SECTION */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#345B46]/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <SectionHeader
            title="Meet Our Founder"
            subtitle="Dedicated leadership in authentic Quranic education"
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Photo on left in rounded frame */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-5 flex justify-center"
            >
              <div className="relative rounded-3xl overflow-hidden border-4 border-amber-400/30 shadow-2xl bg-slate-900 max-w-md w-full group">
                <img
                  src="/images/founder.png"
                  alt="Ustaz Abdul Muhaymin"
                  className="w-full h-auto object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent p-6 text-center">
                  <h3 className="text-2xl font-bold text-white font-serif">Ustaz Abdul Muhaymin</h3>
                  <p className="text-amber-400 text-sm font-medium mt-1">Founder & Lead Instructor • Bahawalpur, Pakistan</p>
                </div>
              </div>
            </motion.div>

            {/* Text card on right with Arabic verse & stats grid */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-7 space-y-6"
            >
              <div className="backdrop-blur-xl bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-6">
                
                {/* Arabic Verse Card */}
                <div className="bg-amber-50/60 border-l-4 border-amber-500 p-5 rounded-r-xl space-y-2">
                  <p className="text-brand-green font-arabic text-2xl leading-loose text-right dir=&quot;rtl&quot;">
                    وَعَلَّمَكَ مَا لَمْ تَكُنْ تَعْلَمُ
                  </p>
                  <p className="text-slate-700 italic text-sm">
                    "And He taught you that which you knew not."
                  </p>
                  <span className="text-xs text-amber-700 font-semibold block uppercase tracking-wider">
                    — Surah An-Nisa (4:113)
                  </span>
                </div>

                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-slate-900">
                    Welcome to Quran Online Academy
                  </h3>
                  <p className="text-slate-700 leading-relaxed">
                    Founded by <strong>Ustaz Abdul Muhaymin</strong> in Bahawalpur, Pakistan, Quran Online Academy is dedicated to delivering high-caliber Quranic and Islamic instruction to Muslims around the world. With over 5+ years of dedicated teaching experience in Noorani Qaida, Nazra Quran, Tajweed rules, and Hifz memorization, Ustaz Abdul Muhaymin has fostered an academy built on authenticity, patience, and spiritual excellence.
                  </p>
                  <p className="text-slate-700 leading-relaxed">
                    Our mission is to make authentic Quran learning accessible to every household, ensuring students of all ages learn with correct pronunciation (Makharij) and a deep love for the Book of Allah.
                  </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-gray-100">
                  {stats.map((stat, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: idx * 0.1 }}
                      whileHover={{ y: -8, scale: 1.02 }}
                      className="bg-gray-50 p-4 rounded-xl text-center border border-gray-100"
                    >
                      <span className="text-2xl font-bold text-brand-green block">
                        {stat.isText ? stat.value : <AnimatedCounter value={stat.numericValue} suffix={stat.suffix} />}
                      </span>
                      <span className="text-xs text-slate-600 mt-1 block">{stat.label}</span>
                    </motion.div>
                  ))}
                </div>

                <div className="pt-2">
                  <a
                    href="https://wa.me/923177479286"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white rounded-full font-bold px-8 py-4 shadow-md transition-all duration-300"
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span>Connect on WhatsApp</span>
                  </a>
                </div>

              </div>
            </motion.div>

          </div>

        </div>
      </section>

      {/* 3. MISSION / VISION SECTION */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#345B46]/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <SectionHeader
            title="Our Mission & Vision"
            subtitle="Guiding principles behind Quran Online Academy"
          />

          <div className="grid md:grid-cols-2 gap-8">
            
            {/* Card 1: Mission */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="backdrop-blur-xl bg-white border border-gray-200 rounded-3xl p-6 shadow-sm flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-full bg-brand-green/10 text-brand-green flex items-center justify-center">
                  <Target className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">Our Mission</h3>
                <p className="text-slate-700 leading-relaxed">
                  To provide accessible, authentic, and high-quality 1-on-1 online Quranic education to children, adults, and families globally. We strive to nurture proper Tajweed recitation, spiritual understanding, and strong Islamic moral values in every student.
                </p>
              </div>
              <ul className="mt-6 space-y-2 pt-6 border-t border-gray-100 text-sm text-slate-700">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-green shrink-0" />
                  <span>Individualized 1-on-1 virtual classrooms</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-green shrink-0" />
                  <span>Preserving authentic Tajweed and Makharij</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-green shrink-0" />
                  <span>Flexible schedules tailored to every timezone</span>
                </li>
              </ul>
            </motion.div>

            {/* Card 2: Vision */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="backdrop-blur-xl bg-white border border-gray-200 rounded-3xl p-6 shadow-sm flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-full bg-brand-green/10 text-brand-green flex items-center justify-center">
                  <Eye className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">Our Vision</h3>
                <p className="text-slate-700 leading-relaxed">
                  To become a leading global online Quranic academy trusted by Muslim families worldwide, creating a vibrant generation connected deeply to the Holy Quran and applying its wisdom, mercy, and guidance in their daily lives.
                </p>
              </div>
              <ul className="mt-6 space-y-2 pt-6 border-t border-gray-100 text-sm text-slate-700">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-green shrink-0" />
                  <span>Empowering global Muslim communities</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-green shrink-0" />
                  <span>Cultivating love and reverence for Allah's Word</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-green shrink-0" />
                  <span>Highest standards of tutor qualification & care</span>
                </li>
              </ul>
            </motion.div>

          </div>

        </div>
      </section>

      {/* 4. WHY CHOOSE US SECTION */}
      <section className="py-20 bg-gray-50 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#345B46]/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <SectionHeader
            title="Why Choose Us"
            subtitle="What sets Quran Online Academy apart as your trusted learning partner"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feat, idx) => {
              const IconComp = feat.icon;
              return (
                <GlassCard
                  key={idx}
                  delay={idx * 0.1}
                  className="p-6 flex flex-col items-start space-y-4"
                >
                  <div className="w-12 h-12 rounded-full bg-brand-green text-white flex items-center justify-center shrink-0">
                    <IconComp className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">{feat.title}</h3>
                  <p className="text-slate-700 leading-relaxed text-sm">{feat.description}</p>
                </GlassCard>
              );
            })}
          </div>

        </div>
      </section>

      {/* 5. STATS SECTION */}
      <section className="py-16 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#345B46]/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl" />
        </div>
        <img
          src="https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=1920&q=80"
          alt="Quran Background"
          className="absolute inset-0 w-full h-full object-cover opacity-10 pointer-events-none"
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0 }}
            >
              <span className="text-4xl md:text-5xl font-extrabold text-amber-400 block mb-2">
                <AnimatedCounter value={5} suffix="+" />
              </span>
              <span className="text-slate-300 font-medium text-sm md:text-base">Years Experience</span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <span className="text-4xl md:text-5xl font-extrabold text-amber-400 block mb-2">
                <AnimatedCounter value={600} suffix="+" />
              </span>
              <span className="text-slate-300 font-medium text-sm md:text-base">Active Students</span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span className="text-4xl md:text-5xl font-extrabold text-amber-400 block mb-2">
                <AnimatedCounter value={3000} suffix="+" />
              </span>
              <span className="text-slate-300 font-medium text-sm md:text-base">Students Taught</span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <span className="text-4xl md:text-5xl font-extrabold text-amber-400 block mb-2">
                <AnimatedCounter value={100} suffix="%" />
              </span>
              <span className="text-slate-300 font-medium text-sm md:text-base">Satisfaction Rate</span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 6. CTA SECTION */}
      <section className="py-20 bg-slate-950 text-white relative overflow-hidden text-center">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#345B46]/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl" />
        </div>
        <img
          src="https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=1920&q=80"
          alt="Quran Background"
          className="absolute inset-0 w-full h-full object-cover opacity-10 pointer-events-none"
        />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6"
        >
          <div className="text-amber-400 font-arabic text-2xl mb-2">
            ﷽
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
            Ready to Start Your Quran Journey?
          </h2>
          <p className="text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto">
            Book your free 3-day trial class today and experience our interactive 1-on-1 teaching from certified Quran scholars.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              to="/register"
              className="bg-amber-500 hover:bg-amber-600 text-white rounded-full font-bold px-8 py-4 inline-flex items-center justify-center gap-2 shadow-lg transition-all"
            >
              <span>Start Free Trial Class</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href="https://wa.me/923177479286"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-brand-green hover:bg-[#2a4a38] text-white rounded-full font-bold px-8 py-4 inline-flex items-center justify-center gap-2 transition-all border border-brand-green/30"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Contact via WhatsApp</span>
            </a>
          </div>
        </motion.div>
      </section>

    </div>
  );
}
