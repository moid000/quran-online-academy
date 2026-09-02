import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, ArrowRight } from 'lucide-react';
import { getCourses } from '../api/courses';
import CourseCard from '../components/CourseCard';

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [selectedLevel, setSelectedLevel] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCourses().then(data => {
      setCourses(data || []);
      setLoading(false);
    });
  }, []);

  const levels = ['All', 'Beginner', 'Intermediate', 'All Levels'];

  const filteredCourses = selectedLevel === 'All'
    ? courses
    : courses.filter(c => c.level === selectedLevel);

  return (
    <div className="pt-0 min-h-screen bg-white">
      
      {/* HERO SECTION */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 to-slate-950" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=1920&q=80')] bg-cover bg-center opacity-10" />
        <div className="container mx-auto px-4 relative z-10 text-center mt-20">
          <div className="text-amber-400 font-arabic text-2xl mb-4">عَلِّمُوا الْقُرْآنَ</div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Our Courses</h1>
        </div>
      </section>

      {/* COURSES SECTION */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="text-brand-green font-arabic text-2xl mb-2">
              ﷽
            </div>
            <p className="text-lg text-slate-600 mt-2">
              Comprehensive Islamic education tailored for every learner
            </p>
            <div className="h-1 w-24 bg-brand-green mx-auto mt-6 rounded-full"></div>
          </div>

          {/* Level Filter Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
            {levels.map((lvl) => {
              const isActive = selectedLevel === lvl;
              return (
                <button
                  key={lvl}
                  onClick={() => setSelectedLevel(lvl)}
                  className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all ${
                    isActive
                      ? 'bg-brand-green text-white shadow-md'
                      : 'bg-white text-slate-700 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  {lvl}
                </button>
              );
            })}
          </div>

          {/* Course Grid */}
          {loading ? (
            <div className="text-center py-20 text-slate-500 font-medium text-lg">
              Loading courses...
            </div>
          ) : filteredCourses.length === 0 ? (
            <div className="text-center py-20 text-slate-500 font-medium">
              No courses found for this level.
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredCourses.map((course) => (
                <CourseCard key={course.id || course.slug} course={course} />
              ))}
            </div>
          )}

          {/* CTA / Guidance Card */}
          <div className="mt-20 bg-slate-900 text-white rounded-3xl p-8 md:p-12 shadow-xl relative overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=1920&q=80"
              alt="Quran Background"
              className="absolute inset-0 w-full h-full object-cover opacity-10 pointer-events-none"
            />
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
              <div className="space-y-3 max-w-2xl">
                <div className="text-amber-400 font-arabic text-2xl">
                  ﷽
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-white">
                  Not Sure Which Course to Choose?
                </h2>
                <p className="text-slate-300 text-base leading-relaxed">
                  Our academic team is here to assess your current reading level and recommend the perfect course for you or your child.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0">
                <a
                  href="https://wa.me/923177479286"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-amber-500 hover:bg-amber-600 text-white rounded-full font-bold px-8 py-4 inline-flex items-center gap-2 shadow-lg transition-all"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>Free Consultation</span>
                </a>
                <Link
                  to="/register"
                  className="bg-brand-green hover:bg-[#2a4a38] text-white rounded-full font-bold px-8 py-4 inline-flex items-center gap-2 transition-all border border-brand-green/30"
                >
                  <span>Register Now</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
