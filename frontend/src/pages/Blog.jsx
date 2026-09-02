import React, { useState, useEffect } from 'react';
import { MessageCircle, Search, Sparkles } from 'lucide-react';
import BlogCard from '../components/BlogCard';
import { getBlogPosts } from '../api/blogPosts';

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBlogPosts().then(data => {
      setPosts(data.filter(p => p.published !== false));
      setLoading(false);
    });
  }, []);

  const categories = ['All', 'Quran Learning', 'Spiritual Growth', 'Islamic Knowledge', 'Academy News'];

  const filteredPosts = posts.filter(post => {
    if (selectedCategory === 'All') return true;
    if (selectedCategory === 'Quran Learning') return post.category === 'Tajweed' || post.category === 'Quran Learning' || post.category === 'Education';
    if (selectedCategory === 'Spiritual Growth') return post.category === 'Spiritual' || post.category === 'Spiritual Growth';
    if (selectedCategory === 'Islamic Knowledge') return post.category === 'Islamic Knowledge' || post.category === 'Tajweed';
    if (selectedCategory === 'Academy News') return post.category === 'Academy News' || post.category === 'Education';
    return post.category === selectedCategory;
  });

  return (
    <div className="pt-24 pb-20 space-y-16 bg-slate-50 min-h-screen">
      
      {/* HEADER BANNER */}
      <section className="bg-hero-gradient text-white py-16 relative overflow-hidden text-center">
        <div className="absolute inset-0 bg-islamic-pattern opacity-30 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-4">
          <span className="font-arabic text-3xl sm:text-4xl text-gold font-bold block drop-shadow-md">
            مَدَوَّنَتُنَا الإِسْلَامِيَّةُ
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-serif text-white tracking-tight">
            Our Blog
          </h1>
          <p className="text-slate-300 text-base max-w-2xl mx-auto font-light leading-relaxed">
            Inspirational Islamic articles, Tajweed tips, and practical guides for Quranic study and spiritual enrichment.
          </p>

          {/* CATEGORY FILTER */}
          <div className="pt-6 flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2 rounded-full text-xs font-bold transition-all ${
                  selectedCategory === cat
                    ? 'bg-gold text-emerald-950 shadow-md scale-105'
                    : 'bg-emerald-900/60 text-slate-200 hover:bg-emerald-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

        </div>
      </section>

      {/* BLOG POSTS GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {loading ? (
          <div className="text-center py-20 text-slate-500 font-medium">Loading blog articles...</div>
        ) : filteredPosts.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl p-8 border border-slate-200">
            <h3 className="text-xl font-bold font-serif text-slate-900 mb-2">No Articles Found</h3>
            <p className="text-slate-600 text-sm">There are no articles in the "{selectedCategory}" category yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </section>

      {/* WHATSAPP CHANNEL CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-emerald-950 text-white rounded-3xl p-8 sm:p-12 text-center space-y-6 shadow-2xl border border-gold/40">
          <div className="inline-flex items-center gap-2 text-gold text-xs font-bold uppercase tracking-wider bg-emerald-900/80 px-4 py-1.5 rounded-full border border-gold/30">
            <Sparkles className="w-4 h-4" /> Daily Reminders & Updates
          </div>
          <h2 className="text-3xl font-bold font-serif text-white">
            Stay Updated with Our Latest Posts
          </h2>
          <p className="text-slate-300 text-base max-w-xl mx-auto font-light">
            Receive daily Quranic verses, Tajweed tips, and academy updates directly on WhatsApp.
          </p>
          <a
            href="https://wa.me/923177479286"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#395240] hover:bg-[#2d4233] text-white font-bold text-sm rounded-full shadow-lg transition-colors"
          >
            <MessageCircle className="w-5 h-5 text-emerald-300" />
            <span>Join WhatsApp Community</span>
          </a>
        </div>
      </section>

    </div>
  );
}
