import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2, MessageCircle } from 'lucide-react';
import { getCourses } from '../api/courses';
import CourseCard from '../components/CourseCard';
import AnimatedButton from '../components/AnimatedButton';

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCourses().then(data => {
      setCourses(data || []);
      setLoading(false);
    });
  }, []);

  return (
    <div className="pt-20">

      {/* 1. HERO SECTION */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900" />
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1585036156171-384164a8c675?w=1920&q=80')] bg-cover bg-center opacity-10" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-amber-400 font-arabic text-2xl mb-4"
            >
              عَلِّمُوا الْقُرْآنَ
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-bold text-white mb-6"
            >
              Our Courses
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-slate-300 text-lg"
            >
              Comprehensive Islamic education tailored for every learner
            </motion.p>
          </div>
        </div>
      </section>

      {/* 2. COURSES GRID */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin w-8 h-8 border-4 border-amber-500 border-t-transparent rounded-full" />
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {courses.map((course, idx) => (
                <CourseCard key={course.id || course._id || idx} course={course} index={idx} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 3. CTA SECTION */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="backdrop-blur-xl bg-white border border-gray-200 rounded-3xl p-8 md:p-12 shadow-lg"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Not Sure Which Course to Choose?
              </h2>
              <p className="text-slate-600 mb-8">
                Contact us for a free consultation. We'll assess your level and recommend the perfect course for you.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <AnimatedButton href="https://wa.me/923177479286" variant="primary" size="large" icon={MessageCircle}>
                  Get Free Consultation
                </AnimatedButton>
                <Link to="/fees" onClick={() => window.scrollTo(0, 0)}>
                  <AnimatedButton variant="outline" size="large">
                    View Fee Structure
                  </AnimatedButton>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

    </div>
  );
}
