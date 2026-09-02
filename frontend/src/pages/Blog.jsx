import React, { useState, useEffect } from 'react';
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
        <div className="container mx-auto px-4 relative z-10 text-center mt-20">
          <div className="text-amber-400 font-arabic text-2xl mb-4">اقْرَأْ بِاسْمِ رَبِّكَ</div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Our Blog</h1>
        </div>
      </section>
      {/* BLOG GRID */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <div className="text-brand-green font-arabic text-2xl">﷽</div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900">
              Latest from Our Blog
            </h2>
            <p className="text-lg text-slate-600">
              Insights and articles on Quran learning and Islamic education
            </p>
            <div className="h-1 w-24 bg-brand-green mx-auto mt-6 rounded-full" />
          </div>

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
              {posts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
