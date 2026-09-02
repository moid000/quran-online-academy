import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, ArrowRight } from 'lucide-react';

export default function BlogCard({ post }) {
  const { slug, id, title, excerpt, category, author, date, image } = post;
  const postPath = `/blog/${slug || id}`;

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-md border border-slate-100 hover:shadow-xl transition-all duration-300 flex flex-col group hover:-translate-y-1">
      {/* Post Image */}
      <div className="relative h-48 overflow-hidden bg-slate-900">
        <img
          src={image || 'https://images.unsplash.com/photo-1609599006353-e629aaabfeae?auto=format&fit=crop&q=80&w=800'}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/60 via-transparent to-transparent"></div>
        <span className="absolute top-3 left-3 bg-gold text-emerald-950 text-xs font-bold px-3 py-1 rounded-full shadow">
          {category || 'Article'}
        </span>
      </div>

      {/* Content */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-4 text-xs text-slate-500 mb-2">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-emerald-700" /> {date}
            </span>
            <span className="flex items-center gap-1">
              <User className="w-3.5 h-3.5 text-emerald-700" /> {author}
            </span>
          </div>

          <h3 className="text-lg font-bold text-slate-900 font-serif group-hover:text-emerald-800 transition-colors line-clamp-2">
            {title}
          </h3>

          <p className="text-slate-600 text-sm mt-2 line-clamp-3 leading-relaxed">
            {excerpt}
          </p>
        </div>

        <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
          <Link
            to={postPath}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-800 hover:text-emerald-900 group/link"
          >
            <span>Read Article</span>
            <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}
