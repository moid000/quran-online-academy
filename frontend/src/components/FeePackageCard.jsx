import React from 'react';
import { Link } from 'react-router-dom';
import { Check, Star, ArrowRight } from 'lucide-react';

export default function FeePackageCard({ pkg }) {
  const { id, name, priceUsd, pricePkr, classesPerWeek, classDuration, popular, features = [] } = pkg;

  return (
    <div className={`relative bg-white rounded-3xl p-8 transition-all duration-300 flex flex-col justify-between ${
      popular
        ? 'ring-2 ring-gold shadow-2xl scale-105 z-10 bg-gradient-to-b from-white via-emerald-50/20 to-white'
        : 'border border-slate-200 shadow-lg hover:shadow-xl'
    }`}>
      {/* Popular Highlight Tag */}
      {popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-gold to-gold-dark text-emerald-950 px-4 py-1 rounded-full text-xs font-bold tracking-wider uppercase flex items-center gap-1 shadow-md">
          <Star className="w-3.5 h-3.5 fill-emerald-950" /> Most Popular Choice
        </div>
      )}

      <div>
        {/* Package Header */}
        <div className="text-center mb-6">
          <h3 className="text-xl font-bold font-serif text-slate-900">{name}</h3>
          <p className="text-xs text-slate-500 mt-1 font-medium">
            {classesPerWeek} Classes / Week • {classDuration} per session
          </p>
          
          <div className="mt-4 flex items-baseline justify-center gap-1">
            <span className="text-4xl font-extrabold text-emerald-900 font-serif">${priceUsd}</span>
            <span className="text-slate-500 text-sm font-medium">/ month</span>
          </div>
          <p className="text-xs text-emerald-700 font-semibold mt-1">
            (Approx. PKR {pricePkr.toLocaleString()} / mo)
          </p>
        </div>

        {/* Feature List */}
        <div className="space-y-3 my-6 border-t border-slate-100 pt-6">
          {features.map((feature, idx) => (
            <div key={idx} className="flex items-start gap-3 text-sm text-slate-700">
              <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5">
                <Check className="w-3.5 h-3.5" />
              </div>
              <span>{feature}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Register CTA */}
      <div className="pt-4">
        <Link
          to={`/register?package=${id}`}
          className={`w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-bold text-sm transition-all shadow-md ${
            popular
              ? 'bg-gold text-emerald-950 hover:bg-gold-light shadow-gold/20'
              : 'bg-emerald-900 text-white hover:bg-emerald-800'
          }`}
        >
          <span>Select Package</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
