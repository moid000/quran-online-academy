import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionHeader from '../components/SectionHeader';
import GlassCard from '../components/GlassCard';
import { getBlogPosts } from '../api/blogPosts';
import BlogCard from '../components/BlogCard';

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBlogPosts()
      .then((data) => {
        setPosts(data.filter((p) => p.published !== false));
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching blog posts:', err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="pt-0 min-h-screen bg-white">
      {/* HERO SECTION */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 to-slate-950" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=1920&q=80')] bg-cover bg-center opacity-10" />
        {/* Decorative blur circles */}
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-brand-green/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10 text-center mt-20">
          <div className="text-amber-400 font-arabic text-2xl mb-4">اقْرَأْ بِاسْمِ رَبِّكَ</div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Our Blog</h1>
        </div>
      </section>

      {/* BLOG GRID */}
      <section className="relative overflow-hidden py-24 bg-gradient-to-b from-gray-50 to-white">
        {/* Decorative blur circles */}
        <div className="absolute top-1/4 -left-40 w-96 h-96 bg-brand-green/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 -right-40 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header */}
          <SectionHeader title="Our Blog" subtitle="Insights and articles about Quran learning" />

          {/* Grid */}
          {loading ? (
            <div className="text-center py-16 text-slate-500 font-medium">
              Loading articles...
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-16 text-slate-500">
              No blog posts found.
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post, idx) => (
                <motion.div
                  key={post.id || idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="backdrop-blur-xl rounded-2xl"
                >
                  <BlogCard post={post} />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
