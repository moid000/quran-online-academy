import React, { useState } from 'react';
import { Phone, Mail, MapPin, MessageCircle, Send, CheckCircle2, AlertCircle } from 'lucide-react';
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
      setStatus({ type: 'error', message: 'Please complete all required fields (*).' });
      return;
    }

    setSubmitting(true);
    setStatus(null);

    try {
      const res = await sendContactMessage(formData);
      setStatus({
        type: 'success',
        message: res.message || 'Your message has been sent successfully! We will contact you soon.'
      });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      setStatus({
        type: 'error',
        message: err.message || 'Failed to send message. Please try again or reach out on WhatsApp.'
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="pt-0 min-h-screen bg-white">
      
      {/* HERO SECTION */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 to-slate-950" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=1920&q=80')] bg-cover bg-center opacity-10" />
        <div className="container mx-auto px-4 relative z-10 text-center mt-20">
          <div className="text-amber-400 font-arabic text-2xl mb-4">تَوَاصَلُوا مَعَنَا</div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Contact Us</h1>
        </div>
      </section>

      {/* SECTION 1: CONTACT INFO SECTION */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <div className="text-brand-green font-arabic text-2xl">﷽</div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900">
              Get in Touch
            </h2>
            <p className="text-lg text-slate-600">
              We're here to help you start your Quran journey
            </p>
            <div className="h-1 w-24 bg-brand-green mx-auto mt-6 rounded-full" />
          </div>

          {/* Three Info Cards */}
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            
            {/* WhatsApp Card */}
            <a
              href="https://wa.me/923177479286"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white border border-gray-200 rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition-shadow group block"
            >
              <div className="w-14 h-14 rounded-2xl bg-brand-green flex items-center justify-center mx-auto mb-4 text-white group-hover:bg-[#2a4a38] transition-colors">
                <MessageCircle className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">WhatsApp</h3>
              <p className="text-slate-700 leading-relaxed font-semibold mb-1">+92 317 7479 286</p>
              <span className="text-xs text-brand-green font-medium">Click to chat on WhatsApp 24/7</span>
            </a>

            {/* Email Card */}
            <a
              href="mailto:quranonlineacademia@gmail.com"
              className="bg-white border border-gray-200 rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition-shadow group block"
            >
              <div className="w-14 h-14 rounded-2xl bg-brand-green flex items-center justify-center mx-auto mb-4 text-white group-hover:bg-[#2a4a38] transition-colors">
                <Mail className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Email Us</h3>
              <p className="text-slate-700 leading-relaxed font-semibold mb-1 text-sm break-all">quranonlineacademia@gmail.com</p>
              <span className="text-xs text-brand-green font-medium">Send us an email anytime</span>
            </a>

            {/* Location Card */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 rounded-2xl bg-brand-green flex items-center justify-center mx-auto mb-4 text-white">
                <MapPin className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Location</h3>
              <p className="text-slate-700 leading-relaxed font-semibold mb-1">Bahawalpur, Pakistan</p>
              <span className="text-xs text-brand-green font-medium">Serving global students worldwide</span>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 2: CONTACT FORM */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 text-center mb-2">
              Send Us a Message
            </h2>
            <p className="text-slate-600 text-center text-sm mb-8">
              Fill out the form below and our team will get back to you promptly.
            </p>

            {status && (
              <div
                className={`p-4 rounded-xl mb-6 flex items-start gap-3 text-sm ${
                  status.type === 'success'
                    ? 'bg-emerald-50 text-emerald-900 border border-emerald-200'
                    : 'bg-red-50 text-red-900 border border-red-200'
                }`}
              >
                {status.type === 'success' ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                )}
                <span>{status.message}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Your Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Muhammad Ali"
                  required
                  className="w-full bg-white border border-gray-300 text-slate-900 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-green focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="e.g. name@example.com"
                  required
                  className="w-full bg-white border border-gray-300 text-slate-900 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-green focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="e.g. Inquiry about free trial class"
                  className="w-full bg-white border border-gray-300 text-slate-900 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-green focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Message *
                </label>
                <textarea
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Write your message or inquiry here..."
                  required
                  className="w-full bg-white border border-gray-300 text-slate-900 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-green focus:border-transparent"
                ></textarea>
              </div>

              <div className="text-center pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="bg-amber-500 hover:bg-amber-600 text-white rounded-xl font-semibold px-8 py-3 transition-colors shadow-sm disabled:opacity-50 flex items-center justify-center gap-2 mx-auto"
                >
                  <Send className="w-4 h-4" />
                  <span>{submitting ? 'Sending Message...' : 'Send Message'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

    </div>
  );
}
