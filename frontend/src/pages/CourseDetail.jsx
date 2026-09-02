import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Clock, BookOpen, CheckCircle2, UserCheck, ArrowLeft, ArrowRight, 
  MessageCircle, Calendar, Check
} from 'lucide-react';
import { getCourseById, getCourses } from '../api/courses';
import CourseCard from '../components/CourseCard';
import { motion } from 'framer-motion';
import SectionHeader from '../components/SectionHeader';
import GlassCard from '../components/GlassCard';
import AnimatedButton from '../components/AnimatedButton';

export default function CourseDetail() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [relatedCourses, setRelatedCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    getCourseById(id)
      .then((data) => {
        setCourse(data);
        return getCourses();
      })
      .then((allCourses) => {
        if (allCourses) {
          const filtered = allCourses.filter(c => c.id !== id && c.slug !== id).slice(0, 3);
          setRelatedCourses(filtered);
        }
      })
      .catch((err) => {
        setError(err.message || 'Failed to load course details');
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="pt-20 min-h-screen bg-white flex items-center justify-center">
        <div className="text-center text-slate-500 font-medium text-lg">Loading course details...</div>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="pt-20 min-h-screen bg-white flex items-center justify-center">
        <div className="text-center space-y-4 max-w-md mx-auto px-4">
          <h2 className="text-2xl font-bold text-slate-900">Course Not Found</h2>
          <p className="text-slate-600">{error || "We couldn't find the requested course."}</p>
          <Link
            to="/courses"
            className="inline-flex items-center gap-2 text-brand-green font-bold hover:underline"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Courses
          </Link>
        </div>
      </div>
    );
  }

  const { title, arabicTitle, description, level, duration, classesPerWeek, classDuration, image, curriculum = [], instructor } = course;

  const whatsappMsg = encodeURIComponent(`Assalamu Alaikum, I would like to enroll in the ${title} course at Quran Online Academy.`);
  const whatsappUrl = `https://wa.me/923177479286?text=${whatsappMsg}`;

  const featuresList = [
    '1-on-1 Dedicated Virtual Classroom',
    'Male & Female Tutors Available',
    '3-Day Free Trial Class',
    'Flexible Schedule (24/7)',
    'Completion Certificate',
    'Regular Progress Reports'
  ];

  const courseDetailsList = [
    { icon: Clock, label: 'Duration', value: duration || 'Flexible' },
    { icon: BookOpen, label: 'Frequency', value: classesPerWeek || '3 Classes/Wk' },
    { icon: Calendar, label: 'Class Length', value: classDuration || '30 mins' },
    { icon: UserCheck, label: 'Instructor', value: instructor || 'Ustaz Abdul Muhaymin' }
  ];

  return (
    <div className="pt-20 min-h-screen bg-white">
      
      {/* COURSE HEADER / HERO SECTION */}
      <section className="bg-slate-900 text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#345B46]/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
        </div>
        <img
          src="https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=1920&q=80"
          alt="Quran Background"
          className="absolute inset-0 w-full h-full object-cover opacity-10 pointer-events-none"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-4"
        >
          <Link
            to="/courses"
            className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 font-medium text-sm transition-colors mb-2"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Courses
          </Link>

          {arabicTitle && (
            <div className="text-amber-400 font-arabic text-2xl md:text-3xl">
              {arabicTitle}
            </div>
          )}

          <div className="flex flex-wrap items-center gap-3">
            <span className="bg-brand-green text-white text-xs font-bold px-3 py-1 rounded-full">
              {level} Level
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
            {title}
          </h1>

          <p className="text-lg text-slate-300 max-w-3xl leading-relaxed">
            {description}
          </p>
        </motion.div>
      </section>

      {/* TWO COLUMNS CONTENT */}
      <section className="py-16 bg-white relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#345B46]/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            
            {/* LEFT COLUMN: COURSE DETAILS & CONTENT */}
            <div className="lg:col-span-2 space-y-10">
              
              {/* Image banner */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <div className="rounded-2xl overflow-hidden shadow-sm border border-gray-200">
                  <img
                    src={image || 'https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=800&q=80'}
                    alt={title}
                    className="w-full h-80 object-cover"
                  />
                </div>
              </motion.div>

              {/* Course Overview Section */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="space-y-10"
              >
                <div className="space-y-4">
                  <div className="text-brand-green font-arabic text-xl">
                    ﷽
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900">Course Overview</h2>
                  <p className="text-slate-700 leading-relaxed text-base">
                    {description}
                  </p>
                  <p className="text-slate-700 leading-relaxed text-base">
                    Our 1-on-1 private virtual classes ensure you or your child receive undivided attention from qualified Quran scholars. Lessons are paced according to your learning speed, combining traditional tajweed methodology with modern online teaching tools.
                  </p>
                </div>

                {/* Curriculum / What You'll Learn */}
                {curriculum.length > 0 && (
                  <div className="space-y-4 pt-6 border-t border-gray-100">
                    <div className="text-brand-green font-arabic text-xl">
                      ﷽
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900">What You Will Learn</h2>
                    <div className="grid sm:grid-cols-2 gap-4 pt-2">
                      {curriculum.map((item, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: idx * 0.1 }}
                          className="bg-gray-50 border border-gray-200 rounded-xl p-4 flex items-start gap-3"
                        >
                          <CheckCircle2 className="w-5 h-5 text-brand-green shrink-0 mt-0.5" />
                          <span className="text-slate-700 font-medium text-sm">{item}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Course Details & Requirements Grid */}
                <div className="space-y-4 pt-6 border-t border-gray-100">
                  <div className="text-brand-green font-arabic text-xl">
                    ﷽
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900">Course Details & Requirements</h2>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
                    {courseDetailsList.map((detail, idx) => {
                      const IconComp = detail.icon;
                      return (
                        <GlassCard key={idx} delay={idx * 0.1} className="p-4 text-center">
                          <IconComp className="w-6 h-6 text-brand-green mx-auto mb-2" />
                          <span className="text-xs text-slate-500 block">{detail.label}</span>
                          <span className="text-sm font-bold text-slate-900">{detail.value}</span>
                        </GlassCard>
                      );
                    })}
                  </div>
                </div>

              </motion.div>

            </div>

            {/* RIGHT COLUMN: ENROLLMENT CARD */}
            <div className="lg:col-span-1">
              <GlassCard className="p-6 sticky top-28 space-y-6" hover={false}>
                
                <div className="space-y-2 border-b border-gray-100 pb-4">
                  <span className="text-xs font-semibold uppercase tracking-wider text-brand-green bg-brand-green/10 px-3 py-1 rounded-full">
                    Enrollment Plan
                  </span>
                  <div className="text-3xl font-bold text-slate-900 pt-2">
                    Flexible Plans
                  </div>
                  <p className="text-xs text-slate-500">
                    Starting from $20 / month • Cancel or adjust schedule anytime
                  </p>
                </div>

                {/* Features List */}
                <div className="space-y-3">
                  <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                    Package Includes:
                  </h4>
                  {featuresList.map((feat, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: idx * 0.05 }}
                      className="flex items-center gap-2.5 text-sm text-slate-700"
                    >
                      <Check className="w-4 h-4 text-brand-green shrink-0" />
                      <span>{feat}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Enroll Buttons */}
                <div className="pt-4 space-y-3">
                  <AnimatedButton
                    href={whatsappUrl}
                    variant="primary"
                    icon={MessageCircle}
                    className="w-full text-center"
                  >
                    Enroll via WhatsApp
                  </AnimatedButton>

                  <AnimatedButton
                    to={`/register?course=${course.id}`}
                    variant="secondary"
                    icon={ArrowRight}
                    className="w-full text-center"
                  >
                    Register Student
                  </AnimatedButton>
                </div>

                <p className="text-center text-xs text-slate-500 italic">
                  No advance payment or credit card required for 3-day trial.
                </p>

              </GlassCard>
            </div>

          </div>
        </div>
      </section>

      {/* RELATED COURSES */}
      {relatedCourses.length > 0 && (
        <section className="py-16 bg-gray-50 border-t border-gray-100 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#345B46]/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl" />
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            
            <SectionHeader
              title="Related Courses"
              subtitle="Explore other specialized programs offered by our academy"
            />

            <div className="grid md:grid-cols-3 gap-6">
              {relatedCourses.map((relCourse, idx) => (
                <motion.div
                  key={relCourse.id || relCourse.slug || idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                >
                  <CourseCard course={relCourse} />
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link
                to="/courses"
                className="inline-flex items-center gap-2 text-brand-green hover:text-[#2a4a38] font-bold text-base transition-colors"
              >
                <ArrowLeft className="w-4 h-4" /> Back to All Courses
              </Link>
            </div>

          </div>
        </section>
      )}

    </div>
  );
}
