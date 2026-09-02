import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, CheckCircle, Star, ArrowRight, MessageCircle, Mail, Phone, 
  Users, Award, Calendar, ChevronDown, ChevronUp, Clock, ShieldCheck, Heart, Sparkles 
} from 'lucide-react';
import CourseCard from '../components/CourseCard';
import { getCourses } from '../api/courses';

export default function Home() {
  const [courses, setCourses] = useState([]);
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    getCourses().then(data => {
      // Filter or pick the 4 featured courses specified
      const featured = data.slice(0, 4);
      setCourses(featured);
    });
  }, []);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const journeySteps = [
    { num: '01', title: 'Free Consultation', desc: 'Discuss your learning goals, current level, and preferred schedule with our academic team.' },
    { num: '02', title: 'Choose Course', desc: 'Select from Basic Qaidah, Nazra, Tajweed, Hifz, or Islamic Studies based on your target.' },
    { num: '03', title: 'One-on-One Classes', desc: 'Enjoy dedicated live 1-on-1 virtual sessions with certified expert tutors.' },
    { num: '04', title: 'Track Progress', desc: 'Receive weekly feedback, recitation corrections, and monthly progress evaluations.' },
    { num: '05', title: 'Achieve Mastery', desc: 'Master Tajweed rules, memorization targets, and correct Quranic pronunciation.' },
    { num: '06', title: 'Lifelong Learning', desc: 'Build a lifelong spiritual bond with the Holy Quran and apply its teachings daily.' },
  ];

  const stats = [
    { value: '5+', label: 'Years Experience' },
    { value: '600+', label: 'Active Students' },
    { value: '3000+', label: 'Students Taught' },
    { value: '4', label: 'Expert Teachers' },
    { value: '8', label: 'Specialized Courses' },
    { value: '100%', label: 'Student Satisfaction' },
  ];

  const faqs = [
    { q: 'How do I start?', a: 'Getting started is simple! Fill out our online registration form or send us a message on WhatsApp (+92 317 7479 286). We will arrange a free 3-day trial class at your preferred time.' },
    { q: 'Is the 3-day trial class completely free?', a: 'Yes! The 3-day trial class is 100% free with no credit card or advance payment required. Experience our teaching quality before enrolling.' },
    { q: 'Are classes 1-on-1 or in groups?', a: 'All our classes are 100% private 1-on-1 sessions. Your teacher gives you 100% undivided attention throughout the entire session.' },
    { q: 'What courses do you offer?', a: 'We offer Basic Qaidah, Quran Reading Nazra, Quran Memorization Hifz, Tajweed Course, Quran Translation & Tafseer, Daily Duas & Kalimas, Hadith Studies, and Islamic Studies.' },
    { q: 'Do you have both male and female teachers?', a: 'Yes, we have certified male and female Quran scholars available so sisters and young children can learn comfortably with female instructors.' },
    { q: 'What are the class timings?', a: 'We operate 24 hours a day, 7 days a week. You can choose any time slot that fits your local timezone (US, UK, Canada, Australia, Gulf, etc.).' },
    { q: 'Which countries do you serve?', a: 'We teach students from all over the world, including the United States, United Kingdom, Canada, Australia, UAE, Saudi Arabia, and Europe.' },
    { q: 'What languages do teachers speak?', a: 'Our teachers speak fluent English, Urdu, and Arabic, making communication easy for children and adults alike.' },
    { q: 'How much do classes cost?', a: 'Our monthly packages start from just $20/month depending on class frequency (3, 4, 5 days/week or Weekend only).' },
    { q: 'What happens if I miss a class?', a: 'If you notify your instructor in advance, makeup classes can be rescheduled at a mutually convenient time.' },
  ];

  return (
    <div className="space-y-0">
      
      {/* HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center justify-center bg-hero-gradient text-white pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-islamic-pattern opacity-40 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          
          {/* Bismillah Arabic text */}
          <div className="mb-6 animate-fadeIn">
            <span className="font-arabic text-2xl sm:text-3xl lg:text-4xl text-gold font-bold tracking-wide drop-shadow-lg">
              بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
            </span>
          </div>

          {/* Quran quote */}
          <div className="max-w-3xl mx-auto mb-8 bg-emerald-900/40 border border-gold/30 rounded-2xl p-4 sm:p-6 backdrop-blur-md shadow-2xl">
            <p className="font-arabic text-xl sm:text-2xl text-amber-200 mb-2 font-medium">
              "وَلَقَدْ يَسَّرْنَا الْقُرْآنَ لِلذِّكْرِ فَهَلْ مِن مُّدَّكِرٍ"
            </p>
            <p className="text-sm sm:text-base text-slate-200 italic font-serif">
              "And We have certainly made the Quran easy for remembrance, so is there any who will remember?"
            </p>
            <span className="text-xs text-gold/80 font-sans mt-1 block uppercase tracking-wider">
              — Surah Al-Qamar (54:17)
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-serif tracking-tight text-white mb-6 leading-tight">
            Learn From <span className="text-gold">Expert Teachers</span>
          </h1>
          <p className="text-base sm:text-xl text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
            Empowering students worldwide with authentic 1-on-1 Quran, Tajweed, and Islamic education from the comfort of home.
          </p>

          {/* Hero Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            <Link
              to="/register"
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-amber-500 via-gold to-amber-600 text-emerald-950 font-bold text-base rounded-full shadow-lg hover:shadow-gold/30 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <span>Start Learning Today</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/courses"
              className="w-full sm:w-auto px-8 py-4 bg-transparent border-2 border-gold/70 text-gold hover:bg-gold/10 font-bold text-base rounded-full transition-all duration-300 flex items-center justify-center gap-2"
            >
              <span>Explore Courses</span>
              <BookOpen className="w-5 h-5" />
            </Link>
          </div>

          {/* WhatsApp Direct Contact Banner */}
          <div className="inline-flex items-center gap-3 bg-[#395240]/90 border border-emerald-500/40 px-6 py-3 rounded-full text-sm text-white shadow-xl">
            <MessageCircle className="w-5 h-5 text-emerald-300 shrink-0" />
            <span>Quick Admissions via WhatsApp:</span>
            <a
              href="https://wa.me/923177479286"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-gold hover:underline"
            >
              +92 317 7479 286
            </a>
          </div>

        </div>
      </section>

      {/* MEET OUR FOUNDER */}
      <section className="py-20 bg-slate-900 text-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-900/80 text-gold text-xs font-semibold uppercase tracking-wider border border-gold/30">
                <Award className="w-4 h-4" /> Meet Our Founder & Lead Instructor
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold font-serif text-white">
                Ustaz Abdul Muhaymin
              </h2>
              <p className="text-gold font-medium text-lg">
                Bahawalpur, Pakistan • 5+ Years Teaching Experience
              </p>

              {/* Arabic quote Surah An-Nisa 4:113 */}
              <div className="p-5 bg-emerald-950/80 border-l-4 border-gold rounded-r-2xl space-y-2 my-4">
                <p className="font-arabic text-lg sm:text-xl text-amber-200 leading-loose">
                  "وَأَنزَلَ اللَّهُ عَلَيْكَ الْكِتَابَ وَالْحِكْمَةَ وَعَلَّمَكَ مَا لَمْ تَكُن تَعْلَمُ ۚ وَكَانَ فَضْلُ اللَّهِ عَلَيْكَ عَظِيمًا"
                </p>
                <p className="text-xs sm:text-sm text-slate-300 italic">
                  "And Allah has revealed to you the Book and wisdom and has taught you that which you did not know. And ever has the favor of Allah upon you been great." (Surah An-Nisa 4:113)
                </p>
              </div>

              <p className="text-slate-300 leading-relaxed font-light text-base">
                Welcome to <strong>QURAN ONLINE ACADEMIA</strong>. Founded by Ustaz Abdul Muhaymin in Bahawalpur, Pakistan, our academy is committed to preserving authentic Tajweed and Quranic recitation standards. Over the past 5+ years, we have guided thousands of children and adults globally to recite and memorize the Holy Quran with devotion and perfection.
              </p>

              {/* Stats badges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
                <div className="bg-emerald-950/60 p-4 rounded-xl border border-emerald-800 text-center">
                  <span className="text-2xl font-bold text-gold font-serif block">5+</span>
                  <span className="text-xs text-slate-400 font-medium">Years Experience</span>
                </div>
                <div className="bg-emerald-950/60 p-4 rounded-xl border border-emerald-800 text-center">
                  <span className="text-2xl font-bold text-gold font-serif block">600+</span>
                  <span className="text-xs text-slate-400 font-medium">Active Students</span>
                </div>
                <div className="bg-emerald-950/60 p-4 rounded-xl border border-emerald-800 text-center">
                  <span className="text-2xl font-bold text-gold font-serif block">3000+</span>
                  <span className="text-xs text-slate-400 font-medium">Students Taught</span>
                </div>
                <div className="bg-emerald-950/60 p-4 rounded-xl border border-emerald-800 text-center">
                  <span className="text-2xl font-bold text-gold font-serif block">Certified</span>
                  <span className="text-xs text-slate-400 font-medium">Quran Educator</span>
                </div>
              </div>
            </div>

            <div className="relative flex justify-center">
              <div className="relative w-full max-w-md bg-gradient-to-b from-emerald-800/40 to-emerald-950/80 p-8 rounded-3xl border border-gold/30 shadow-2xl text-center">
                <div className="w-28 h-28 mx-auto rounded-full bg-emerald-900 border-2 border-gold flex items-center justify-center mb-6 shadow-xl">
                  <BookOpen className="w-14 h-14 text-gold" />
                </div>
                <h3 className="text-2xl font-bold text-white font-serif mb-1">Ustaz Abdul Muhaymin</h3>
                <p className="text-xs uppercase tracking-widest text-emerald-400 font-semibold mb-4">Founder & Academy Principal</p>
                <p className="text-slate-300 text-sm italic mb-6">
                  "Our mission is to bring the divine light of the Quran into every home with utmost reverence, authentic pronunciation, and loving guidance."
                </p>
                <a
                  href="https://wa.me/923177479286"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full py-3 bg-[#395240] hover:bg-[#2d4233] text-white font-bold text-sm rounded-xl shadow transition-colors"
                >
                  <MessageCircle className="w-4 h-4" /> Message Ustaz on WhatsApp
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FEATURED COURSES SECTION */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-800 bg-emerald-100 px-4 py-1.5 rounded-full border border-emerald-200">
              Structured Islamic Curriculum
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-serif text-slate-900">
              Our Featured Courses
            </h2>
            <p className="text-slate-600 text-base">
              Personalized 1-on-1 Quran and Islamic studies designed for kids and adults at all skill levels.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>

          <div className="text-center">
            <Link
              to="/courses"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-emerald-900 hover:bg-emerald-800 text-gold font-bold text-sm rounded-full shadow-md transition-all"
            >
              <span>View All Courses</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* YOUR LEARNING JOURNEY (6 STEPS) */}
      <section className="py-20 bg-emerald-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-islamic-pattern opacity-25 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-gold bg-emerald-900/80 px-4 py-1.5 rounded-full border border-gold/30">
              Simple 6-Step Process
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-serif text-white">
              Your Learning Journey
            </h2>
            <p className="text-slate-300 text-base">
              How we guide you from beginner level to confident, melodious Quran recitation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {journeySteps.map((step) => (
              <div key={step.num} className="bg-emerald-900/40 border border-emerald-800 p-8 rounded-2xl hover:border-gold/50 transition-all duration-300 relative group">
                <span className="text-4xl font-bold font-serif text-gold/40 group-hover:text-gold transition-colors block mb-4">
                  {step.num}
                </span>
                <h3 className="text-xl font-bold text-white font-serif mb-2">{step.title}</h3>
                <p className="text-slate-300 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* FREE 3-DAY TRIAL CLASS CTA */}
      <section className="py-16 bg-gradient-to-r from-amber-500 via-gold to-amber-600 text-emerald-950 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-emerald-950 text-white rounded-3xl p-8 sm:p-12 shadow-2xl border border-gold/40 flex flex-col lg:flex-row items-center justify-between gap-8">
            
            <div className="space-y-4 max-w-2xl">
              <span className="bg-gold text-emerald-950 text-xs font-extrabold uppercase px-3.5 py-1 rounded-full tracking-wider">
                100% Risk-Free Opportunity
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold font-serif text-white">
                Start With a Free 3-Day Trial Class
              </h2>
              <p className="text-slate-300 text-base leading-relaxed">
                Test our live 1-on-1 teaching environment, meet your instructor, and evaluate our teaching methodology with zero commitment.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                <div className="flex items-center gap-2.5 text-sm font-medium text-amber-200">
                  <ShieldCheck className="w-5 h-5 text-gold shrink-0" />
                  <span>No Payment Required</span>
                </div>
                <div className="flex items-center gap-2.5 text-sm font-medium text-amber-200">
                  <Users className="w-5 h-5 text-gold shrink-0" />
                  <span>One-on-One Session</span>
                </div>
                <div className="flex items-center gap-2.5 text-sm font-medium text-amber-200">
                  <Award className="w-5 h-5 text-gold shrink-0" />
                  <span>Meet Your Teacher</span>
                </div>
              </div>
            </div>

            <div className="shrink-0 w-full lg:w-auto text-center">
              <Link
                to="/register"
                className="inline-flex items-center justify-center gap-2 w-full lg:w-auto px-8 py-4 bg-gold hover:bg-gold-light text-emerald-950 font-extrabold text-base rounded-2xl shadow-xl transition-all hover:scale-105"
              >
                <span>Start Free Trial</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* OUR IMPACT IN NUMBERS */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold font-serif text-white">
              Our Impact in Numbers
            </h2>
            <p className="text-slate-400 text-base mt-2">
              Trusted by parents and students across North America, Europe, and the Middle East.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 text-center">
            {stats.map((stat, i) => (
              <div key={i} className="p-6 bg-emerald-950/60 rounded-2xl border border-emerald-800/60 shadow-lg">
                <span className="text-3xl sm:text-4xl font-extrabold text-gold font-serif block mb-2">{stat.value}</span>
                <span className="text-xs sm:text-sm text-slate-300 font-medium">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STUDENT SUCCESS STORIES */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-800 bg-emerald-100 px-4 py-1.5 rounded-full border border-emerald-200">
              Testimonials
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-serif text-slate-900 mt-3">
              Student Success Stories
            </h2>
          </div>

          <div className="max-w-3xl mx-auto bg-white rounded-3xl p-8 sm:p-12 shadow-xl border border-slate-100 text-center relative">
            <div className="flex justify-center gap-1 text-amber-400 mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 fill-amber-400" />
              ))}
            </div>
            <p className="text-slate-700 text-lg sm:text-xl italic font-serif leading-relaxed mb-6">
              "Alhamdulillah, finding QURAN ONLINE ACADEMIA was a true blessing for our family in the United States. Ustaz Abdul Muhaymin and the teaching team are exceptionally patient, knowledgeable, and punctual. Both my son and daughter have improved their Tajweed significantly in just 4 months!"
            </p>
            <div className="border-t border-slate-100 pt-4">
              <h4 className="text-lg font-bold text-slate-900 font-serif">Muhammad Ali</h4>
              <p className="text-xs text-emerald-700 font-medium">United States • Parent of 2 Students</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ SECTION (10 QUESTIONS) */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-800 bg-emerald-100 px-4 py-1.5 rounded-full border border-emerald-200">
              Got Questions?
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-serif text-slate-900 mt-3">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="border border-slate-200 rounded-2xl overflow-hidden transition-all">
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full text-left p-5 bg-slate-50 hover:bg-slate-100 flex items-center justify-between font-bold text-slate-900 text-base font-serif"
                >
                  <span>{faq.q}</span>
                  {openFaq === idx ? (
                    <ChevronUp className="w-5 h-5 text-emerald-800 shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
                  )}
                </button>
                {openFaq === idx && (
                  <div className="p-5 bg-white text-slate-600 text-sm leading-relaxed border-t border-slate-100">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="py-20 bg-hero-gradient text-white relative text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <span className="font-arabic text-2xl text-gold font-bold block">
            بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-serif text-white">
            Begin Your Quran Journey Today
          </h2>
          <p className="text-slate-300 text-base max-w-xl mx-auto font-light">
            Join hundreds of satisfied students worldwide. Reserve your free 3-day trial class now with our expert instructors.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              to="/register"
              className="w-full sm:w-auto px-8 py-4 bg-gold hover:bg-gold-light text-emerald-950 font-bold text-base rounded-full shadow-lg transition-all"
            >
              Get Free Trial Class
            </Link>
            <a
              href="https://wa.me/923177479286"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 bg-[#395240] hover:bg-[#2d4233] text-white font-bold text-base rounded-full shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-5 h-5 text-emerald-300" />
              <span>Chat on WhatsApp (+92 317 7479 286)</span>
            </a>
          </div>

          <p className="text-xs text-slate-400 pt-2">
            Email us anytime at <a href="mailto:quranonlineacademia@gmail.com" className="text-gold underline">quranonlineacademia@gmail.com</a>
          </p>
        </div>
      </section>

    </div>
  );
}
