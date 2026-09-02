import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Check, Star, ArrowRight, MessageCircle, Building2, Wallet, Globe2, ShieldCheck, HelpCircle } from 'lucide-react';
import { getFeePackages } from '../api/feePackages';
import { getPaymentMethods } from '../api/paymentMethods';

export default function Pricing() {
  const [packages, setPackages] = useState([]);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [currency, setCurrency] = useState('USD');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getFeePackages(), getPaymentMethods()]).then(([pkgs, methods]) => {
      setPackages(pkgs);
      setPaymentMethods(methods);
      setLoading(false);
    }).catch(err => {
      console.error('Error loading pricing data:', err);
      setLoading(false);
    });
  }, []);

  const currencySymbols = {
    USD: '$',
    EUR: '€',
    GBP: '£',
    PKR: 'Rs '
  };

  const getPackagePrice = (pkg) => {
    if (currency === 'EUR') return pkg.priceEur || Math.round(pkg.priceUsd * 0.9);
    if (currency === 'GBP') return pkg.priceGbp || Math.round(pkg.priceUsd * 0.78);
    if (currency === 'PKR') return pkg.pricePkr || Math.round(pkg.priceUsd * 280);
    return pkg.priceUsd;
  };

  const paymentIcons = {
    'Bank Transfer': Building2,
    'Mobile Wallet': Wallet,
    'International Remittance': Globe2
  };

  return (
    <div className="pt-20 min-h-screen bg-white">
      
      {/* HERO / SECTION HEADER */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white text-center px-4">
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="text-brand-green font-arabic text-2xl">﷽</div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900">
            Fee Packages
          </h1>
          <p className="text-lg text-slate-600">
            Affordable pricing for every learning journey
          </p>
          <div className="h-1 w-24 bg-brand-green mx-auto mt-6 rounded-full" />

          {/* Currency Toggle */}
          <div className="pt-8 flex items-center justify-center gap-2">
            <span className="text-sm font-medium text-slate-600 mr-2">Select Currency:</span>
            {['USD', 'EUR', 'GBP', 'PKR'].map((curr) => (
              <button
                key={curr}
                onClick={() => setCurrency(curr)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                  currency === curr
                    ? 'bg-brand-green text-white shadow'
                    : 'bg-white border border-gray-200 text-slate-700 hover:border-brand-green'
                }`}
              >
                {curr} ({currencySymbols[curr]})
              </button>
            ))}
          </div>
        </div>

        {/* PACKAGE GRID */}
        <div className="mt-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="py-12 text-slate-500 font-medium">Loading fee packages...</div>
          ) : (
            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              {packages.map((pkg) => {
                const price = getPackagePrice(pkg);
                const symbol = currencySymbols[currency];
                const isPopular = pkg.popular || pkg.is_popular;

                return (
                  <div
                    key={pkg.id}
                    className={`bg-white rounded-2xl p-8 transition-shadow relative flex flex-col justify-between ${
                      isPopular
                        ? 'border-2 border-amber-500 shadow-lg hover:shadow-xl'
                        : 'border border-gray-200 shadow-sm hover:shadow-md'
                    }`}
                  >
                    {isPopular && (
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-amber-500 text-white px-4 py-1 rounded-full text-sm font-medium whitespace-nowrap shadow-sm flex items-center gap-1">
                        <Star className="w-4 h-4 fill-white" /> Most Popular
                      </div>
                    )}

                    <div>
                      {/* Package Name */}
                      <h3 className="text-xl font-bold text-slate-900 text-center">{pkg.name}</h3>
                      <p className="text-xs text-slate-500 text-center mt-1 font-medium">
                        {pkg.classesPerWeek || pkg.classes_per_week || '3 Days / Week'}
                      </p>

                      {/* Price */}
                      <div className="mt-6 text-center">
                        <span className="text-4xl font-bold text-slate-900">{symbol}{price}</span>
                        <span className="text-slate-500 text-sm font-normal">/month</span>
                      </div>
                      <p className="text-xs text-slate-500 text-center mt-1">
                        {pkg.classDuration || pkg.duration_per_class || '30 Mins / Class'}
                      </p>

                      {/* Features List */}
                      <div className="mt-8 space-y-3 border-t border-gray-100 pt-6">
                        {(pkg.features || []).map((feature, idx) => (
                          <div key={idx} className="flex items-start gap-3 text-sm text-slate-700">
                            <Check className="w-5 h-5 text-brand-green shrink-0 mt-0.5" />
                            <span className="leading-tight text-left">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Enroll Button */}
                    <div className="mt-8 pt-4">
                      <Link
                        to={`/register?package=${pkg.id}`}
                        className="w-full bg-amber-500 hover:bg-amber-600 text-white py-3 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2 shadow-sm"
                      >
                        <span>Enroll Now</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* PAYMENT METHODS SECTION */}
      <section className="py-24 bg-white px-4 sm:px-6 lg:px-8 border-t border-gray-100">
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <div className="text-brand-green font-arabic text-2xl">﷽</div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900">
              Accepted Payment Methods
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Multiple secure payment channels available for local and international students
            </p>
            <div className="h-1 w-24 bg-brand-green mx-auto mt-6 rounded-full" />
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {paymentMethods.map((pm) => {
              const IconComp = paymentIcons[pm.type] || Building2;
              return (
                <div
                  key={pm.id}
                  className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow text-center flex flex-col justify-between"
                >
                  <div>
                    <div className="w-14 h-14 rounded-2xl bg-brand-green flex items-center justify-center mx-auto mb-4 text-white">
                      <IconComp className="w-7 h-7" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-1">{pm.name}</h3>
                    <span className="inline-block text-xs font-medium text-brand-green bg-brand-green/10 px-3 py-1 rounded-full mb-4">
                      {pm.type}
                    </span>

                    <div className="space-y-2 text-sm text-slate-700 text-left bg-gray-50 p-4 rounded-xl border border-gray-100 mb-4">
                      {pm.accountName && (
                        <p><strong className="text-slate-900">Account Title:</strong> {pm.accountName}</p>
                      )}
                      {pm.accountNumber && (
                        <p><strong className="text-slate-900">Account / No:</strong> {pm.accountNumber}</p>
                      )}
                      {pm.bankName && (
                        <p><strong className="text-slate-900">Bank / Service:</strong> {pm.bankName}</p>
                      )}
                      {pm.iban && (
                        <p className="break-all"><strong className="text-slate-900">IBAN:</strong> {pm.iban}</p>
                      )}
                      {pm.swiftCode && (
                        <p><strong className="text-slate-900">SWIFT Code:</strong> {pm.swiftCode}</p>
                      )}
                    </div>
                  </div>

                  <p className="text-xs text-slate-500 italic leading-relaxed">
                    {pm.instructions || 'Upload receipt screenshot during online student registration.'}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CONTACT CTA SECTION */}
      <section className="py-16 bg-slate-900 text-white relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-10 pointer-events-none"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=1600&q=80')` }}
        />
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10 space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold">Have Questions About Our Pricing?</h2>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto leading-relaxed">
            Contact us on WhatsApp for custom schedules, family discounts, or any fee-related inquiries.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <a
              href="https://wa.me/923177479286"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-brand-green hover:bg-[#2a4a38] text-white rounded-full font-medium px-6 py-3 flex items-center gap-2 shadow-lg transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Contact via WhatsApp</span>
            </a>
            <Link
              to="/register"
              className="bg-amber-500 hover:bg-amber-600 text-white rounded-full font-bold px-8 py-3 flex items-center gap-2 shadow-lg transition-colors"
            >
              <span>Register for Free Trial</span>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
