import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, Check, CreditCard, MessageCircle } from 'lucide-react';
import SectionHeader from '../components/SectionHeader';
import GlassCard from '../components/GlassCard';
import AnimatedButton from '../components/AnimatedButton';

const feePackages = [
  {
    name: '3 Days / Weekly',
    prices: { USD: 20, EUR: 15, GBP: 15 },
    features: ['12 Classes Monthly', '30 Minutes Per Class', 'One-on-One Sessions', 'Flexible Scheduling', 'Progress Reports'],
    popular: false,
    color: 'from-blue-500 to-blue-600',
  },
  {
    name: '4 Days / Weekly',
    prices: { USD: 30, EUR: 25, GBP: 20 },
    features: ['16 Classes Monthly', '30 Minutes Per Class', 'One-on-One Sessions', 'Flexible Scheduling', 'Progress Reports', 'Priority Support'],
    popular: false,
    color: 'from-amber-500 to-amber-600',
  },
  {
    name: '5 Days / Weekly',
    prices: { USD: 40, EUR: 30, GBP: 25 },
    features: ['20 Classes Monthly', '30 Minutes Per Class', 'One-on-One Sessions', 'Flexible Scheduling', 'Progress Reports', 'Priority Support', 'Extra Revision Classes'],
    popular: false,
    color: 'from-emerald-500 to-emerald-600',
  },
  {
    name: 'Weekend Only',
    prices: { USD: 30, EUR: 25, GBP: 20 },
    features: ['8 Classes Monthly', '30 Minutes Per Class', 'One-on-One Sessions', 'Saturday & Sunday', 'Progress Reports', 'Perfect for Busy Schedules'],
    popular: false,
    color: 'from-purple-500 to-purple-600',
  },
];

const currencySymbols = { USD: '$', EUR: '€', GBP: '£' };

const paymentMethods = [
  { name: 'Bank Alfalah', icon: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69724c3a263d1c5b72e0717d/22d1642a6_bk_logo-removebg-preview.png' },
  { name: 'JazzCash', icon: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69724c3a263d1c5b72e0717d/b21c58dbf_jazzcashlogo.png' },
  { name: 'Western Union', icon: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69724c3a263d1c5b72e0717d/b860bca70_WUlogo.png' },
];

const faqs = [
  { q: 'Is there a trial class available?', a: 'Yes! We offer a free trial class so you can experience our teaching methodology before enrolling.' },
  { q: 'Can I change my package later?', a: 'Absolutely! You can upgrade or change your package at any time. The new fees will apply from the next billing cycle.' },
  { q: 'Are the classes one-on-one?', a: 'Yes, all our classes are one-on-one to ensure personalized attention and faster progress.' },
  { q: 'What if I miss a class?', a: 'Missed classes can be rescheduled with prior notice. We understand that life can be unpredictable.' },
  { q: 'Is there a registration fee?', a: 'No registration fee! You only pay for the monthly package you choose.' },
];

export default function Pricing() {
  const [currency, setCurrency] = useState('USD');

  return (
    <div className="pt-20">

      {/* 1. HERO SECTION */}
      <section className="relative py-24 overflow-hidden">
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
              مَا لَكُمْ لَا تُنفِقُونَ
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-bold text-white mb-6"
            >
              Fee Structure
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-slate-300 text-lg"
            >
              Affordable packages designed to make Quran education accessible to all
            </motion.p>
          </div>
        </div>
      </section>

      {/* 2. FEE PACKAGES SECTION */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">

          {/* Currency Toggle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-center mb-12"
          >
            <div className="inline-flex gap-3">
              {[
                { value: 'USD', label: 'FEE USD' },
                { value: 'EUR', label: 'FEE EUR' },
                { value: 'GBP', label: 'FEE GBP' },
              ].map((curr) => (
                <button
                  key={curr.value}
                  onClick={() => setCurrency(curr.value)}
                  className={`px-4 sm:px-8 py-3 rounded-lg font-semibold transition-all whitespace-nowrap ${
                    currency === curr.value
                      ? 'bg-brand-green text-white shadow-lg'
                      : 'bg-gray-100 text-slate-600 hover:bg-gray-200'
                  }`}
                >
                  {curr.label}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Package Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {feePackages.map((pkg, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={`relative ${pkg.popular ? 'lg:-mt-4 lg:mb-4' : ''}`}
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                    <span className="px-4 py-1 rounded-full bg-brand-green text-white text-xs font-semibold flex items-center gap-1">
                      <Star className="w-3 h-3 fill-current" /> Most Popular
                    </span>
                  </div>
                )}

                <div
                  className={`h-full backdrop-blur-xl bg-white border rounded-3xl overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-2xl ${
                    pkg.popular ? 'border-brand-green shadow-lg shadow-[#345B46]/20' : 'border-gray-200'
                  }`}
                >
                  {/* Header */}
                  <div className={`bg-gradient-to-r ${pkg.color} p-6 text-center`}>
                    <h3 className="text-xl font-bold text-white mb-2">{pkg.name}</h3>
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-4xl font-bold text-white">
                        {currencySymbols[currency]}{pkg.prices[currency]}
                      </span>
                      <span className="text-white/80">/month</span>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="p-6">
                    <ul className="space-y-3 mb-6">
                      {pkg.features.map((feature, fidx) => (
                        <li key={fidx} className="flex items-center gap-3 text-slate-700 text-sm">
                          <Check className="w-5 h-5 text-brand-green flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <Link
                      to={`/register?package=${encodeURIComponent(pkg.name)}&price=${pkg.prices[currency]}`}
                      onClick={() => window.scrollTo(0, 0)}
                    >
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`w-full py-3 rounded-xl font-semibold transition-all ${
                          pkg.popular
                            ? 'bg-brand-green text-white shadow-lg shadow-[#345B46]/30'
                            : 'bg-gray-100 text-slate-900 hover:bg-gray-200'
                        }`}
                      >
                        Enroll Now
                      </motion.button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. PAYMENT METHODS SECTION */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <SectionHeader title="Payment Methods" subtitle="Secure and convenient payment options" />

          <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {paymentMethods.map((pm, idx) => (
              <GlassCard key={idx} delay={idx * 0.1} className="p-6 text-center">
                <div className="mb-4 flex items-center justify-center h-20">
                  <img
                    src={pm.icon}
                    alt={`${pm.name} payment method`}
                    loading="lazy"
                    className="max-h-20 max-w-full object-contain"
                  />
                </div>
                <h3 className="text-slate-900 font-bold text-lg">{pm.name}</h3>
              </GlassCard>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <p className="text-slate-600 mb-6">Payment details will be provided after registration</p>
            <Link to="/register" onClick={() => window.scrollTo(0, 0)}>
              <AnimatedButton variant="primary" size="large" icon={CreditCard}>
                Register & Get Payment Info
              </AnimatedButton>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 4. FAQ SECTION */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <SectionHeader title="Frequently Asked Questions" subtitle="" />

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, idx) => (
              <GlassCard key={idx} delay={idx * 0.1} hover={false} className="p-6">
                <h4 className="text-slate-900 font-semibold mb-2">{faq.q}</h4>
                <p className="text-slate-600 text-sm">{faq.a}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CTA SECTION */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-slate-900 mb-6"
            >
              Have Questions About Fees?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-slate-600 mb-8"
            >
              Contact us for any queries regarding payment or package selection
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <AnimatedButton href="https://wa.me/923177479286" variant="primary" size="large" icon={MessageCircle}>
                WhatsApp: +92 317 7479 286
              </AnimatedButton>
            </motion.div>
          </div>
        </div>
      </section>

    </div>
  );
}
