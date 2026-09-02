import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Clock, BookOpen, CheckCircle, UserCheck, ArrowRight, MessageCircle, ShieldCheck, ChevronRight } from 'lucide-react';
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
        setError(err.message || 'Failed to load course detail');
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen pt-32 pb-20 flex items-center justify-center text-slate-500 font-medium">
        Loading course details...
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="min-h-screen pt-32 pb-20 text-center space-y-4 px-4">
        <h2 className="text-2xl font-bold font-serif text-slate-900">Course Not Found</h2>
        <p className="text-slate-600">{error || "We couldn't find the requested course."}</p>
        <Link to="/courses" className="inline-flex items-center gap-2 text-emerald-800 font-bold hover:underline">
          <ArrowRight className="w-4 h-4 rotate-180" /> Back to Courses
        </Link>
      </div>
    );
  }

  const { title, arabicTitle, description, level, duration, classesPerWeek, classDuration, image, curriculum = [], instructor } = course;
  const whatsappMsg = encodeURIComponent(`Assalamu Alaikum, I would like to enroll in the ${title} course at QURAN ONLINE ACADEMIA.`);
  const whatsappUrl = `https://wa.me/923177479286?text=${whatsappMsg}`;

  return (
    <div className="pt-24 pb-20 space-y-16 bg-slate-50 min-h-screen">
      
      {/* Breadcrumb & Header */}
      <section className="bg-hero-gradient text-white py-12 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-4">
          
          <div className="flex items-center gap-2 text-xs text-gold/80 font-medium">
            <Link to="/" className="hover:underline">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link to="/courses" className="hover:underline">Courses</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white">{title}</span>
          </div>

          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2">
              <span className="inline-block bg-emerald-800 text-gold text-xs font-semibold px-3 py-1 rounded-full border border-gold/30">
                {level} Level
              </span>
              <h1 className="text-3xl sm:text-5xl font-extrabold font-serif text-white">
                {title}
              </h1>
              {arabicTitle && (
                <span className="font-arabic text-2xl text-gold font-bold block pt-1">
                  {arabicTitle}
                </span>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#395240] hover:bg-[#2d4233] text-white font-bold text-sm rounded-xl shadow-lg transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-emerald-300" />
                <span>Enroll via WhatsApp</span>
              </a>
              <Link
                to={`/register?course=${course.id}`}
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-gold hover:bg-gold-light text-emerald-950 font-bold text-sm rounded-xl shadow-lg transition-colors"
              >
                <span>Register Student</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* Main Course Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Left / Main Column */}
          <div className="lg:col-span-2 space-y-10">
            
            {/* Overview Image & Info */}
            <div className="bg-white rounded-3xl overflow-hidden shadow-lg border border-slate-100">
              <div className="relative h-80 bg-slate-900">
                <img
                  src={image || 'https://images.unsplash.com/photo-1609599006353-e629aaabfeae?auto=format&fit=crop&q=80&w=800'}
                  alt={title}
                  className="w-full h-full object-cover opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/80 via-transparent to-transparent"></div>
              </div>

              <div className="p-8 space-y-6">
                <h2 className="text-2xl font-bold font-serif text-slate-900">Course Overview</h2>
                <p className="text-slate-600 leading-relaxed text-base font-light">
                  {description}
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100">
                  <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 text-center">
                    <Clock className="w-5 h-5 text-emerald-800 mx-auto mb-1" />
                    <span className="text-xs text-slate-500 block">Duration</span>
                    <span className="text-sm font-bold text-slate-900 font-serif">{duration}</span>
                  </div>

                  <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 text-center">
                    <BookOpen className="w-5 h-5 text-emerald-800 mx-auto mb-1" />
                    <span className="text-xs text-slate-500 block">Frequency</span>
                    <span className="text-sm font-bold text-slate-900 font-serif">{classesPerWeek || '3 Classes / Wk'}</span>
                  </div>

                  <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 text-center col-span-2 sm:col-span-1">
                    <UserCheck className="w-5 h-5 text-gold mx-auto mb-1" />
                    <span className="text-xs text-slate-500 block">Lead Scholar</span>
                    <span className="text-sm font-bold text-slate-900 font-serif">{instructor || 'Ustaz Abdul Muhaymin'}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Curriculum Breakdown */}
            <div className="bg-white rounded-3xl p-8 shadow-lg border border-slate-100 space-y-6">
              <h2 className="text-2xl font-bold font-serif text-slate-900">What You Will Learn</h2>
              
              <div className="space-y-3">
                {curriculum.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <CheckCircle className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-800 font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Enrollment Card */}
          <div className="space-y-6">
            <div className="bg-emerald-950 text-white rounded-3xl p-8 shadow-xl border border-gold/30 space-y-6 sticky top-28">
              <h3 className="text-xl font-bold font-serif text-white border-b border-emerald-800 pb-4">
                Enrollment Details
              </h3>

              <div className="space-y-4 text-sm text-slate-300">
                <div className="flex items-center justify-between border-b border-emerald-900 pb-2">
                  <span>Class Format:</span>
                  <span className="font-semibold text-gold">1-on-1 Private Live</span>
                </div>
                <div className="flex items-center justify-between border-b border-emerald-900 pb-2">
                  <span>Target Audience:</span>
                  <span className="font-semibold text-gold">Kids & Adults</span>
                </div>
                <div className="flex items-center justify-between border-b border-emerald-900 pb-2">
                  <span>Tutors Available:</span>
                  <span className="font-semibold text-gold">Male & Female Scholars</span>
                </div>
                <div className="flex items-center justify-between border-b border-emerald-900 pb-2">
                  <span>Free Trial:</span>
                  <span className="font-semibold text-gold">3 Days Free</span>
                </div>
              </div>

              <div className="pt-2 space-y-3">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3.5 bg-[#395240] hover:bg-[#2d4233] text-white font-bold text-sm rounded-xl shadow-md transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-300" />
                  <span>Contact on WhatsApp</span>
                </a>

                <Link
                  to={`/register?course=${course.id}`}
                  className="w-full flex items-center justify-center gap-2 py-3.5 bg-gold hover:bg-gold-light text-emerald-950 font-bold text-sm rounded-xl shadow-md transition-colors"
                >
                  <span>Register Online</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="text-center pt-2">
                <p className="text-xs text-slate-400">
                  Questions? Call/WhatsApp Ustaz Abdul Muhaymin at <br />
                  <strong className="text-gold">+92 317 7479 286</strong>
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* RELATED COURSES */}
      {relatedCourses.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
          <h2 className="text-2xl font-bold font-serif text-slate-900 mb-8">Related Courses</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedCourses.map((rel) => (
              <CourseCard key={rel.id} course={rel} />
            ))}
          </div>
        </section>
      )}

    </div>
  );
}
