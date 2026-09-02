import React, { useState } from 'react';
import { Phone, Mail, MapPin, MessageCircle, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { sendContactMessage } from '../api/contact';
import { motion } from 'framer-motion';
import SectionHeader from '../components/SectionHeader';
import GlassCard from '../components/GlassCard';
import AnimatedButton from '../components/AnimatedButton';

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
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#345B46]/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="container mx-auto px-4 relative z-10 text-center mt-20"
        >
          <div className="text-amber-400 font-arabic text-2xl mb-4">تَوَاصَلُوا مَعَنَا</div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Contact Us</h1>
        </motion.div>
      </section>

      {/* SECTION 1: CONTACT INFO SECTION */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#345B46]/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Section Header */}
          <SectionHeader title="Contact Us" subtitle="Get in touch with us" />

          {/* Three Info Cards */}
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            
            {/* WhatsApp Card */}
            <motion.div
              key={0}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0 }}
            >
              <GlassCard className="p-6 text-center group h-full flex flex-col justify-between" delay={0}>
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-brand-green flex items-center justify-center mx-auto mb-4 text-white group-hover:bg-[#2a4a38] transition-colors">
                    <MessageCircle className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">WhatsApp</h3>
                  <p className="text-slate-700 leading-relaxed font-semibold mb-1">+92 317 7479 286</p>
                  <p className="text-xs text-brand-green font-medium mb-4">Click to chat on WhatsApp 24/7</p>
                </div>
                <div className="pt-2">
                  <AnimatedButton href="https://wa.me/923177479286" variant="primary" icon={MessageCircle} size="small">
                    WhatsApp Now
                  </AnimatedButton>
                </div>
              </GlassCard>
            </motion.div>

            {/* Email Card */}
            <motion.div
              key={1}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <GlassCard className="p-6 text-center group h-full flex flex-col justify-between" delay={0.1}>
                <a href="mailto:quranonlineacademia@gmail.com" className="block h-full flex flex-col justify-between">
                  <div>
                    <div className="w-14 h-14 rounded-2xl bg-brand-green flex items-center justify-center mx-auto mb-4 text-white group-hover:bg-[#2a4a38] transition-colors">
                      <Mail className="w-7 h-7" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">Email Us</h3>
                    <p className="text-slate-700 leading-relaxed font-semibold mb-1 text-sm break-all">quranonlineacademia@gmail.com</p>
                  </div>
                  <span className="text-xs text-brand-green font-medium">Send us an email anytime</span>
                </a>
              </GlassCard>
            </motion.div>

            {/* Location Card */}
            <motion.div
              key={2}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <GlassCard className="p-6 text-center h-full flex flex-col justify-between" delay={0.2}>
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-brand-green flex items-center justify-center mx-auto mb-4 text-white">
                    <MapPin className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Location</h3>
                  <p className="text-slate-700 leading-relaxed font-semibold mb-1">Bahawalpur, Pakistan</p>
                </div>
                <span className="text-xs text-brand-green font-medium">Serving global students worldwide</span>
              </GlassCard>
            </motion.div>

          </div>
        </div>
      </section>

      {/* SECTION 2: CONTACT FORM */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#345B46]/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl" />
        </div>
        <div className="max-w-2xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="backdrop-blur-xl bg-white/95 border border-gray-200 rounded-2xl p-8 shadow-sm">
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
          </motion.div>
        </div>
      </section>

    </div>
  );
}
