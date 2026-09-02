import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, ArrowRight } from 'lucide-react';

export default function CourseCard({ course }) {
  const { id, slug, title, arabicTitle, description, level, duration, image } = course;
  const coursePath = `/courses/${slug || id}`;

  const levelBadge = {
    'Beginner': 'bg-brand-green text-white',
    'Intermediate': 'bg-slate-800 text-white',
    'All Levels': 'bg-amber-500 text-white',
  }[level] || 'bg-brand-green text-white';

  return (
    <Link to={coursePath} className="group block">
      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 h-full flex flex-col">
        {/* Image */}
        <div className="relative aspect-video overflow-hidden">
          <img
            src={image || `https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=800&q=80`}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
          <span className={`absolute top-3 left-3 text-xs font-semibold px-3 py-1 rounded-full ${levelBadge}`}>
            {level}
          </span>
          {arabicTitle && (
            <span className="absolute bottom-3 right-3 font-arabic text-lg text-white drop-shadow-lg">
              {arabicTitle}
            </span>
          )}
        </div>

        {/* Content */}
        <div className="p-5 flex-1 flex flex-col">
          <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-brand-green transition-colors line-clamp-2">
            {title}
          </h3>
          <p className="text-sm text-slate-600 leading-relaxed line-clamp-3 mb-4 flex-1">
            {description}
          </p>
          <div className="flex items-center justify-between pt-3 border-t border-gray-100">
            <span className="flex items-center gap-1.5 text-sm text-slate-600">
              <Clock className="w-4 h-4 text-brand-green" /> {duration}
            </span>
            <span className="flex items-center gap-1 text-sm font-medium text-brand-green group-hover:gap-2 transition-all">
              Learn More <ArrowRight className="w-4 h-4" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
