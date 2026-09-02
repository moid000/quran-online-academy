import React from 'react';
import { motion } from 'framer-motion';

/**
 * GlassCard - matches original site's reusable glass-morphism card component
 * initial:{opacity:0,y:30}, whileInView:{opacity:1,y:0}, whileHover:{y:-8,scale:1.02}
 */
export default function GlassCard({ children, className = '', hover = true, delay = 0, gradient = false }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      whileHover={hover ? { y: -8, scale: 1.02 } : {}}
      className={`
        relative overflow-hidden rounded-3xl
        backdrop-blur-xl bg-white/95
        border border-gray-200
        shadow-[0_8px_32px_rgba(0,0,0,0.08)]
        ${gradient ? 'bg-gradient-to-br from-white to-gray-50' : ''}
        ${className}
      `}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#345B46]/5 via-transparent to-emerald-500/5 pointer-events-none" />
      {children}
    </motion.div>
  );
}
