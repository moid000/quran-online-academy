import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Clock, BookOpen, CheckCircle2, UserCheck, ArrowLeft, ArrowRight, 
  MessageCircle, Calendar, Check
} from 'lucide-react';
import { getCourseById, getCourses } from '../api/courses';
import CourseCard from '../components/CourseCard';

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

  return (
    <div className="pt-20 min-h-screen bg-white">
      
      {/* COURSE HEADER */}
      <section className="bg-slate-900 text-white py-16 relative overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=1920&q=80"
          alt="Quran Background"
          className="absolute inset-0 w-full h-full object-cover opacity-10 pointer-events-none"
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-4">
          
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

        </div>
      </section>

      {/* TWO COLUMNS CONTENT */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            
            {/* LEFT COLUMN: COURSE DETAILS & CONTENT */}
            <div className="lg:col-span-2 space-y-10">
              
              {/* Image banner */}
              <div className="rounded-2xl overflow-hidden shadow-sm border border-gray-200">
                <img
                  src={image || 'https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=800&q=80'}
                  alt={title}
                  className="w-full h-80 object-cover"
                />
              </div>

              {/* Course Overview */}
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
                      <div
                        key={idx}
                        className="bg-gray-50 border border-gray-200 rounded-xl p-4 flex items-start gap-3"
                      >
                        <CheckCircle2 className="w-5 h-5 text-brand-green shrink-0 mt-0.5" />
                        <span className="text-slate-700 font-medium text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Course Requirements & Details Grid */}
              <div className="space-y-4 pt-6 border-t border-gray-100">
                <div className="text-brand-green font-arabic text-xl">
                  ﷽
                </div>
                <h2 className="text-2xl font-bold text-slate-900">Course Details & Requirements</h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
                  <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
                    <Clock className="w-6 h-6 text-brand-green mx-auto mb-2" />
                    <span className="text-xs text-slate-500 block">Duration</span>
                    <span className="text-sm font-bold text-slate-900">{duration || 'Flexible'}</span>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
                    <BookOpen className="w-6 h-6 text-brand-green mx-auto mb-2" />
                    <span className="text-xs text-slate-500 block">Frequency</span>
                    <span className="text-sm font-bold text-slate-900">{classesPerWeek || '3 Classes/Wk'}</span>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
                    <Calendar className="w-6 h-6 text-brand-green mx-auto mb-2" />
                    <span className="text-xs text-slate-500 block">Class Length</span>
                    <span className="text-sm font-bold text-slate-900">{classDuration || '30 mins'}</span>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
                    <UserCheck className="w-6 h-6 text-brand-green mx-auto mb-2" />
                    <span className="text-xs text-slate-500 block">Instructor</span>
                    <span className="text-sm font-bold text-slate-900">{instructor || 'Ustaz Abdul Muhaymin'}</span>
                  </div>
                </div>
              </div>

            </div>

            {/* RIGHT COLUMN: ENROLLMENT CARD */}
            <div className="lg:col-span-1">
              <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm sticky top-28 space-y-6">
                
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
                    <div key={idx} className="flex items-center gap-2.5 text-sm text-slate-700">
                      <Check className="w-4 h-4 text-brand-green shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

                {/* Enroll Buttons */}
                <div className="pt-4 space-y-3">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-amber-500 hover:bg-amber-600 text-white rounded-full font-bold px-8 py-4 w-full inline-flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all text-center"
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span>Enroll via WhatsApp</span>
                  </a>

                  <Link
                    to={`/register?course=${course.id}`}
                    className="bg-brand-green hover:bg-[#2a4a38] text-white rounded-full font-bold px-8 py-4 w-full inline-flex items-center justify-center gap-2 transition-all text-center"
                  >
                    <span>Register Student</span>
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>

                <p className="text-center text-xs text-slate-500 italic">
                  No advance payment or credit card required for 3-day trial.
                </p>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* RELATED COURSES */}
      {relatedCourses.length > 0 && (
        <section className="py-16 bg-gray-50 border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="text-center max-w-3xl mx-auto mb-12">
              <div className="text-brand-green font-arabic text-2xl mb-2">
                ﷽
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900">
                Related Courses
              </h2>
              <p className="text-lg text-slate-600 mt-2">
                Explore other specialized programs offered by our academy
              </p>
              <div className="h-1 w-24 bg-brand-green mx-auto mt-6 rounded-full"></div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {relatedCourses.map((relCourse) => (
                <CourseCard key={relCourse.id || relCourse.slug} course={relCourse} />
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
