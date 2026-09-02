import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import GlassCard from './GlassCard';

export default function BlogCard({ post, index = 0 }) {
  const { _id, id, title, excerpt, category, date, createdAt, image, image_url, readTime } = post;
  const postId = id || _id;
  const postImage = image_url || image;
  const postDate = date || createdAt;
  const postReadTime = readTime || '5 min';

  return (
    <GlassCard delay={index * 0.1} gradient={true} className="group flex flex-col">
      {/* Image */}
      <div className="relative h-48 overflow-hidden rounded-t-3xl">
        <img
          src={postImage || "https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=600&q=80"}
          alt={title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-brand-green text-white">
            {category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex-1 flex flex-col">
        <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-brand-green transition-colors line-clamp-2">
          {title}
        </h3>
        <p className="text-slate-600 text-sm mb-4 flex-1 line-clamp-3">{excerpt}</p>

        <div className="flex items-center justify-between pt-4 border-t border-gray-100 text-sm">
          <div className="flex items-center gap-4 text-slate-600">
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {new Date(postDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {postReadTime}
            </span>
          </div>
          <Link to={`/blogs/${postId}`} onClick={() => window.scrollTo(0, 0)}>
            <motion.span
              whileHover={{ x: 5 }}
              className="flex items-center gap-1 text-brand-green cursor-pointer font-medium"
            >
              Read <ArrowRight className="w-4 h-4" />
            </motion.span>
          </Link>
        </div>
      </div>
    </GlassCard>
  );
}
