import React from 'react';
import { Link } from 'react-router-dom';
import { Check, Star } from 'lucide-react';

export default function FeePackageCard({ pkg }) {
  const { id, name, price_usd, price_eur, price_gbp, days_per_week, classes_per_month, duration_per_class, is_popular, features = [] } = pkg;

  return (
    <div className={`relative bg-white border rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col ${
      is_popular ? 'border-2 border-amber-500 shadow-lg' : 'border-gray-200'
    }`}>
      {is_popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-amber-500 text-white px-4 py-1 rounded-full text-sm font-medium whitespace-nowrap">
          Most Popular
        </div>
      )}

      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-slate-900">{name}</h3>
        <p className="text-sm text-slate-600 mt-1">{days_per_week} days/week · {classes_per_month} classes/month</p>
        
        <div className="mt-4">
          <span className="text-4xl font-bold text-slate-900">${price_usd}</span>
          <span className="text-slate-500 text-sm">/month</span>
        </div>
        <div className="flex justify-center gap-3 text-sm text-slate-600 mt-2">
          <span>€{price_eur}</span>
          <span>£{price_gbp}</span>
        </div>
        <p className="text-xs text-slate-500 mt-1">{duration_per_class} per class</p>
      </div>

      <div className="space-y-3 mb-6 border-t border-gray-100 pt-6 flex-1">
        {features.map((feature, idx) => (
          <div key={idx} className="flex items-start gap-2 text-sm text-slate-700">
            <Check className="w-4 h-4 text-brand-green flex-shrink-0 mt-0.5" />
            <span>{feature}</span>
          </div>
        ))}
      </div>

      <Link
        to={`/register?package=${id}`}
        className={`w-full text-center py-3 rounded-xl font-semibold transition-colors ${
          is_popular
            ? 'bg-amber-500 hover:bg-amber-600 text-white'
            : 'bg-brand-green hover:bg-[#2a4a38] text-white'
        }`}
      >
        Select Package
      </Link>
    </div>
  );
}
