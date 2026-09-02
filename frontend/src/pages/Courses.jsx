import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Clock, BookOpen, UserCheck, MessageCircle, ArrowRight, CheckCircle2, HelpCircle } from 'lucide-react';
import { getCourses } from '../api/courses';

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCourses().then(data => {
      setCourses(data);
      setLoading(false);
    });
  }, []);

  const courseFeatures = [
    'Learn at your own pace',
    'Expert male/female instructors',
    'Interactive 1-on-1 sessions',
    'Completion Certificate'
  ];

  return (
    <div className="pt-24 pb-20 space-y-16 bg-slate-50 min-h-screen">
      
      {/* HEADER BANNER */}
      <section className="bg-hero-gradient text-white py-16 relative overflow-hidden text-center">
        <div className="absolute inset-0 bg-islamic-pattern opacity-30 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-4">
          
          {/* Arabic Title */}
          <span className="font-arabic text-3xl sm:text-4xl text-gold font-bold block drop-shadow-md">
            عَلِّمُوا الْقُرْآنَ
          </span>

          <h1 className="text-3xl sm:text-5xl font-extrabold font-serif text-white tracking-tight">
            Our Courses
          </h1>
          <p className="text-slate-300 text-base max-w-2xl mx-auto font-light leading-relaxed">
            Discover our comprehensive range of 1-on-1 Quranic and Islamic programs designed for kids and adults at every stage of their learning journey.
          </p>
        </div>
      </section>

      {/* COURSE CARDS GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {loading ? (
          <div className="text-center py-20 text-slate-500 font-medium">Loading courses...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {courses.map((course) => {
              const { id, slug, title, arabicTitle, description, level, duration, classesPerWeek, image, instructor } = course;
              const whatsappMsg = encodeURIComponent(`Assalamu Alaikum, I am interested in enrolling for the ${title} course at QURAN ONLINE ACADEMIA.`);
              const whatsappUrl = `https://wa.me/923177479286?text=${whatsappMsg}`;

              const levelColor = {
                'Beginner': 'bg-emerald-800 text-gold border-gold/30',
                'Intermediate': 'bg-amber-900/80 text-amber-200 border-amber-500/30',
                'Advanced': 'bg-purple-950 text-purple-200 border-purple-500/30',
                'All Levels': 'bg-blue-950 text-blue-200 border-blue-500/30'
              }[level] || 'bg-emerald-900 text-gold border-gold/30';

              return (
                <div key={id} className="bg-white rounded-2xl overflow-hidden shadow-lg border border-slate-100 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1">
                  
                  {/* Top Image & Level Badge */}
                  <div>
                    <div className="relative h-48 overflow-hidden bg-slate-900">
                      <img
                        src={image || 'https://images.unsplash.com/photo-1609599006353-e629aaabfeae?auto=format&fit=crop&q=80&w=800'}
                        alt={title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/80 via-transparent to-transparent"></div>
                      
                      {/* Level Badge */}
                      <span className={`absolute top-3 right-3 text-xs font-semibold px-3 py-1 rounded-full border shadow-sm ${levelColor}`}>
                        {level}
                      </span>

                      {/* Arabic Title */}
                      {arabicTitle && (
                        <span className="absolute bottom-3 left-4 font-arabic text-xl text-gold font-bold drop-shadow-md">
                          {arabicTitle}
                        </span>
                      )}
                    </div>

                    {/* Card Content */}
                    <div className="p-6 space-y-4">
                      <h3 className="text-xl font-bold text-slate-900 font-serif group-hover:text-emerald-800 transition-colors">
                        {title}
                      </h3>
                      
                      <p className="text-slate-600 text-xs leading-relaxed line-clamp-3">
                        {description}
                      </p>

                      {/* Course Key Details */}
                      <div className="space-y-1.5 pt-2 border-t border-slate-100 text-xs text-slate-500">
                        <div className="flex items-center justify-between">
                          <span className="flex items-center gap-1 font-medium text-slate-700">
                            <Clock className="w-3.5 h-3.5 text-emerald-700" /> {duration}
                          </span>
                          <span className="flex items-center gap-1 font-medium text-slate-700">
                            <BookOpen className="w-3.5 h-3.5 text-emerald-700" /> {classesPerWeek || '3 Classes / Wk'}
                          </span>
                        </div>
                        {instructor && (
                          <div className="flex items-center gap-1 text-slate-600 pt-1">
                            <UserCheck className="w-3.5 h-3.5 text-gold" />
                            <span>Tutor: {instructor}</span>
                          </div>
                        )}
                      </div>

                      {/* Course Features */}
                      <div className="space-y-1.5 pt-2 border-t border-slate-100 text-xs text-slate-700">
                        {courseFeatures.map((feat, i) => (
                          <div key={i} className="flex items-center gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Actions / Enroll Button */}
                  <div className="p-6 pt-0 space-y-2">
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 bg-[#395240] hover:bg-[#2d4233] text-white font-bold text-xs rounded-xl shadow transition-colors"
                    >
                      <MessageCircle className="w-4 h-4 text-emerald-300" />
                      <span>Enroll via WhatsApp</span>
                    </a>
                    
                    <Link
                      to={`/courses/${slug || id}`}
                      className="w-full inline-flex items-center justify-center gap-1 text-xs font-semibold text-emerald-900 hover:text-emerald-700 py-1"
                    >
                      <span>View Course Details</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>

                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* CTA SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-emerald-950 text-white rounded-3xl p-8 sm:p-12 shadow-2xl border border-gold/40 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl">
            <div className="inline-flex items-center gap-2 text-gold text-xs font-bold uppercase tracking-wider bg-emerald-900/80 px-3.5 py-1 rounded-full border border-gold/30">
              <HelpCircle className="w-4 h-4" /> Personal Guidance
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-white">
              Not Sure Which Course to Choose?
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              Our academic advisors can evaluate your reading level and recommend the best program and class frequency for you or your child.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
            <a
              href="https://wa.me/923177479286"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-gold hover:bg-gold-light text-emerald-950 font-bold text-sm rounded-xl shadow-lg transition-all"
            >
              <MessageCircle className="w-4 h-4" /> Get Free Consultation
            </a>
            <Link
              to="/pricing"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-emerald-900 hover:bg-emerald-800 text-gold font-bold text-sm rounded-xl border border-gold/30 transition-all"
            >
              View Fee Structure
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
