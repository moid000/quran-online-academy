import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, Globe, Clock, Send, CheckCircle2, Loader2 } from 'lucide-react';
import WhatsAppIcon from '../components/WhatsAppIcon';
import GlassCard from '../components/GlassCard';
import { sendContactMessage } from '../api/contact';

const contactInfo = [
  { icon: Phone, title: 'Phone / WhatsApp', value: '+92 317 7479 286', link: 'https://wa.me/923177479286' },
  { icon: Mail, title: 'Email', value: 'quranonlineacademia@gmail.com', link: 'https://mail.google.com/mail/u/0/#inbox' },
  { icon: Globe, title: 'Location', value: 'Bahawalpur, Pakistan\nServing Students Worldwide', link: null },
  { icon: Clock, title: 'Working Hours', value: '24/7 Support Available', link: null },
];

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', whatsapp: '', subject: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const handleChange = (key, value) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.whatsapp || !formData.message) return;
    setSubmitting(true);
    try {
      await sendContactMessage(formData);
      setSent(true);
      setFormData({ name: '', whatsapp: '', subject: '', message: '' });
    } catch (err) {
      console.error(err);
    }
    setSubmitting(false);
  };

  return (
    <div className="pt-20">

      {/* 1. HERO SECTION */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900" />
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=1920&q=80')] bg-cover bg-center opacity-10" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-amber-400 font-arabic text-2xl mb-4"
            >
              تَوَاصَلُوا مَعَنَا
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-bold text-white mb-6"
            >
              Contact Us
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-slate-300 text-lg"
            >
              We're here to help you on your Quran learning journey
            </motion.p>
          </div>
        </div>
      </section>

      {/* 2. CONTACT INFO CARDS */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, idx) => (
              <GlassCard key={idx} delay={idx * 0.1} className="p-6 text-center">
                <div className="w-14 h-14 rounded-2xl bg-brand-green flex items-center justify-center mx-auto mb-4">
                  <info.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-slate-900 font-bold mb-2">{info.title}</h3>
                {info.link ? (
                  <a
                    href={info.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-600 hover:text-brand-green transition-colors whitespace-pre-line"
                  >
                    {info.value}
                  </a>
                ) : (
                  <p className="text-slate-600 whitespace-pre-line">{info.value}</p>
                )}
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* 3. FORM + MAP + WHATSAPP */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <GlassCard className="p-6 md:p-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-6">Send us a Message</h2>

                {sent ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 rounded-full bg-brand-green/20 flex items-center justify-center mx-auto mb-4">
                      <CheckCircle2 className="w-8 h-8 text-brand-green" />
                    </div>
                    <h3 className="text-slate-900 font-bold text-xl mb-2">Message Sent!</h3>
                    <p className="text-slate-600 mb-4">We'll get back to you within 24 hours.</p>
                    <button
                      onClick={() => setSent(false)}
                      className="px-6 py-3 rounded-xl bg-brand-green hover:bg-[#2a4a38] text-white font-medium transition-colors"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-slate-700">Your Name *</label>
                        <input
                          value={formData.name}
                          onChange={(e) => handleChange('name', e.target.value)}
                          placeholder="Enter your name"
                          className="w-full bg-white border border-gray-300 text-slate-900 rounded-lg px-3 py-2 focus:ring-2 focus:ring-brand-green focus:border-transparent outline-none"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-slate-700">WhatsApp Number *</label>
                        <input
                          type="tel"
                          value={formData.whatsapp}
                          onChange={(e) => handleChange('whatsapp', e.target.value)}
                          placeholder="e.g. +92 300 1234567"
                          className="w-full bg-white border border-gray-300 text-slate-900 rounded-lg px-3 py-2 focus:ring-2 focus:ring-brand-green focus:border-transparent outline-none"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-slate-700">Subject</label>
                      <input
                        value={formData.subject}
                        onChange={(e) => handleChange('subject', e.target.value)}
                        placeholder="Message subject"
                        className="w-full bg-white border border-gray-300 text-slate-900 rounded-lg px-3 py-2 focus:ring-2 focus:ring-brand-green focus:border-transparent outline-none"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-slate-700">Message *</label>
                      <textarea
                        value={formData.message}
                        onChange={(e) => handleChange('message', e.target.value)}
                        placeholder="Write your message..."
                        className="w-full bg-white border border-gray-300 text-slate-900 placeholder:text-slate-500 min-h-[150px] rounded-lg px-3 py-2 focus:ring-2 focus:ring-brand-green focus:border-transparent outline-none"
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full py-3 rounded-xl bg-brand-green hover:bg-[#2a4a38] text-white font-medium transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {submitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          Send Message
                        </>
                      )}
                    </button>
                  </form>
                )}
              </GlassCard>
            </motion.div>

            {/* Map + WhatsApp Quick Response */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              {/* WhatsApp Quick Response */}
              <GlassCard className="p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-4">Quick Response via WhatsApp</h3>
                <p className="text-slate-600 mb-6">
                  For fastest response, contact us directly on WhatsApp. We're available 24/7 to answer your queries.
                </p>
                <motion.a
                  href="https://wa.me/923177479286"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center justify-center gap-2 w-full py-4 rounded-xl bg-brand-green text-white font-semibold hover:bg-[#2a4a38] transition-all"
                >
                  <WhatsAppIcon className="w-5 h-5" />
                  Chat on WhatsApp
                </motion.a>
              </GlassCard>

              {/* Google Map */}
              <GlassCard className="p-2 overflow-hidden">
                <div className="aspect-video rounded-2xl overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d110502.60392989846!2d71.59508669999999!3d29.39463995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x393b90c040000001%3A0x28e0e8c9eeb9fc9d!2sBahawalpur%2C%20Punjab%2C%20Pakistan!5e0!3m2!1sen!2s!4v1699999999999!5m2!1sen!2s"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Location Map"
                  />
                </div>
              </GlassCard>
            </motion.div>

          </div>
        </div>
      </section>

    </div>
  );
}
