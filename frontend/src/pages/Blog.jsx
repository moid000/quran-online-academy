import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getBlogPosts } from '../api/blogPosts';
import BlogCard from '../components/BlogCard';
import GlassCard from '../components/GlassCard';

const categories = ['All', 'Quran Learning', 'Spiritual Growth', 'Islamic Knowledge', 'Academy News'];

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBlogPosts().then(data => {
      setPosts(data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const filteredPosts = activeCategory === 'All'
    ? posts
    : posts.filter(p => p.category === activeCategory);

  return (
    <div className="pt-20">

      {/* 1. HERO SECTION */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900" />
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1585036156171-384164a8c675?w=1920&q=80')] bg-cover bg-center opacity-10" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-amber-400 font-arabic text-2xl mb-4"
            >
              اقْرَأْ بِاسْمِ رَبِّكَ
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-bold text-white mb-6"
            >
              Our Blog
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-slate-300 text-lg"
            >
              Insights, guidance, and inspiration for your Quran learning journey
            </motion.p>
          </div>
        </div>
      </section>

      {/* 2. CATEGORY FILTER */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === cat
                    ? 'bg-brand-green text-white'
                    : 'bg-gray-100 text-slate-700 hover:bg-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 3. BLOG GRID */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin w-8 h-8 border-4 border-brand-green border-t-transparent rounded-full" />
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-slate-600">No blog posts available yet.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map((post, idx) => (
                <BlogCard key={post.id || idx} post={post} index={idx} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 4. CTA SECTION */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <GlassCard className="p-8 md:p-12">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-2xl md:text-3xl font-bold text-slate-900 mb-4"
              >
                Stay Updated with Our Latest Posts
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-slate-600 mb-6"
              >
                Follow us on WhatsApp Channel for daily Quranic reminders, new articles, and Islamic insights
              </motion.p>
              <motion.a
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                href="https://whatsapp.com/channel/0029VaJDwj96xCSGDHx4803U"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-green text-white font-semibold hover:bg-[#2a4a38] transition-all"
              >
                Join WhatsApp Channel
              </motion.a>
            </GlassCard>
          </div>
        </div>
      </section>

    </div>
  );
}
