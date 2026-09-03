import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Clock, User, ArrowLeft } from 'lucide-react';
import { getBlogPosts } from '../api/blogPosts';
import GlassCard from '../components/GlassCard';

export default function BlogPost() {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getBlogPosts().then(posts => {
      // Try slug first, then search params id, then slug as number
      const id = searchParams.get('id');
      const found = posts.find(p =>
        p.slug === slug ||
        p.id === slug ||
        p.id === parseInt(slug) ||
        (id && p.id === parseInt(id))
      ) || posts[0];

      if (found) {
        setPost(found);
        const related = posts.filter(p => p.id !== found.id).slice(0, 3);
        setRelatedPosts(related);
      }
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [slug, searchParams]);

  if (loading) {
    return (
      <div className="pt-20 min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-brand-green border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="pt-20 min-h-screen bg-white flex items-center justify-center text-center px-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Article Not Found</h2>
          <Link to="/blogs" className="text-brand-green hover:underline">Back to Blogs</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 min-h-screen bg-white">

      {/* Back to Blogs */}
      <div className="container mx-auto px-4 py-8">
        <Link to="/blogs">
          <button className="inline-flex items-center gap-2 text-slate-700 hover:text-brand-green font-medium transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Blogs
          </button>
        </Link>
      </div>

      {/* Hero Image */}
      <section className="relative py-12 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="relative aspect-video rounded-3xl overflow-hidden mb-8">
              <img
                src={post.image_url || post.image}
                alt={post.title}
                loading="lazy"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="pb-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <GlassCard className="p-8 md:p-12">

              {/* Meta info */}
              <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-slate-600">
                <span className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  {post.category}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {new Date(post.date || post.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {post.readTime || '5 min'} read
                </span>
                <span className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  {post.author}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-brand-green mb-6">
                {post.title}
              </h1>

              {/* Content */}
              <div className="prose prose-lg max-w-none">
                {post.content.split('\n\n').map((para, idx) => (
                  <p key={idx} className="text-slate-700 mb-4 leading-relaxed">
                    {para}
                  </p>
                ))}
              </div>

              {/* Share */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <h2 className="text-brand-green font-semibold mb-4">Share this article</h2>
                <div className="flex gap-3">
                  <a
                    href={`https://wa.me/?text=${encodeURIComponent(post.title + ' - ' + window.location.href)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-xl bg-brand-green text-white hover:bg-[#2a4a38] transition-all"
                  >
                    Share on WhatsApp
                  </a>
                </div>
              </div>
            </GlassCard>

            {/* More Articles */}
            {relatedPosts.length > 0 && (
              <div className="mt-12">
                <h2 className="text-brand-green font-bold text-xl mb-6">More Articles</h2>
                <div className="grid md:grid-cols-3 gap-4">
                  {relatedPosts.map(rel => (
                    <Link key={rel.id} to={`/blogs/${rel.id}`} onClick={() => window.scrollTo(0, 0)}>
                      <GlassCard className="p-4 hover:scale-105 transition-transform">
                        <img
                          src={rel.image_url || rel.image}
                          alt={rel.title}
                          loading="lazy"
                          className="w-full h-32 object-cover rounded-xl mb-3"
                        />
                        <h3 className="text-slate-900 font-semibold text-sm mb-1 line-clamp-2">{rel.title}</h3>
                        <p className="text-slate-600 text-xs">{rel.readTime || "5 min"}</p>
                      </GlassCard>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

    </div>
  );
}
