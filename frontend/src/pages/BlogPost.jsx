import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import SectionHeader from '../components/SectionHeader';
import GlassCard from '../components/GlassCard';
import { Calendar, User, Clock, ArrowLeft, Share2, MessageCircle } from 'lucide-react';
import { getBlogPosts } from '../api/blogPosts';
import BlogCard from '../components/BlogCard';

export default function BlogPost() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getBlogPosts()
      .then((posts) => {
        const found = posts.find((p) => p.slug === slug || p.id === slug);
        if (found) {
          setPost(found);
          const related = posts
            .filter((p) => p.id !== found.id && p.slug !== found.slug)
            .slice(0, 3);
          setRelatedPosts(related);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error loading blog post:', err);
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return (
      <div className="pt-20 min-h-screen bg-white flex items-center justify-center text-slate-500">
        Loading article...
      </div>
    );
  }

  if (!post) {
    return (
      <div className="pt-20 min-h-screen bg-white flex flex-col items-center justify-center text-center px-4 relative overflow-hidden">
        <div className="absolute top-20 -left-40 w-96 h-96 bg-brand-green/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Article Not Found</h2>
          <p className="text-slate-600 mb-6">The blog post you are looking for does not exist.</p>
          <motion.div whileHover={{ x: -5 }} className="inline-block">
            <Link
              to="/blogs"
              className="inline-flex items-center gap-2 bg-brand-green hover:bg-[#2a4a38] text-white px-6 py-3 rounded-full font-medium transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Blog
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  const { title, content, author, date, category, image } = post;
  const wordCount = content ? content.split(/\s+/).length : 0;
  const readTime = Math.max(1, Math.ceil(wordCount / 200));

  const shareText = encodeURIComponent(`Read "${title}" on Quran Online Academy: ${window.location.href}`);
  const whatsappShareUrl = `https://wa.me/?text=${shareText}`;

  return (
    <div className="pt-20 min-h-screen bg-white relative overflow-hidden">
      {/* Decorative blur circles */}
      <div className="absolute top-20 -left-40 w-96 h-96 bg-brand-green/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -right-40 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* ARTICLE CONTAINER */}
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        {/* Back Link */}
        <motion.div whileHover={{ x: -5 }} className="inline-block mb-8">
          <Link
            to="/blogs"
            className="inline-flex items-center gap-2 text-brand-green font-semibold hover:underline"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Blog
          </Link>
        </motion.div>

        <GlassCard hover={false} className="p-6 md:p-10">
          {/* Category Badge */}
          <div className="mb-4">
            <span className="bg-brand-green/10 text-brand-green px-3 py-1 rounded-full text-sm font-medium">
              {category || 'Article'}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            {title}
          </h1>

          {/* Author, Date, Read Time */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 mb-8 border-b border-gray-100 pb-6">
            <div className="flex items-center gap-1.5">
              <User className="w-4 h-4 text-brand-green" />
              <span>{author || 'Academic Faculty'}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-brand-green" />
              <span>{date}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-brand-green" />
              <span>{readTime} min read</span>
            </div>
          </div>

          {/* Featured Image */}
          {image && (
            <motion.div
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2 }}
              className="mb-8 rounded-2xl overflow-hidden shadow-sm"
            >
              <img
                src={image}
                alt={title}
                className="w-full object-cover max-h-96"
              />
            </motion.div>
          )}

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="prose max-w-none text-slate-700 leading-relaxed space-y-4 mb-12 whitespace-pre-line"
          >
            {content}
          </motion.div>

          {/* Share Section */}
          <div className="border-t border-b border-gray-200 py-6 my-8 flex flex-wrap items-center justify-between gap-4">
            <span className="font-semibold text-slate-900 text-sm flex items-center gap-2">
              <Share2 className="w-4 h-4 text-brand-green" /> Share this article:
            </span>
            <a
              href={whatsappShareUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-brand-green hover:bg-[#2a4a38] text-white font-medium px-4 py-2 rounded-full text-sm inline-flex items-center gap-2 transition-colors"
            >
              <MessageCircle className="w-4 h-4" /> Share on WhatsApp
            </a>
          </div>
        </GlassCard>
      </article>

      {/* RELATED POSTS */}
      {relatedPosts.length > 0 && (
        <section className="relative overflow-hidden bg-gray-50 py-16 border-t border-gray-200">
          <div className="absolute top-1/2 -left-40 w-96 h-96 bg-brand-green/10 rounded-full blur-3xl pointer-events-none" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8 text-center">
              Related Articles
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedPosts.map((relPost, idx) => (
                <motion.div
                  key={relPost.id || idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="backdrop-blur-xl rounded-2xl"
                >
                  <BlogCard post={relPost} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
