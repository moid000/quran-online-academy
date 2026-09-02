import React from 'react';
import { motion } from 'framer-motion';

/**
 * SectionHeader - matches original site's "ds" component:
 * Arabic ﷽ fade-in, title fade-in (delay .1), subtitle fade-in (delay .2), underline scaleX (delay .3)
 */
export default function SectionHeader({ title, subtitle, light = false, center = true }) {
  return (
    <div className={`mb-16 ${center ? 'text-center' : ''}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="inline-block mb-4"
      >
        <span className={`font-arabic text-2xl ${light ? 'text-amber-400' : 'text-brand-green'}`}>﷽</span>
      </motion.div>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-4 ${light ? 'text-white' : 'text-slate-900'}`}
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className={`text-lg md:text-xl max-w-2xl mx-auto ${light ? 'text-white/80' : 'text-slate-600'}`}
        >
          {subtitle}
        </motion.p>
      )}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="h-1 w-24 bg-brand-green mx-auto mt-6 rounded-full"
      />
    </div>
  );
}
