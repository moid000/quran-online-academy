import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Phone, MessageCircle, CheckCircle2, Star, ChevronDown, ChevronUp,
  Award, Users, Globe, ShieldCheck, BookOpen, ArrowRight
} from 'lucide-react';
import CourseCard from '../components/CourseCard';
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

export default function Home() {
  const [courses, setCourses] = useState([]);
  const [openFaq, setOpenFaq] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    getCourses().then(data => {
      setCourses(data);
    });
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(s => (s + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const founderStats = [
    { value: '5+ Years', label: 'Teaching Experience', icon: Award },
    { value: '600+', label: 'Active Students', icon: Users },
    { value: '3000+', label: 'Students Taught Worldwide', icon: Globe },
    { value: 'Certified', label: 'Quran Educator', icon: ShieldCheck },
  ];

  const steps = [
    { num: '01', title: 'Free Consultation', desc: 'Connect with us on WhatsApp for a free assessment of your current level.' },
    { num: '02', title: 'Choose Your Course', desc: 'Select from our range of courses based on your goals and schedule.' },
    { num: '03', title: 'One-on-One Classes', desc: 'Learn directly with expert teachers in personalized online sessions.' },
    { num: '04', title: 'Track Progress', desc: 'Regular assessments and feedback to ensure continuous improvement.' },
    { num: '05', title: 'Achieve Mastery', desc: 'Complete your course with confidence and receive certification.' },
    { num: '06', title: 'Lifelong Learning', desc: 'Continue advancing with higher-level courses and deeper understanding.' },
  ];

  const impactNumbers = [
    { number: '0+', label: 'Years Experience' },
    { number: '0+', label: 'Active Students' },
    { number: '0+', label: 'Students Taught Worldwide' },
    { number: '0', label: 'Expert Teachers' },
    { number: '0', label: 'Specialized Courses' },
    { number: '0%', label: 'Student Satisfaction' },
  ];

  const testimonials = [
    {
      name: 'Abdullah Rahman',
      country: 'United Kingdom',
      text: "My children have learned so much in just a few months. The teachers are patient and understanding. Best decision we made for our family's Islamic education.",
    },
    {
      name: 'Aisha Fatima',
      country: 'United States',
      text: 'The female tutor is wonderfully patient with my 7-year-old daughter. She looks forward to her Tajweed classes every single day!',
    },
    {
      name: 'Muhammad Ibrahim',
      country: 'Canada',
      text: 'Flexible timings and highly qualified teachers. Memorizing Juz Amma with proper Tajweed rules has been a smooth and spiritual journey.',
    },
  ];

  const faqs = [
    { q: 'How do I start learning Quran online?', a: 'Getting started is simple! Contact us via WhatsApp at +92 317 7479 286 to schedule your free trial class. Our team will guide you through course selection, scheduling, and enrollment. No prior experience is needed — we welcome students of all ages and levels.' },
    { q: 'Do you offer free trial classes?', a: 'Yes! We offer a completely free trial class with no payment required. This allows you to experience our teaching methodology, meet your teacher, and decide if our academy is the right fit before enrolling.' },
    { q: 'Are the Quran classes one-on-one?', a: 'Absolutely. All our classes are conducted one-on-one to ensure personalized attention, faster progress, and a curriculum tailored to each student\'s individual level and learning pace.' },
    { q: 'What courses do you offer?', a: 'We offer a comprehensive range of courses including Basic Qaidah, Quran Reading (Nazra), Quran Memorization (Hifz), Tajweed Course, Quran Translation, Daily Duas & Kalimas, Hadith Studies, and Islamic Studies — all taught by qualified teachers.' },
    { q: 'Do you have male and female teachers?', a: 'Yes, we have both qualified male and female teachers available. You can request a teacher based on your preference, and we will do our best to accommodate your needs for a comfortable learning experience.' },
    { q: 'What are the class timings?', a: 'We offer flexible class timings to accommodate students across all time zones. Classes are available 24/7, and you can choose a schedule that works best for you. Simply coordinate with your assigned teacher.' },
    { q: 'Which countries do you serve?', a: 'We serve students worldwide, including the USA, UK, Canada, Australia, European countries, the Middle East, and beyond. Our online platform makes Quran education accessible from anywhere in the world.' },
    { q: 'What languages do your teachers speak?', a: 'Our teachers are proficient in English, Urdu, Spanish, and Punjabi. We ensure clear communication so that students can fully understand and benefit from their lessons regardless of their native language.' },
    { q: 'How much do the classes cost?', a: 'Our fee structure is affordable and designed to make Quran education accessible to all. We offer multiple packages (3, 4, or 5 days per week) with pricing in USD, EUR, and GBP. Visit our Fees page for complete details.' },
    { q: 'What if I miss a class?', a: 'We understand that life can be unpredictable. Missed classes can be rescheduled with prior notice. Simply inform your teacher, and we will arrange a make-up class at a convenient time for you.' },
  ];

  const slide = heroSlides[currentSlide];

  return (
    <div className="bg-white">

      {/* 1. HERO SECTION - Carousel */}
      <section className="relative h-screen w-full overflow-hidden">
        {/* Background image changes with slide */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-all duration-1000"
          style={{ backgroundImage: `url(${slide.image})` }}
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-900/60 to-slate-900/90" />

        {/* Content */}
        <div className="container mx-auto px-4 relative z-10 text-center flex flex-col items-center justify-center h-full pt-20">
          {/* Arabic Bismillah - same on all slides */}
          <div className="text-amber-400 font-arabic text-2xl mb-4">
            بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم
          </div>

          {/* Quote - changes per slide */}
          <p className="text-white text-lg md:text-xl max-w-2xl mx-auto mb-3">
            {slide.quote}
          </p>
          <p className="text-white/70 text-sm mb-6">— {slide.reference}</p>

          {/* Title - changes per slide */}
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-8">
            {slide.title}
          </h1>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            <Link
              to="/register"
              className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-4 rounded-full font-bold shadow-lg transition-all flex items-center gap-2"
            >
              <MessageCircle className="w-5 h-5" />
              Start Learning Today
            </Link>
            <Link
              to="/courses"
              className="border-2 border-white/30 text-white hover:bg-white/10 px-8 py-4 rounded-full font-bold transition-all"
            >
              Explore Courses
            </Link>
          </div>

          {/* WhatsApp Contact Line */}
          <div className="flex items-center justify-center gap-2 text-white/80 text-sm">
            <Phone className="w-4 h-4 text-amber-400" />
            <span>
              For Fastest Registration – Contact on WhatsApp:{' '}
              <a
                href="https://wa.me/923177479286"
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-400 font-semibold hover:underline"
              >
                +92 317 7479 286
              </a>
            </span>
          </div>

          {/* Carousel Dots */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
            {heroSlides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`w-3 h-3 rounded-full transition-all ${
                  idx === currentSlide ? 'bg-brand-green w-8' : 'bg-white/30'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 2. MEET OUR FOUNDER SECTION */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="text-brand-green font-arabic text-2xl mb-2">﷽</div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-slate-900">
              Meet Our Founder
            </h2>
            <p className="text-lg md:text-xl max-w-2xl mx-auto text-slate-600">
              Dedicated to spreading the light of Quran across the world
            </p>
            <div className="h-1 w-24 bg-brand-green mx-auto mt-6 rounded-full" />
          </div>

          {/* Two Columns */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* Left Column - Photo */}
            <div className="relative aspect-square max-w-lg mx-auto w-full">
              <div className="absolute inset-0 bg-gradient-to-br from-[#345B46]/20 to-emerald-500/20 rounded-3xl transform rotate-6" />
              <div className="absolute inset-0 backdrop-blur-xl bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-xl transform -rotate-3">
                <img
                  src="/images/founder.png"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = "https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=800&q=80";
                  }}
                  alt="Ustaz Abdul Muhaymin"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Right Column - Info Card */}
            <div className="backdrop-blur-xl bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-4">
              <div className="text-brand-green font-arabic text-xl text-right">
                وَعَلَّمَكَ مَا لَمْ تَكُنْ تَعْلَمُ
              </div>
              <p className="text-slate-700 italic text-sm">
                "And He taught you that which you knew not"
              </p>
              <div className="text-brand-green text-xs font-medium">
                — Surah An-Nisa 4:113
              </div>

              <div className="pt-2">
                <h3 className="text-xl font-bold text-slate-900">
                  Ustaz Abdul Muhaymin
                </h3>
                <p className="text-brand-green font-semibold text-sm">
                  Founder & Lead Instructor
                </p>
              </div>

              <p className="text-slate-700 leading-relaxed">
                With over <span className="text-brand-green font-semibold">5 years of dedicated experience</span> in teaching the Holy Quran, Ustaz Abdul Muhaymin has guided thousands of students on their spiritual journey. His mission is not just to teach the recitation of Quran, but to instill its understanding and wisdom in every heart.
              </p>
              <p className="text-slate-700 leading-relaxed">
                Based in <span className="text-brand-green font-semibold">Bahawalpur, Pakistan</span>, our academy has grown from a local institution to an international platform, connecting students from across the globe with the divine knowledge of the Quran.
              </p>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-12">
            {founderStats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div key={idx} className="backdrop-blur-xl bg-white border border-gray-200 rounded-xl p-4 text-center">
                  <div className="w-12 h-12 rounded-full bg-brand-green/20 flex items-center justify-center mx-auto mb-3">
                    <Icon className="w-6 h-6 text-brand-green" />
                  </div>
                  <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
                  <div className="text-sm text-slate-600">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. OUR COURSES SECTION */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="text-brand-green font-arabic text-2xl mb-2">﷽</div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-slate-900">
              Our Courses
            </h2>
            <p className="text-lg md:text-xl max-w-2xl mx-auto text-slate-600">
              Comprehensive Islamic education tailored for every learner
            </p>
            <div className="h-1 w-24 bg-brand-green mx-auto mt-6 rounded-full" />
          </div>

          {courses.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {courses.slice(0, 4).map(course => (
                <CourseCard key={course.id || course._id} course={course} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-slate-600">Loading courses...</p>
            </div>
          )}
        </div>
      </section>

      {/* 4. LEARNING JOURNEY SECTION */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 to-slate-950" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1585036156171-384164a8c675?w=1920&q=80')] bg-cover bg-center opacity-5" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#345B46]/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="text-amber-400 font-arabic text-2xl mb-2">﷽</div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-white">
              Your Learning Journey
            </h2>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              A structured path from beginner to Quran expert
            </p>
            <div className="h-1 w-24 bg-brand-green mx-auto mt-6 rounded-full" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {steps.map((step, idx) => (
              <div
                key={idx}
                className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center mb-4">
                  <span className="text-white font-bold">{step.num}</span>
                </div>
                <h3 className="text-white font-bold text-lg mb-2">{step.title}</h3>
                <p className="text-white/80 text-sm">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. FREE TRIAL CTA SECTION */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-brand-green font-arabic text-2xl mb-2">﷽</div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-slate-900">
            Get a Free 3-Day Trial Class
          </h2>
          <p className="text-lg text-slate-600 mb-12">
            Experience our teaching quality before enrolling.
          </p>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
            {[
              { icon: CheckCircle2, title: 'No Payment Required', desc: 'Try before you commit' },
              { icon: Users, title: 'One-on-One Session', desc: 'Personalized attention' },
              { icon: Award, title: 'Meet Your Teacher', desc: 'Experience our teaching style' },
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="backdrop-blur-xl bg-white border border-gray-200 rounded-3xl p-6 hover:shadow-lg transition-all duration-500">
                  <div className="w-14 h-14 rounded-2xl bg-brand-green flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1">{item.title}</h3>
                  <p className="text-sm text-slate-600">{item.desc}</p>
                </div>
              );
            })}
          </div>

          <Link
            to="/register"
            className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-8 py-4 rounded-full font-bold text-lg transition-all shadow-lg"
          >
            <MessageCircle className="w-5 h-5" />
            Start Free Trial
          </Link>
        </div>
      </section>

      {/* 6. IMPACT NUMBERS SECTION */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=1920&q=80')] bg-cover bg-center opacity-10" />
        <div className="absolute top-1/4 left-0 w-72 h-72 bg-[#345B46]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-72 h-72 bg-emerald-500/5 rounded-full blur-3xl" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#345B46]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="text-amber-400 font-arabic text-2xl mb-2">﷽</div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-white">
              Our Impact in Numbers
            </h2>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Transforming lives through the divine wisdom of the Holy Quran
            </p>
            <div className="h-1 w-24 bg-brand-green mx-auto mt-6 rounded-full" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {impactNumbers.map((stat, idx) => (
              <div
                key={idx}
                className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-amber-400 mb-2">{stat.number}</div>
                <div className="text-white/80 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. STUDENT TESTIMONIALS */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="text-brand-green font-arabic text-2xl mb-2">﷽</div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-slate-900">
              Student Success Stories
            </h2>
            <p className="text-lg md:text-xl max-w-2xl mx-auto text-slate-600">
              Hear from our global community of learners
            </p>
            <div className="h-1 w-24 bg-brand-green mx-auto mt-6 rounded-full" />
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t, idx) => (
              <div key={idx} className="backdrop-blur-xl bg-white border border-gray-200 rounded-3xl p-6 hover:shadow-lg transition-all duration-500">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-slate-700 leading-relaxed mb-4">"{t.text}"</p>
                <div className="border-t border-gray-100 pt-4">
                  <div className="font-bold text-slate-900">{t.name}</div>
                  <div className="text-sm text-slate-600">{t.country}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. FAQ SECTION */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="text-brand-green font-arabic text-2xl mb-2">﷽</div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-slate-900">
              Frequently Asked Questions
            </h2>
            <p className="text-lg md:text-xl max-w-2xl mx-auto text-slate-600">
              Everything you need to know about learning Quran online with us
            </p>
            <div className="h-1 w-24 bg-brand-green mx-auto mt-6 rounded-full" />
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left gap-4"
                >
                  <span className="text-lg font-semibold text-slate-900">{faq.q}</span>
                  {openFaq === idx ? (
                    <ChevronUp className="w-5 h-5 text-brand-green flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-brand-green flex-shrink-0" />
                  )}
                </button>
                {openFaq === idx && (
                  <div className="px-6 pb-4 text-slate-600 leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. FINAL CTA SECTION */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=1920&q=80')] bg-cover bg-center opacity-10" />
        <div className="absolute top-1/4 left-0 w-72 h-72 bg-[#345B46]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-72 h-72 bg-emerald-500/5 rounded-full blur-3xl" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#345B46]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="text-white font-arabic text-3xl md:text-4xl mb-6">
            اقْرَأْ وَرَبُّكَ الْأَكْرَمُ
          </div>
          <p className="text-slate-600 italic text-lg mb-2 text-white">
            "Read, and your Lord is the Most Generous"
          </p>
          <p className="text-brand-green text-xs font-medium mb-8 text-amber-400">
            — Surah Al-Alaq 96:3
          </p>

          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Begin Your Quran Journey Today
          </h2>
          <p className="text-white/80 max-w-2xl mx-auto mb-10">
            Join thousands of students worldwide who have transformed their lives through the divine wisdom of the Holy Quran. Start with a free trial class.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://wa.me/923177479286"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-brand-green hover:bg-[#2a4a38] text-white px-8 py-4 rounded-full font-bold flex items-center gap-2 transition-all"
            >
              <MessageCircle className="w-5 h-5" />
              WhatsApp: +92 317 7479 286
            </a>
            <Link
              to="/register"
              className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-4 rounded-full font-bold transition-all"
            >
              Get Free Trial Class
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
