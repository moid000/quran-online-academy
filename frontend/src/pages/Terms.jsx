import React from 'react';
import { motion } from 'framer-motion';
import useSeo from '../hooks/useSeo';

export default function Terms() {
  useSeo(
    'Terms & Conditions | Quran Online Academia',
    'Terms and conditions for using Quran Online Academia - online Quran classes for kids, adults and sisters worldwide.',
    '/terms'
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
              Terms & Conditions
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
              <h2 className="text-2xl font-bold text-slate-800 mb-3">1. About Our Services</h2>
              <p className="text-slate-600 leading-relaxed">Quran Online Academia provides one-on-one online Quran classes, including Noorani Qaida, Quran Reading (Nazra), Quran Memorization (Hifz), Tajweed, Translation, Daily Duas & Kalimas, Hadith Studies, and Islamic Studies. By registering for classes, you agree to these terms.</p>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-800 mb-3">2. Free Trial Classes</h2>
              <p className="text-slate-600 leading-relaxed">Every new student is entitled to 3 free trial classes before any payment. Trial classes carry no obligation, and no payment details are required for them.</p>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-800 mb-3">3. Fees & Payment</h2>
              <p className="text-slate-600 leading-relaxed">Fees are charged monthly in advance, based on the package (3, 4 or 5 days per week, or weekend plans) selected at registration. Fees may be paid through the payment methods listed on our Fees page. Fee packages are non-refundable once the month's classes have begun, except where a teacher is unavailable for an extended period and no substitute can be arranged.</p>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-800 mb-3">4. Class Schedule & Attendance</h2>
              <p className="text-slate-600 leading-relaxed">Class timings are agreed between the student and the teacher. Missed classes can be rescheduled subject to teacher availability, provided the teacher is informed in advance. Repeated unnotified absences may affect scheduling priority.</p>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-800 mb-3">5. Student Conduct</h2>
              <p className="text-slate-600 leading-relaxed">Students and parents agree to treat teachers with respect. Disrespectful behavior toward teachers may result in cancellation of classes. Parents are welcome to observe any of their children's classes at any time.</p>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-800 mb-3">6. Privacy</h2>
              <p className="text-slate-600 leading-relaxed">We collect only the information needed to conduct classes (name, contact details, and learning preferences). Our full Privacy Policy explains how this information is stored and protected.</p>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-800 mb-3">7. Changes to These Terms</h2>
              <p className="text-slate-600 leading-relaxed">We may update these terms from time to time. Continued use of our services after changes means you accept the updated terms. For any questions about these terms, contact us at quranonlineacademia@gmail.com.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
