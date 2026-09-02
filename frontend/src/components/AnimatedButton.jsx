import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

/**
 * AnimatedButton - matches original site's "ps" component
 * whileHover:{scale:1.05}, whileTap:{scale:.95}
 */
export default function AnimatedButton({ children, onClick, className = '', variant = 'primary', size = 'default', icon: Icon, href, to }) {
  const variants = {
    primary: 'bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 hover:from-amber-600 hover:via-amber-700 hover:to-amber-800 text-white shadow-lg shadow-amber-500/30',
    secondary: 'bg-gradient-to-r from-emerald-500 via-emerald-600 to-emerald-700 hover:from-emerald-600 hover:via-emerald-700 hover:to-emerald-800 text-white shadow-lg shadow-emerald-500/30',
    outline: 'bg-transparent border-2 border-amber-500/50 text-amber-400 hover:bg-amber-500/10',
    glass: 'backdrop-blur-xl bg-white/10 border border-white/20 text-white hover:bg-white/20',
  };
  const sizes = {
    small: 'px-4 py-2 text-sm',
    default: 'px-6 py-3 text-base',
    large: 'px-8 py-4 text-lg',
  };

  const content = (
    <>
      {Icon && <Icon className="w-5 h-5 mr-2" />}
      {children}
    </>
  );

  const classes = `inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-300 ${variants[variant]} ${sizes[size]} ${className}`;

  if (to) {
    return (
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block">
        <Link to={to} className={classes}>{content}</Link>
      </motion.div>
    );
  }

  if (href) {
    return (
      <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={classes}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button onClick={onClick} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className={classes}>
      {content}
    </motion.button>
  );
}
