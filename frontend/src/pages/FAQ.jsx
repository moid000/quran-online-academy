import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, MessageCircle } from 'lucide-react';
import useSeo from '../hooks/useSeo';
import AnimatedButton from '../components/AnimatedButton';

const faqs = [
  {
    q: 'How do online Quran classes work?',
    a: 'Classes are live one-on-one video sessions between the student and teacher on Zoom or Google Meet. The teacher shares screen material (Quran or Qaida), listens to the student recite, and corrects pronunciation in real time — exactly like a teacher sitting beside the student. Timings are fixed with the teacher, and parents can observe any class.'
  },
  {
    q: 'Is the first class really free?',
    a: 'Yes. Every new student gets 3 free trial classes with no card details and no commitment. This lets you check the teacher, method, and comfort level before paying anything.'
  },
  {
    q: 'What courses can I or my child learn?',
    a: 'We teach Noorani Qaida (beginner reading), Quran Reading (Nazra), Quran Memorization (Hifz), Tajweed (correct pronunciation), Quran Translation & Tafseer, Daily Duas & Kalimas, Hadith Studies, and Islamic Studies — for kids, adults, and sisters in women-only classes.'
  },
  {
    q: 'Do you have female teachers for sisters and children?',
    a: 'Yes. Qualified female Quran teachers are available for all women and children classes. Sisters can learn in complete comfort with camera choice and strictly one-on-one sessions.'
  },
  {
    q: 'What are the fees for online Quran classes?',
    a: 'Fees depend on how many days per week you study (3, 4, or 5 days) and class length. Weekend-only plans are also available. Visit our Fees page for full packages — plus a family discount when more than one family member studies with us.'
  },
  {
    q: 'What equipment do I need for classes?',
    a: 'Just a phone, tablet, or laptop with a working internet connection. Zoom is free to install. No special software or tech skills are needed — we help you set everything up in the first session.'
  },
  {
    q: 'What timings are available?',
    a: 'Timings are fully flexible — morning, afternoon, evening, and late-night slots are available because our teachers work across timezones. Students in the USA, UK, Canada, Australia, and Europe all find convenient times.'
  },
  {
    q: 'What is the right age to start Quran classes for kids?',
    a: 'Most children are ready for structured classes between ages 4 and 6. Before that, learning short Surahs and Duas by listening at home is perfect preparation. There is no upper age limit for adults — many of our best students started in their 40s and 50s.'
  },
  {
    q: 'How long does it take to learn the Quran?',
    a: 'Noorani Qaida usually takes 3 to 6 months with consistent classes. Full Quran reading (Nazra) takes about 8 to 14 months after Qaida. Memorization (Hifz) is longer — typically 3 to 5 years for the full Quran. Consistency matters more than speed.'
  },
  {
    q: 'What if I miss a class?',
    a: 'Missed classes can be rescheduled with the teacher, subject to availability. We only ask that you inform the teacher in advance whenever possible.'
  },
  {
    q: 'Which countries do you teach students from?',
    a: 'We teach students worldwide — including the USA, UK, Canada, Australia, Germany, France, Norway, and across the Middle East. All classes are in English, Urdu, or Punjabi depending on the student\'s preference.'
  },
  {
    q: 'How do I register and start?',
    a: 'Fill the registration form on our Register page. Our team contacts you within 24 hours to schedule your 3 free trial classes at your chosen timings. After the trials, you choose a teacher and package — and the journey begins.'
  },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(f => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a }
  }))
};

export default function FAQ() {
  useSeo(
    'Frequently Asked Questions | Quran Online Academia',
    'Answers to common questions about online Quran classes: free trial classes, fees, female teachers, timings, courses for kids and adults, and how to register.',
    '/faq'
  );
  const [open, setOpen] = useState(0);

  // Inject FAQPage JSON-LD schema (Google rich results)
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(faqSchema);
    document.head.appendChild(script);
    return () => { document.head.removeChild(script); };
  }, []);

  return (
    <div className="pt-20">

      {/* HERO SECTION */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-amber-400 font-arabic text-2xl mb-4"
            >
              بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold text-white mb-6"
            >
              Frequently Asked Questions
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-slate-300 text-lg max-w-2xl mx-auto"
            >
              Everything students and parents ask before starting — trial classes, fees, teachers, timings, and courses.
            </motion.p>
          </div>
        </div>
      </section>

      {/* FAQ ACCORDION */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.03 }}
                className="bg-white rounded-2xl border border-gray-200 shadow-[0_4px_24px_rgba(0,0,0,0.05)] overflow-hidden"
              >
                <button
                  onClick={() => setOpen(open === i ? -1 : i)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                  aria-expanded={open === i}
                >
                  <span className="font-semibold text-slate-800 text-base md:text-lg">{f.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-brand-gold shrink-0 transition-transform duration-300 ${open === i ? 'rotate-180' : ''}`}
                  />
                </button>
                <motion.div
                  initial={false}
                  animate={{ height: open === i ? 'auto' : 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <p className="px-6 pb-5 text-slate-600 leading-relaxed">{f.a}</p>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto mt-12 text-center"
          >
            <p className="text-slate-700 mb-6">Still have a question? Ask us directly — we reply within 24 hours.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <AnimatedButton to="/register" variant="primary">Start Free Trial Classes</AnimatedButton>
              <AnimatedButton to="/contact" variant="outline" icon={MessageCircle}>Contact Us</AnimatedButton>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
