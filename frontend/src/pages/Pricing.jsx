import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Check, Star, ArrowRight, MessageCircle, HelpCircle, Building, Smartphone, Globe, ChevronDown, ChevronUp } from 'lucide-react';
import { getFeePackages } from '../api/feePackages';
import { getPaymentMethods } from '../api/paymentMethods';

export default function Pricing() {
  const [packages, setPackages] = useState([]);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [currency, setCurrency] = useState('USD');
  const [loading, setLoading] = useState(true);
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    Promise.all([getFeePackages(), getPaymentMethods()]).then(([pkgs, methods]) => {
      setPackages(pkgs);
      setPaymentMethods(methods);
      setLoading(false);
    });
  }, []);

  const toggleFaq = (idx) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  const currencySymbols = {
    USD: '$',
    EUR: '€',
    GBP: '£'
  };

  const getPackagePrice = (pkg) => {
    if (currency === 'EUR') return pkg.priceEur || Math.round(pkg.priceUsd * 0.9);
    if (currency === 'GBP') return pkg.priceGbp || Math.round(pkg.priceUsd * 0.78);
    return pkg.priceUsd;
  };

  const feeFaqs = [
    { q: 'Is there an admission or registration fee?', a: 'No, there are zero admission fees or hidden registration charges. You only pay the monthly fee package you choose.' },
    { q: 'How do payments work?', a: 'Fees are paid monthly in advance via Bank Alfalah transfer, JazzCash, Western Union, or Wise/Remitly.' },
    { q: 'Can I get a discount for family members?', a: 'Yes! We offer a 10% family discount for 2 or more siblings/family members enrolled together.' },
    { q: 'Are trial classes really free?', a: 'Yes! You get a full 3-day trial class completely free before making any payment.' },
    { q: 'Can I change my package or class schedule later?', a: 'Yes, you can upgrade, downgrade, or adjust class timings anytime by contacting our support team.' }
  ];

  return (
    <div className="pt-24 pb-20 space-y-16 bg-slate-50 min-h-screen">
      
      {/* HEADER BANNER */}
      <section className="bg-hero-gradient text-white py-16 relative overflow-hidden text-center">
        <div className="absolute inset-0 bg-islamic-pattern opacity-30 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-4">
          <span className="font-arabic text-3xl sm:text-4xl text-gold font-bold block drop-shadow-md">
            هَيْكَلُ الرُّسُومِ وَالْبَاقَاتِ
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-serif text-white tracking-tight">
            Fee Structure
          </h1>
          <p className="text-slate-300 text-base max-w-2xl mx-auto font-light leading-relaxed">
            Affordable, transparent monthly packages tailored for families around the world. No registration fees, no hidden charges.
          </p>

          {/* CURRENCY TOGGLE */}
          <div className="pt-4 flex items-center justify-center gap-2">
            <span className="text-xs text-slate-300 font-medium mr-2">Select Currency:</span>
            {['USD', 'EUR', 'GBP'].map((curr) => (
              <button
                key={curr}
                onClick={() => setCurrency(curr)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                  currency === curr
                    ? 'bg-gold text-emerald-950 shadow-md scale-105'
                    : 'bg-emerald-900/60 text-slate-200 hover:bg-emerald-800'
                }`}
              >
                {curr} ({currencySymbols[curr]})
              </button>
            ))}
          </div>

        </div>
      </section>

      {/* FEE PACKAGES GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {loading ? (
          <div className="text-center py-20 text-slate-500 font-medium">Loading fee packages...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {packages.map((pkg) => {
              const price = getPackagePrice(pkg);
              const symbol = currencySymbols[currency];
              const isPopular = pkg.popular;

              return (
                <div
                  key={pkg.id}
                  className={`relative bg-white rounded-3xl p-8 transition-all duration-300 flex flex-col justify-between ${
                    isPopular
                      ? 'ring-2 ring-gold shadow-2xl scale-105 z-10 bg-gradient-to-b from-white via-emerald-50/30 to-white'
                      : 'border border-slate-200 shadow-lg hover:shadow-xl'
                  }`}
                >
                  {isPopular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-gold to-gold-dark text-emerald-950 px-4 py-1 rounded-full text-xs font-extrabold tracking-wider uppercase flex items-center gap-1 shadow-md">
                      <Star className="w-3.5 h-3.5 fill-emerald-950" /> Most Popular
                    </div>
                  )}

                  <div>
                    {/* Header */}
                    <div className="text-center mb-6">
                      <h3 className="text-xl font-bold font-serif text-slate-900">{pkg.name}</h3>
                      <p className="text-xs text-slate-500 mt-1 font-medium">
                        {pkg.classesPerWeek || pkg.classesPerMonth}
                      </p>
                      
                      <div className="mt-4 flex items-baseline justify-center gap-1">
                        <span className="text-4xl font-extrabold text-emerald-900 font-serif">{symbol}{price}</span>
                        <span className="text-slate-500 text-xs font-medium">/ month</span>
                      </div>
                      
                      {pkg.pricePkr && (
                        <p className="text-xs text-emerald-700 font-semibold mt-1">
                          (PKR {pkg.pricePkr.toLocaleString()} / mo)
                        </p>
                      )}
                    </div>

                    {/* Class Session Info */}
                    <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 text-center mb-6 text-xs text-slate-700 font-medium">
                      <span>Duration: </span>
                      <strong className="text-emerald-900">{pkg.classDuration || '30 Mins / Session'}</strong>
                    </div>

                    {/* Features list */}
                    <div className="space-y-3 my-6 border-t border-slate-100 pt-6 text-xs text-slate-700">
                      {pkg.features && pkg.features.map((feat, idx) => (
                        <div key={idx} className="flex items-start gap-2.5">
                          <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5">
                            <Check className="w-3 h-3" />
                          </div>
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Enroll CTA */}
                  <div className="pt-4 space-y-2">
                    <Link
                      to={`/register?package=${pkg.id}`}
                      className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-xs transition-all shadow-md ${
                        isPopular
                          ? 'bg-gold text-emerald-950 hover:bg-gold-light'
                          : 'bg-emerald-900 text-white hover:bg-emerald-800'
                      }`}
                    >
                      <span>Enroll Now</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                    
                    <a
                      href={`https://wa.me/923177479286?text=${encodeURIComponent(`Assalamu Alaikum, I want to inquire about the ${pkg.name} package at QURAN ONLINE ACADEMIA.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-1.5 py-2 text-xs text-slate-600 hover:text-emerald-800 font-medium"
                    >
                      <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Inquire via WhatsApp</span>
                    </a>
                  </div>

                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* PAYMENT METHODS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-xl border border-slate-100 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-800 bg-emerald-100 px-4 py-1.5 rounded-full">
              Safe & Convenient
            </span>
            <h2 className="text-3xl font-bold font-serif text-slate-900">Accepted Payment Methods</h2>
            <p className="text-slate-600 text-sm">
              We offer multiple convenient payment options for local and international students.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Bank Alfalah */}
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                <Building className="w-6 h-6 text-emerald-800" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 font-serif">Bank Alfalah</h3>
              <div className="space-y-1 text-xs text-slate-600">
                <p><strong>Account Name:</strong> QURAN ONLINE ACADEMIA</p>
                <p><strong>IBAN:</strong> PK36 ALFH 0317 7479 2860 1</p>
                <p><strong>Branch:</strong> Bahawalpur Branch</p>
              </div>
            </div>

            {/* JazzCash */}
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
                <Smartphone className="w-6 h-6 text-amber-800" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 font-serif">JazzCash</h3>
              <div className="space-y-1 text-xs text-slate-600">
                <p><strong>Account Name:</strong> Ustaz Abdul Muhaymin</p>
                <p><strong>Mobile Number:</strong> 0317 7479 286</p>
                <p>Instant mobile wallet transfers within Pakistan.</p>
              </div>
            </div>

            {/* Western Union */}
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center">
                <Globe className="w-6 h-6 text-blue-800" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 font-serif">Western Union / Remitly / Wise</h3>
              <div className="space-y-1 text-xs text-slate-600">
                <p><strong>Receiver Name:</strong> Ustaz Abdul Muhaymin</p>
                <p><strong>City / Country:</strong> Bahawalpur, Pakistan</p>
                <p>Easy international transfer for students worldwide.</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FEE FAQ SECTION */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 space-y-2">
          <h2 className="text-2xl font-bold font-serif text-slate-900">Fee Questions & Answers</h2>
        </div>

        <div className="space-y-4">
          {feeFaqs.map((faq, idx) => (
            <div key={idx} className="border border-slate-200 rounded-2xl overflow-hidden bg-white">
              <button
                onClick={() => toggleFaq(idx)}
                className="w-full text-left p-5 bg-slate-50 hover:bg-slate-100 flex items-center justify-between font-bold text-slate-900 text-sm font-serif"
              >
                <span>{faq.q}</span>
                {openFaq === idx ? (
                  <ChevronUp className="w-5 h-5 text-emerald-800 shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
                )}
              </button>
              {openFaq === idx && (
                <div className="p-5 text-slate-600 text-xs leading-relaxed border-t border-slate-100">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* QUESTIONS ABOUT FEES CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-emerald-950 text-white rounded-3xl p-8 sm:p-12 text-center space-y-6 shadow-2xl border border-gold/40">
          <h2 className="text-3xl font-bold font-serif text-white">Have Questions About Fees?</h2>
          <p className="text-slate-300 text-base max-w-xl mx-auto">
            Contact our admissions team directly on WhatsApp for customized family discounts or payment guidance.
          </p>
          <a
            href="https://wa.me/923177479286"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#395240] hover:bg-[#2d4233] text-white font-bold text-sm rounded-full shadow-lg transition-colors"
          >
            <MessageCircle className="w-5 h-5 text-emerald-300" />
            <span>Chat with Us on WhatsApp (+92 317 7479 286)</span>
          </a>
        </div>
      </section>

    </div>
  );
}
