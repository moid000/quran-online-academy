import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, ArrowRight, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function CourseCard({ course, index = 0 }) {
  const { id, slug, title, description, level, duration, image_url, image, features } = course;
  const imageUrl = image_url || image || 'https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=600&q=80';

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className="group flex flex-col"
    >
      <div className="backdrop-blur-xl bg-white border border-gray-200 rounded-3xl overflow-hidden transition-all duration-500 hover:shadow-lg h-full flex flex-col">
        {/* Image */}
        <div className="relative h-48 overflow-hidden rounded-t-3xl">
          <img
            src={imageUrl}
            alt={title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-brand-green/90 text-white backdrop-blur-sm border border-brand-green">
              {level}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 flex-1 flex flex-col">
          <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-brand-green transition-colors">
            {title}
          </h3>
          <p className="text-slate-600 text-sm mb-4 flex-1">{description}</p>

          {/* Features list */}
          {features && features.length > 0 && (
            <div className="space-y-2 mb-4">
              {features.map((feature, fidx) => (
                <div key={fidx} className="flex items-center gap-2 text-xs text-slate-600">
                  <CheckCircle2 className="w-3 h-3 text-brand-green" />
                  {feature}
                </div>
              ))}
            </div>
          )}

          {/* Footer: duration + enroll link */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <span className="flex items-center gap-1 text-slate-600 text-sm">
              <Clock className="w-4 h-4" />
              {duration}
            </span>
            <Link to="/fees" onClick={() => window.scrollTo(0, 0)}>
              <motion.span
                whileHover={{ x: 5 }}
                className="flex items-center gap-1 text-brand-green text-sm cursor-pointer font-medium"
              >
                Enroll <ArrowRight className="w-4 h-4" />
              </motion.span>
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
