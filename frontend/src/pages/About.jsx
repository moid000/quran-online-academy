import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Heart, Users, Target, Clock, Globe, CheckCircle2, MessageCircle } from 'lucide-react';
import SectionHeader from '../components/SectionHeader';
import GlassCard from '../components/GlassCard';
import AnimatedButton from '../components/AnimatedButton';

const ourValues = [
  { icon: BookOpen, title: 'Authentic Teaching', desc: 'Quran education based on authentic sources with proper Tajweed' },
  { icon: Heart, title: 'Spiritual Connection', desc: 'Building a deep connection between students and the Holy Quran' },
  { icon: Users, title: 'Personal Attention', desc: 'One-on-one classes ensuring individual focus and progress' },
  { icon: Target, title: 'Goal Oriented', desc: 'Structured curriculum to achieve specific learning objectives' },
];

const whyChooseUs = [
  'Qualified Male & Female Teachers',
  'Flexible Class Timings',
  '24/7 WhatsApp Support',
  'Free Trial Classes',
  'Certificate Upon Completion',
  'Progress Tracking',
  'Affordable Fee Structure',
  'International Students Welcome',
  'English, Spanish, Urdu, and Punjabi Speaking Teachers Available',
  'Personalized Learning Plans for Each Student',
  'Regular Assessments and Performance Feedback',
  'Modern Teaching Methods with Interactive Sessions',
];

export default function About() {
  return (
    <div className="pt-20">

      {/* 1. HERO SECTION */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900" />
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=1920&q=80')] bg-cover bg-center opacity-10" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-amber-400 font-arabic text-2xl mb-4"
            >
              بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-bold text-white mb-6"
            >
              About Our Academy
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-slate-300 text-lg"
            >
              Dedicated to spreading the light of Quran across the world since 2019
            </motion.p>
          </div>
        </div>
      </section>

      {/* 2. OUR STORY SECTION */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* Image left - rotated frame */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative aspect-square max-w-lg mx-auto">
                <div className="absolute inset-0 bg-gradient-to-br from-[#345B46]/20 to-emerald-500/20 rounded-3xl transform rotate-6" />
                <div className="absolute inset-0 backdrop-blur-xl bg-white rounded-3xl border border-gray-200 overflow-hidden transform -rotate-3 shadow-xl">
                  <img
                    src="https://images.unsplash.com/photo-1585036156171-384164a8c675?w=800&q=80"
                    alt="Quran Learning - Students studying the Holy Quran online"
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </motion.div>

            {/* Text right */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <SectionHeader title="Our Story" subtitle="" center={false} />

              {/* Arabic verse card */}
              <div className="backdrop-blur-xl bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                <p className="text-brand-green font-arabic text-xl mb-2 text-right">
                  "خَيْرُكُمْ مَنْ تَعَلَّمَ الْقُرْآنَ وَعَلَّمَهُ"
                </p>
                <p className="text-slate-700 italic text-sm">
                  "The best among you are those who learn the Quran and teach it"
                </p>
                <p className="text-brand-green text-xs mt-1 font-medium">— Sahih Bukhari</p>
              </div>

              <p className="text-slate-700 leading-relaxed">
                QURAN ONLINE ACADEMIA was founded by{' '}
                <span className="text-brand-green font-semibold">Ustaz Abdul Muhaymin</span>
                {' '}with a vision to make Quranic education accessible to everyone, regardless of their location. What started as a small initiative has now grown into an international platform serving students across the globe through comprehensive Quran studies, Arabic language instruction, Tajweed mastery, Hifz programs, and deep Quranic translation and interpretation.
              </p>

              <p className="text-slate-700 leading-relaxed">
                With over{' '}
                <span className="text-brand-green font-semibold">5 years of teaching experience</span>
                {' '}and having taught more than{' '}
                <span className="text-brand-green font-semibold">3000 students worldwide</span>
                {', we understand that each student is unique. Our team of '}
                <span className="text-brand-green font-semibold">qualified teachers</span>
                {' provides personalized attention through '}
                <span className="text-brand-green font-semibold">interactive learning methods</span>
                , ensuring that whether you're a complete beginner or looking to perfect your recitation, we have the right program for you.
              </p>

              <p className="text-slate-700 leading-relaxed">
                Our academy is based in{' '}
                <span className="text-brand-green font-semibold">Bahawalpur, Pakistan</span>
                {', and through our online platform with '}
                <span className="text-brand-green font-semibold">flexible scheduling</span>
                {' and '}
                <span className="text-brand-green font-semibold">affordable pricing</span>
                , we connect with students from every corner of the world, making Quranic education accessible to all with{' '}
                <span className="text-brand-green font-semibold">worldwide access</span>
                .{' '}
                <span className="text-brand-green font-arabic text-lg">جزاك الله خيرا</span>
                {' '}- JazakAllah Khairan for choosing QURAN ONLINE ACADEMIA.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. OUR VALUES SECTION */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <SectionHeader title="Our Values" subtitle="The principles that guide our teaching methodology" />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {ourValues.map((value, idx) => {
              const Icon = value.icon;
              return (
                <GlassCard key={idx} delay={idx * 0.1} className="p-6 text-center">
                  <div className="w-16 h-16 rounded-2xl bg-brand-green flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-slate-900 font-bold text-lg mb-2">{value.title}</h3>
                  <p className="text-slate-600 text-sm">{value.desc}</p>
                </GlassCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. MEET OUR FOUNDER SECTION */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="backdrop-blur-xl bg-white border border-gray-200 rounded-3xl p-8 md:p-12 shadow-lg">
              <div className="flex flex-col md:flex-row items-center gap-8">

                {/* Founder photo */}
                <div className="flex-shrink-0">
                  <div className="relative">
                    <div className="w-40 h-40 rounded-3xl overflow-hidden border-4 border-brand-green/30">
                      <img
                        src="/images/founder-real.jpg"
                        onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/images/founder.png'; }}
                        alt="Ustaz Abdul Muhaymin - Founder of Quran Online Academia"
                        loading="lazy"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute -bottom-3 -right-3 px-4 py-2 rounded-xl bg-brand-green shadow-lg">
                      <p className="text-white text-xs font-semibold">Founder</p>
                    </div>
                  </div>
                </div>

                {/* Founder info */}
                <div className="flex-1 text-center md:text-left">
                  <h2 className="text-3xl font-bold text-slate-900 mb-2">Ustaz Abdul Muhaymin</h2>
                  <p className="text-brand-green mb-4 font-medium">Founder & Lead Instructor</p>
                  <p className="text-slate-700 mb-6">
                    "My mission is not just to teach the recitation of the Holy Quran, but to help students understand its profound meaning and wisdom. Every student who connects with the Quran fills my heart with immense joy and gratitude."
                  </p>
                  <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                    <div className="flex items-center gap-2 text-slate-600 text-sm">
                      <Clock className="w-4 h-4 text-brand-green" />
                      5+ Years Experience
                    </div>
                    <div className="flex items-center gap-2 text-slate-600 text-sm">
                      <Users className="w-4 h-4 text-brand-green" />
                      3000+ Students
                    </div>
                    <div className="flex items-center gap-2 text-slate-600 text-sm">
                      <Globe className="w-4 h-4 text-brand-green" />
                      International Reach
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. WHY CHOOSE US SECTION */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <SectionHeader title="Why Choose Us" subtitle="What makes QURAN ONLINE ACADEMIA stand out" />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {whyChooseUs.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="flex items-center gap-3 backdrop-blur-xl bg-white border border-gray-200 rounded-xl px-4 py-3 shadow-sm"
              >
                <CheckCircle2 className="w-5 h-5 text-brand-green flex-shrink-0" />
                <span className="text-slate-900 text-sm">{item}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. CTA SECTION */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-slate-900 mb-6"
            >
              Ready to Begin Your Journey?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-slate-600 mb-8"
            >
              Contact us today for a free consultation and trial class
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <AnimatedButton href="https://wa.me/923177479286" variant="primary" size="large" icon={MessageCircle}>
                WhatsApp: +92 317 7479 286
              </AnimatedButton>
            </motion.div>
          </div>
        </div>
      </section>

    </div>
  );
}
