import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, MessageCircle, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { sendContactMessage } from '../api/contact';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus({ type: 'error', message: 'Please fill in all required fields (*).' });
      return;
    }

    setSubmitting(true);
    setStatus(null);

    try {
      const res = await sendContactMessage(formData);
      setStatus({ type: 'success', message: res.message || 'Your message has been sent successfully!' });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      setStatus({ type: 'error', message: err.message || 'Failed to send message. Please try again.' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="pt-24 pb-20 space-y-16 bg-slate-50 min-h-screen">
      
      {/* HEADER BANNER */}
      <section className="bg-hero-gradient text-white py-16 relative overflow-hidden text-center">
        <div className="absolute inset-0 bg-islamic-pattern opacity-30 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-4">
          
          <span className="font-arabic text-3xl sm:text-4xl text-gold font-bold block drop-shadow-md">
            تَوَاصَلُوا مَعَنَا
          </span>

          <h1 className="text-3xl sm:text-5xl font-extrabold font-serif text-white tracking-tight">
            Contact Us
          </h1>
          <p className="text-slate-300 text-base max-w-2xl mx-auto font-light leading-relaxed">
            Have questions about our online Quran classes, fee packages, or free trial? We are available 24/7 to assist you.
          </p>
        </div>
      </section>

      {/* CONTACT INFO CARDS & FORM */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Contact Info Sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100 space-y-6">
              <h2 className="text-2xl font-bold font-serif text-slate-900 border-b border-slate-100 pb-4">
                Get In Touch
              </h2>

              <div className="space-y-6 text-sm">
                
                {/* Phone / WhatsApp */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                    <MessageCircle className="w-5 h-5 text-emerald-800" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 font-serif">Phone & WhatsApp</h4>
                    <a href="https://wa.me/923177479286" target="_blank" rel="noopener noreferrer" className="text-emerald-800 font-semibold hover:underline block">
                      +92 317 7479 286
                    </a>
                    <span className="text-xs text-slate-500">Instant response via WhatsApp</span>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-amber-800" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 font-serif">Email Address</h4>
                    <a href="mailto:quranonlineacademia@gmail.com" className="text-slate-700 font-medium hover:underline block break-all">
                      quranonlineacademia@gmail.com
                    </a>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-blue-800" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 font-serif">Main Campus Location</h4>
                    <p className="text-slate-600">Bahawalpur, Punjab, Pakistan</p>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5 text-purple-800" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 font-serif">Working Hours</h4>
                    <p className="text-slate-600 font-semibold text-emerald-700">24 Hours / 7 Days a Week</p>
                    <span className="text-xs text-slate-500">Classes scheduled across all time zones</span>
                  </div>
                </div>

              </div>
            </div>

            {/* Quick WhatsApp Banner */}
            <div className="bg-[#395240] text-white rounded-3xl p-6 shadow-xl space-y-4 border border-emerald-600/30">
              <h3 className="text-lg font-bold font-serif text-gold">Quick Response via WhatsApp</h3>
              <p className="text-xs text-slate-200 leading-relaxed">
                Need immediate details or want to book a free trial class right now? Chat directly with Ustaz Abdul Muhaymin on WhatsApp.
              </p>
              <a
                href="https://wa.me/923177479286"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-3 bg-gold hover:bg-gold-light text-emerald-950 font-bold text-xs rounded-xl shadow transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat on WhatsApp Now</span>
              </a>
            </div>
          </div>

          {/* Contact Form Column */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-xl border border-slate-100 space-y-6">
              <h2 className="text-2xl font-bold font-serif text-slate-900">
                Send Us a Message
              </h2>
              <p className="text-slate-600 text-sm">
                Fill out the form below and our admissions team will get back to you within 24 hours.
              </p>

              {status && (
                <div className={`p-4 rounded-2xl flex items-center gap-3 text-sm ${
                  status.type === 'success'
                    ? 'bg-emerald-50 text-emerald-900 border border-emerald-200'
                    : 'bg-red-50 text-red-900 border border-red-200'
                }`}>
                  {status.type === 'success' ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
                  )}
                  <span>{status.message}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Muhammad Ali"
                      required
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-800"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. name@example.com"
                      required
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-800"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="e.g. Inquiry about 3-Day Free Trial"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about the student's age, current Quran level, and preferred timings..."
                    required
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-800"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-emerald-900 hover:bg-emerald-800 text-gold font-bold text-sm rounded-xl shadow-lg transition-all disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>{submitting ? 'Sending Message...' : 'Send Message'}</span>
                </button>
              </form>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
