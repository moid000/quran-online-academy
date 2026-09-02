import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Phone, MessageCircle, CheckCircle2, Star, ChevronDown, ChevronUp,
  Award, Users, Globe, ShieldCheck, BookOpen, ArrowRight, ChevronLeft, ChevronRight,
  GraduationCap, Target, Sparkles, Quote
} from 'lucide-react';
import CourseCard from '../components/CourseCard';
import GlassCard from '../components/GlassCard';
import SectionHeader from '../components/SectionHeader';
import AnimatedButton from '../components/AnimatedButton';
import AnimatedCounter from '../components/AnimatedCounter';
import { getCourses } from '../api/courses';

const heroSlides = [
  {
    image: 'https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=1920&q=80',
    quote: '"Indeed, this Quran guides to that which is most suitable"',
    reference: 'Surah Al-Isra 17:9',
    title: 'Begin Your Quranic Journey',
  },
  {
    image: 'https://images.unsplash.com/photo-1585036156171-384164a8c675?w=1920&q=80',
    quote: '"And We have certainly made the Quran easy for remembrance"',
    reference: 'Surah Al-Qamar 54:17',
    title: 'Learn From Expert Teachers',
  },
  {
    image: 'https://images.unsplash.com/photo-1542816417-0983c9c9ad53?w=1920&q=80',
    quote: '"The best among you are those who learn the Quran and teach it"',
    reference: 'Hadith - Sahih Bukhari',
    title: 'Join 3000+ Students Worldwide',
  },
  {
    image: 'https://images.unsplash.com/photo-1610552050890-fe99536c2615?w=1920&q=80',
    quote: '"Read! In the name of your Lord who created"',
    reference: 'Surah Al-Alaq 96:1',
    title: 'Transform Your Life with Quran',
  },
];

const founderStats = [
  { icon: Award, label: '5+ Years', desc: 'Teaching Experience' },
  { icon: Users, label: '600+', desc: 'Active Students' },
  { icon: Globe, label: '3000+', desc: 'Students Taught Worldwide' },
  { icon: ShieldCheck, label: 'Certified', desc: 'Quran Educator' },
];

const journeySteps = [
  { icon: MessageCircle, title: 'Free Consultation', description: 'Connect with us on WhatsApp for a free assessment of your current level', color: 'from-blue-500 to-blue-600' },
  { icon: BookOpen, title: 'Choose Your Course', description: 'Select from our range of courses based on your goals and schedule', color: 'from-purple-500 to-purple-600' },
  { icon: Users, title: 'One-on-One Classes', description: 'Learn directly with expert teachers in personalized online sessions', color: 'from-amber-500 to-amber-600' },
  { icon: Target, title: 'Track Progress', description: 'Regular assessments and feedback to ensure continuous improvement', color: 'from-emerald-500 to-emerald-600' },
  { icon: GraduationCap, title: 'Achieve Mastery', description: 'Complete your course with confidence and receive certification', color: 'from-rose-500 to-rose-600' },
  { icon: ShieldCheck, title: 'Lifelong Learning', description: 'Continue advancing with higher-level courses and deeper understanding', color: 'from-cyan-500 to-cyan-600' },
];

const impactNumbers = [
  { value: 5, suffix: '+', label: 'Years Experience' },
  { value: 600, suffix: '+', label: 'Active Students' },
  { value: 3000, suffix: '+', label: 'Students Taught Worldwide' },
  { value: 15, suffix: '+', label: 'Expert Teachers' },
  { value: 7, suffix: '', label: 'Specialized Courses' },
  { value: 98, suffix: '%', label: 'Student Satisfaction' },
];

const testimonials = [
  { name: 'Abdullah Rahman', location: 'United Kingdom', image: 'https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?w=150&q=80', rating: 5, text: "My children have learned so much in just a few months. The teachers are patient and understanding. Best decision we made for our family's Islamic education." },
  { name: 'Muhammad Ali', location: 'United States', image: 'https://images.unsplash.com/photo-1582672060674-bc2bd808a8b5?w=150&q=80', rating: 5, text: "As a busy professional, the flexible scheduling has been a blessing. I've finally been able to complete my Quran memorization journey. JazakAllah khair!" },
  { name: 'Ibrahim Hassan', location: 'Canada', image: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=150&q=80', rating: 5, text: "The Tajweed course transformed my recitation. Teacher Abdul Muhaymin's method of teaching is exceptional. I recommend this academy to everyone." },
  { name: 'Ahmed Khan', location: 'Australia', image: 'https://images.unsplash.com/photo-1600486913747-55e5470d6f40?w=150&q=80', rating: 5, text: "Started with basic Qaidah and now learning Tafseer. The journey has been incredible. The academy truly cares about each student's progress." },
  { name: 'Sana Khan', location: 'Pakistan', image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&q=80', rating: 5, text: 'Absolutely fantastic the teacher is very good, reliable and honest, I started with no knowledge of reciting the Quran within weeks I was reciting the Quran, felt amazing. Would highly recommend with no doubt.' },
  { name: 'Fahad Hashmi', location: 'United Kingdom', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&q=80', rating: 5, text: "It's a best Online Quran Academy for kids and adults, they have very experienced and qualified tutors, male and female teachers, I recommend this." },
  { name: 'Mohammed Abdullah', location: 'United Arab Emirates', image: 'https://images.unsplash.com/photo-1552058544-f2b08422138a?w=150&q=80', rating: 5, text: 'This Quran Academy truly stands out for its quality teaching and sincere dedication. The instructors are knowledgeable, patient, and focused on real student progress.' },
  { name: 'Azaan Azaan', location: 'United States', image: 'https://images.unsplash.com/photo-1531891437562-4301cf35b7e4?w=150&q=80', rating: 5, text: 'This is very good Online Quran Academy, best for all ages, it has qualified and expert tutors, MashAllah, I recommend this 100%.' },
  { name: 'Javed Ahmed', location: 'Pakistan', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&q=80', rating: 5, text: 'Very good and experienced teacher, my kids learn a lot of things about Din o Islam. 100% recommended academy.' },
  { name: 'SaeedMd Mawati', location: 'India', image: 'https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=150&q=80', rating: 5, text: 'Best institution for online classes, the video lectures have made it so easy to study at home. Each and every teacher is good.' },
  { name: 'Yasir Khan', location: 'Pakistan', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&q=80', rating: 5, text: "I'm absolutely impressed with the exceptional quality of education and dedication of this institute." },
  { name: 'Huzaifa Furqan', location: 'Pakistan', image: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&q=80', rating: 5, text: 'Best online institute & has a global mission to build Muslim thoughts & identity. Keep it up!' },
  { name: 'Kifal', location: 'United Kingdom', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&q=80', rating: 5, text: 'I am truly grateful for Sir Muhaymin, my son\'s Quran teacher. He is very dedicated, been teaching for a long time and the progress has been amazing. Highly recommend to anyone looking for a knowledgeable and trustworthy teacher.' },
];

const faqs = [
  { q: 'How do I start learning Quran online?', a: 'Getting started is simple! Contact us via WhatsApp at +92 317 7479 286 to schedule your free trial class. Our team will guide you through course selection, scheduling, and enrollment. No prior experience is needed — we welcome students of all ages and levels.' },
  { q: 'Do you offer free trial classes?', a: 'Yes! We offer a completely free trial class with no payment required. This allows you to experience our teaching methodology, meet your teacher, and decide if our academy is the right fit before enrolling.' },
  { q: 'Are the Quran classes one-on-one?', a: "Absolutely. All our classes are conducted one-on-one to ensure personalized attention, faster progress, and a curriculum tailored to each student's individual level and learning pace." },
  { q: 'What courses do you offer?', a: 'We offer a comprehensive range of courses including Basic Qaidah, Quran Reading (Nazra), Quran Memorization (Hifz), Tajweed Course, Quran Translation, Daily Duas & Kalimas, Hadith Studies, and Islamic Studies — all taught by qualified teachers.' },
  { q: 'Do you have male and female teachers?', a: 'Yes, we have both qualified male and female teachers available. You can request a teacher based on your preference, and we will do our best to accommodate your needs for a comfortable learning experience.' },
  { q: 'What are the class timings?', a: 'We offer flexible class timings to accommodate students across all time zones. Classes are available 24/7, and you can choose a schedule that works best for you.' },
  { q: 'Which countries do you serve?', a: 'We serve students worldwide, including the USA, UK, Canada, Australia, European countries, the Middle East, and beyond. Our online platform makes Quran education accessible from anywhere in the world.' },
  { q: 'What languages do your teachers speak?', a: 'Our teachers are proficient in English, Urdu, and Arabic. We ensure clear communication so that students can fully understand and benefit from their lessons regardless of their native language.' },
  { q: 'How much do the classes cost?', a: 'Our fee structure is affordable and designed to make Quran education accessible to all. We offer multiple packages (3, 4, or 5 days per week) with pricing in USD, EUR, and GBP. Visit our Fees page for complete details.' },
  { q: 'What if I miss a class?', a: 'We understand that life can be unpredictable. Missed classes can be rescheduled with prior notice. Simply inform your teacher, and we will arrange a make-up class at a convenient time for you.' },
];

function FaqItem({ faq, index }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className="border border-gray-200 rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow"
    >
      <button onClick={() => setOpen(!open)} className="w-full px-6 py-4 flex items-center justify-between text-left gap-4" aria-expanded={open}>
        <h3 className="text-slate-900 font-semibold text-sm md:text-base">{faq.q}</h3>
        <ChevronDown className={`w-5 h-5 text-brand-green flex-shrink-0 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <p className="px-6 pb-4 text-slate-600 text-sm leading-relaxed">{faq.a}</p>
      </motion.div>
    </motion.div>
  );
}

export default function Home() {
  const [courses, setCourses] = useState([]);
  const [slideIdx, setSlideIdx] = useState(0);
  const [testimonialIdx, setTestimonialIdx] = useState(0);

  useEffect(() => {
    getCourses().then((data) => setCourses(data || []));
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setSlideIdx((i) => (i + 1) % heroSlides.length), 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setTestimonialIdx((i) => (i + 1) % testimonials.length), 6000);
    return () => clearInterval(timer);
  }, []);

  const slide = heroSlides[slideIdx];
  const t = testimonials[testimonialIdx];

  return (
    <div className="bg-white">

      {/* 1. HERO SECTION - Animated Carousel */}
      <section className="relative h-screen w-full overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={slideIdx}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2 }}
            className="absolute inset-0"
          >
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${slide.image})` }} />
            <div className="absolute inset-0 bg-gradient-to-b from-slate-900/70 via-slate-900/60 to-white" />
          </motion.div>
        </AnimatePresence>

        {/* Decorative blur circles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-[#345B46]/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        <div className="relative z-10 h-full flex items-center justify-center px-4">
          <div className="text-center max-w-5xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div key={slideIdx} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }} transition={{ duration: 0.8 }}>
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-white font-arabic text-3xl md:text-4xl mb-6">
                  بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم
                </motion.p>
                <h1 className="text-2xl md:text-4xl lg:text-5xl font-serif text-white mb-4 leading-relaxed">{slide.quote}</h1>
                <p className="text-white text-lg mb-8">— {slide.reference}</p>
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-8">{slide.title}</h2>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <AnimatedButton href="https://wa.me/923177479286" variant="primary" size="large" icon={MessageCircle}>
                    Start Learning Today
                  </AnimatedButton>
                  <AnimatedButton
                    variant="glass"
                    size="large"
                    onClick={() => document.getElementById('courses')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    Explore Courses
                  </AnimatedButton>
                </div>
                <p className="mt-6 text-slate-600 text-sm">📞 For Fastest Registration – Contact on WhatsApp: +92 317 7479 286</p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Carousel dots */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
          {heroSlides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setSlideIdx(idx)}
              className={`h-2 rounded-full transition-all duration-500 ${idx === slideIdx ? 'w-8 bg-brand-green' : 'w-2 bg-white/60 hover:bg-white/80'}`}
            />
          ))}
        </div>
      </section>

      {/* 2. MEET OUR FOUNDER SECTION */}
      <section className="py-24 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#345B46]/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-4 relative z-10 max-w-7xl">
          <SectionHeader title="Meet Our Founder" subtitle="Dedicated to spreading the light of Quran across the world" />

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Photo */}
            <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="relative">
              <div className="relative aspect-[4/5] max-w-md mx-auto">
                <div className="absolute -inset-1 bg-gradient-to-br from-[#345B46]/15 to-emerald-500/15 rounded-3xl" />
                <div className="absolute inset-0 rounded-3xl overflow-hidden shadow-xl">
                  <img
                    src="/images/founder-real.jpg"
                    onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/images/founder.png'; }}
                    alt="Ustaz Abdul Muhaymin - Founder and Lead Instructor at Quran Online Academia"
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/10 to-transparent" />
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className="absolute bottom-0 left-0 right-0 p-6 text-left"
                  >
                    <h3 className="text-2xl font-bold text-white leading-snug">Ustaz Abdul Muhaymin</h3>
                    <p className="text-amber-400 font-medium">Founder & Lead Instructor</p>
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* Info */}
            <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="space-y-6 pt-4 lg:pt-0">
              <div className="backdrop-blur-xl bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                <p className="text-brand-green font-arabic text-xl mb-4 text-right">"وَعَلَّمَكَ مَا لَمْ تَكُن تَعْلَمُ"</p>
                <p className="text-slate-600 italic mb-2">"And He taught you that which you knew not"</p>
                <p className="text-brand-green text-sm font-medium">— Surah An-Nisa 4:113</p>
              </div>
              <p className="text-slate-700 text-lg leading-relaxed">
                With over <span className="text-brand-green font-semibold">5 years of dedicated experience</span> in teaching the Holy Quran, Ustaz Abdul Muhaymin has guided thousands of students on their spiritual journey. His mission is not just to teach the recitation of Quran, but to instill its understanding and wisdom in every heart.
              </p>
              <p className="text-slate-700 text-lg leading-relaxed">
                Based in <span className="text-brand-green font-semibold">Bahawalpur, Pakistan</span>, our academy has grown from a local institution to an international platform, connecting students from across the globe with the divine knowledge of the Quran.
              </p>
              <div className="grid grid-cols-2 gap-4 mt-8">
                {founderStats.map((stat, idx) => {
                  const Icon = stat.icon;
                  return (
                    <GlassCard key={idx} delay={idx * 0.1} className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-brand-green flex items-center justify-center shrink-0">
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <div className="text-lg font-bold text-slate-900">{stat.label}</div>
                          <div className="text-xs text-slate-600">{stat.desc}</div>
                        </div>
                      </div>
                    </GlassCard>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. OUR COURSES SECTION */}
      <section id="courses" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader title="Our Courses" subtitle="Comprehensive Islamic education tailored for every learner" />

          {courses.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {courses.slice(0, 4).map((course) => (
                <CourseCard key={course.id || course._id} course={course} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-slate-600">Loading courses...</p>
            </div>
          )}

          <div className="text-center">
            <AnimatedButton to="/courses" variant="outline" size="large" icon={BookOpen}>
              View All Courses
            </AnimatedButton>
          </div>
        </div>
      </section>

      {/* 4. LEARNING JOURNEY SECTION */}
      <section className="py-24 bg-gradient-to-b from-gray-50 via-white to-gray-50 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#345B46]/20 to-transparent" />
        </div>
        <div className="container mx-auto px-4 relative z-10 max-w-7xl">
          <SectionHeader title="Your Learning Journey" subtitle="A structured path from beginner to Quran expert" />

          <div className="relative max-w-5xl mx-auto">
            <div className="absolute top-1/2 left-4 right-4 h-0.5 bg-gradient-to-r from-[#345B46]/50 via-emerald-500/50 to-[#345B46]/50 hidden lg:block" />
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {journeySteps.map((step, idx) => {
                const Icon = step.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: idx * 0.1 }}
                    className="relative group"
                  >
                    <div className="backdrop-blur-xl bg-white border border-gray-200 rounded-3xl p-6 hover:shadow-lg transition-all duration-500">
                      <div className="absolute -top-4 -left-4 w-8 h-8 rounded-full bg-brand-green flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-[#345B46]/30">
                        {idx + 1}
                      </div>
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center mb-4 transform group-hover:scale-110 transition-transform duration-500`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 mb-2">{step.title}</h3>
                      <p className="text-slate-600 text-sm">{step.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 5. FREE TRIAL CTA SECTION */}
      <section className="py-24 relative overflow-hidden bg-gradient-to-b from-white to-gray-50">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-0 w-72 h-72 bg-[#345B46]/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-0 w-72 h-72 bg-emerald-500/5 rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="backdrop-blur-xl bg-white border border-gray-200 rounded-3xl p-8 md:p-12 shadow-lg"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="flex items-center justify-center mx-auto mb-6"
              >
                <img
                  src="/images/logo-real.png"
                  onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/images/logo.png'; }}
                  alt="Quran Online Academia Logo"
                  className="w-32 h-32 object-contain"
                />
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="text-3xl md:text-4xl font-bold text-slate-900 text-center mb-4"
              >
                Get a Free 3-Day Trial Class
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="text-slate-600 text-lg text-center mb-8 max-w-2xl mx-auto"
              >
                Experience our teaching quality before enrolling.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="grid md:grid-cols-3 gap-4 mb-8"
              >
                {['No Payment Required', 'One-on-One Session', 'Meet Your Teacher'].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 justify-center md:justify-start">
                    <CheckCircle2 className="w-5 h-5 text-brand-green flex-shrink-0" />
                    <span className="text-slate-700 text-sm font-medium">{item}</span>
                  </div>
                ))}
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
                className="flex justify-center"
              >
                <AnimatedButton href="https://wa.me/923177479286" variant="primary" size="large" icon={Sparkles}>
                  Start Free Trial
                </AnimatedButton>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 6. IMPACT NUMBERS SECTION - Solid Brand Green */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-brand-green" />
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=1920&q=80')] bg-cover bg-center opacity-10" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Our Impact in Numbers</h2>
            <p className="text-white/80 max-w-2xl mx-auto">Transforming lives through the divine wisdom of the Holy Quran</p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {impactNumbers.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="text-center"
              >
                <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6 hover:bg-white/20 transition-all duration-300">
                  <p className="text-3xl md:text-4xl font-bold text-white mb-1">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="text-white/80 text-sm">{stat.label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. STUDENT TESTIMONIALS - Real rotating carousel */}
      <section className="py-24 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <Quote className="w-96 h-96 text-slate-100" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <SectionHeader title="Student Success Stories" subtitle="Hear from our global community of learners" />

          <div className="max-w-4xl mx-auto relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={testimonialIdx}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.6 }}
                className="backdrop-blur-xl bg-white border border-gray-200 shadow-lg rounded-3xl p-8 md:p-12"
              >
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="flex-shrink-0">
                    <div className="relative">
                      <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-brand-green/30">
                        <img src={t.image} alt={t.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-brand-green flex items-center justify-center">
                        <Quote className="w-4 h-4 text-white" />
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <div className="flex gap-1 justify-center md:justify-start mb-4">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-brand-green fill-current" />
                      ))}
                    </div>
                    <p className="text-slate-700 text-lg md:text-xl italic mb-6 leading-relaxed">"{t.text}"</p>
                    <div>
                      <h4 className="text-slate-900 font-bold text-lg">{t.name}</h4>
                      <p className="text-brand-green font-medium">{t.location}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="flex items-center justify-center gap-4 mt-8">
              <button
                onClick={() => setTestimonialIdx((i) => (i - 1 + testimonials.length) % testimonials.length)}
                className="p-2 rounded-full bg-brand-green/10 border border-brand-green/20 text-brand-green hover:bg-brand-green/20 transition-all"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <div className="flex gap-2">
                {testimonials.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setTestimonialIdx(idx)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${idx === testimonialIdx ? 'w-6 bg-brand-green' : 'bg-gray-300'}`}
                  />
                ))}
              </div>
              <button
                onClick={() => setTestimonialIdx((i) => (i + 1) % testimonials.length)}
                className="p-2 rounded-full bg-brand-green/10 border border-brand-green/20 text-brand-green hover:bg-brand-green/20 transition-all"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 8. FAQ SECTION */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader title="Frequently Asked Questions" subtitle="Everything you need to know about learning Quran online with us" />
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <FaqItem key={idx} faq={faq} index={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* 9. FINAL CTA SECTION */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white" />
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1585036156171-384164a8c675?w=1920&q=80')] bg-cover bg-center opacity-5" />
        </div>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#345B46]/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-brand-green font-arabic text-3xl md:text-4xl mb-6">
              اقْرَأْ وَرَبُّكَ الْأَكْرَمُ
            </motion.p>
            <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-slate-600 italic text-lg mb-2">
              "Read, and your Lord is the Most Generous"
            </motion.p>
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="text-brand-green text-sm mb-8">
              — Surah Al-Alaq 96:3
            </motion.p>
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="text-3xl md:text-5xl font-bold text-brand-green mb-6">
              Begin Your Quran Journey Today
            </motion.h2>
            <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }} className="text-brand-green text-lg mb-10 max-w-2xl mx-auto">
              Join thousands of students worldwide who have transformed their lives through the divine wisdom of the Holy Quran. Start with a free trial class.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.5 }} className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <AnimatedButton href="https://wa.me/923177479286" variant="secondary" size="large" icon={MessageCircle}>
                WhatsApp: +92 317 7479 286
              </AnimatedButton>
              <AnimatedButton to="/register" variant="primary" size="large">
                Get Free Trial Class
              </AnimatedButton>
            </motion.div>
          </div>
        </div>
      </section>

    </div>
  );
}
