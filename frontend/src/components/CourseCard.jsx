import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, BookOpen, ArrowRight, UserCheck } from 'lucide-react';

export default function CourseCard({ course }) {
  const { id, slug, title, arabicTitle, description, level, duration, classesPerWeek, image, instructor } = course;
  const coursePath = `/courses/${slug || id}`;

  const levelColor = {
    'Beginner': 'bg-emerald-800 text-gold border-gold/30',
    'Intermediate': 'bg-amber-900/80 text-amber-200 border-amber-500/30',
    'Advanced': 'bg-purple-950 text-purple-200 border-purple-500/30',
    'All Levels': 'bg-blue-950 text-blue-200 border-blue-500/30'
  }[level] || 'bg-emerald-900 text-gold border-gold/30';

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-slate-100 hover:shadow-xl transition-all duration-300 flex flex-col group hover:-translate-y-1">
      {/* Image Container */}
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

      {/* Content */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <h3 className="text-xl font-bold text-slate-900 font-serif group-hover:text-emerald-800 transition-colors">
            {title}
          </h3>
          <p className="text-slate-600 text-sm mt-2 line-clamp-3 leading-relaxed">
            {description}
          </p>
        </div>

        {/* Course Details Info */}
        <div className="space-y-2 pt-2 border-t border-slate-100 text-xs text-slate-500">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 font-medium text-slate-700">
              <Clock className="w-3.5 h-3.5 text-emerald-700" /> {duration}
            </span>
            <span className="flex items-center gap-1.5 font-medium text-slate-700">
              <BookOpen className="w-3.5 h-3.5 text-emerald-700" /> {classesPerWeek || '3 Classes / Week'}
            </span>
          </div>

          {instructor && (
            <div className="flex items-center gap-1.5 text-slate-600 pt-1">
              <UserCheck className="w-3.5 h-3.5 text-gold" />
              <span>Instructor: {instructor}</span>
            </div>
          )}
        </div>

        {/* CTA Buttons */}
        <div className="flex items-center gap-2 pt-2">
          <Link
            to={coursePath}
            className="flex-1 inline-flex items-center justify-center gap-1.5 text-sm font-semibold text-emerald-900 bg-emerald-50 hover:bg-emerald-100 py-2.5 px-4 rounded-xl border border-emerald-200/80 transition-colors"
          >
            Course Outline
          </Link>
          <Link
            to={`/register?course=${id}`}
            className="inline-flex items-center justify-center p-2.5 text-emerald-950 bg-gold hover:bg-gold-light rounded-xl font-medium transition-colors shadow-sm"
            title="Register for this course"
          >
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
