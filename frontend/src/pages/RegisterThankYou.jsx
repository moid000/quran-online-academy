import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import useSeo from '../hooks/useSeo';

export default function RegisterThankYou() {
  useSeo(
    'Registration Successful',
    'Thank you for registering with Quran Online Academia. Our team will contact you within 24 hours to confirm your free trial class.'
  );

  return (
    <div className="pt-20 min-h-screen bg-white flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full text-center"
      >
        <GlassCard className="p-8">
          <div className="w-20 h-20 rounded-full bg-brand-green flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mb-4">Registration Successful!</h1>
          <p className="text-slate-600 mb-6">
            Thank you for registering with Quran Online Academia. We have received your details, and our team will contact you within 24 hours to confirm your free 3-day trial class.
          </p>
          <Link to="/" onClick={() => window.scrollTo(0, 0)}>
            <button className="w-full bg-brand-green hover:bg-[#2a4a38] text-white py-3 rounded-xl font-semibold transition-colors">
              Back to Home
            </button>
          </Link>
        </GlassCard>
      </motion.div>
    </div>
  );
}
