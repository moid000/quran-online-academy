import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ArrowRight } from 'lucide-react';

export default function BlogCard({ post }) {
  const { slug, id, title, excerpt, category, date, image } = post;
  const postPath = `/blogs/${slug || id}`;

  return (
    <Link to={postPath} className="group block">
      <div className="border border-gray-200 rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow h-full flex flex-col">
        {/* Image */}
        <div className="relative aspect-video overflow-hidden">
          <img
            src={image || `https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=800&q=80`}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
          <span className="absolute top-3 left-3 bg-brand-green text-white text-xs font-medium px-3 py-1 rounded-full">
            {category || 'Article'}
          </span>
        </div>

        {/* Content */}
        <div className="p-5 flex-1 flex flex-col">
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
            <Calendar className="w-3.5 h-3.5 text-brand-green" />
            <span>{date}</span>
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-brand-green transition-colors line-clamp-2">
            {title}
          </h3>
          <p className="text-sm text-slate-600 leading-relaxed line-clamp-3 mb-4 flex-1">
            {excerpt}
          </p>
          <span className="text-sm text-brand-green hover:underline">
            Read More
          </span>
        </div>
      </div>
    </Link>
  );
}
