import React from 'react';
import { motion } from 'framer-motion';
import useSeo from '../hooks/useSeo';

export default function PrivacyPolicy() {
  useSeo(
    'Privacy Policy | Quran Online Academia',
    'How Quran Online Academia collects, uses, and protects your personal information for online Quran classes.',
    '/privacy-policy'
  );

  return (
    <div className="pt-20">
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold text-white mb-6"
            >
              Privacy Policy
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-slate-300 text-lg"
            >
              Last updated: September 2026
            </motion.p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto bg-white rounded-2xl border border-gray-200 shadow-[0_4px_24px_rgba(0,0,0,0.05)] p-8 md:p-12 space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-slate-800 mb-3">1. Information We Collect</h2>
              <p className="text-slate-600 leading-relaxed">When you register for classes or contact us, we collect: your name, email address, phone/WhatsApp number, country/timezone, and information about your learning needs (age, current Quran level, preferred course and timings). We do not collect payment card details ourselves — payments are processed through established payment providers.</p>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-800 mb-3">2. How We Use Your Information</h2>
              <p className="text-slate-600 leading-relaxed">We use your information only to: schedule and conduct your classes, match you with a suitable teacher, send class reminders and progress updates, and respond to your messages. We do not sell, rent, or share your information with any third party for marketing purposes.</p>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-800 mb-3">3. Class Recordings & Privacy in Classes</h2>
              <p className="text-slate-600 leading-relaxed">Classes are live one-on-one sessions and are not recorded without your explicit consent. Students may keep their camera off. Parents may observe their children's classes at any time. Teacher contact details are shared only with the student they teach.</p>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-800 mb-3">4. Data Storage & Security</h2>
              <p className="text-slate-600 leading-relaxed">Your registration details are stored securely and are accessible only to our administrative team for scheduling purposes. We apply reasonable technical and organizational measures to protect your data against unauthorized access.</p>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-800 mb-3">5. Cookies & Analytics</h2>
              <p className="text-slate-600 leading-relaxed">Our website uses standard analytics tools (such as Google Analytics and Google Search Console) to understand how visitors use the site — which pages are visited and for how long. This data is aggregated and does not personally identify you.</p>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-800 mb-3">6. Your Rights</h2>
              <p className="text-slate-600 leading-relaxed">You may request at any time to see the information we hold about you, correct it, or delete it. Write to us at quranonlineacademia@gmail.com and we will act on your request within 30 days.</p>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-800 mb-3">7. Contact</h2>
              <p className="text-slate-600 leading-relaxed">For any privacy questions, contact us at quranonlineacademia@gmail.com or through the Contact page of this website.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
