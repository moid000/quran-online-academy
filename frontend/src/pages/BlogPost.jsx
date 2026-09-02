import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, User, ArrowRight, ChevronRight, Share2, Tag, BookOpen } from 'lucide-react';
import { getBlogPosts } from '../api/blogPosts';
import BlogCard from '../components/BlogCard';

export default function BlogPost() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getBlogPosts().then((posts) => {
      const found = posts.find(p => p.slug === slug || p.id === slug);
      if (found) {
        setPost(found);
        const related = posts.filter(p => p.id !== found.id && p.slug !== found.slug).slice(0, 3);
        setRelatedPosts(related);
      }
      setLoading(false);
    });
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen pt-32 pb-20 flex items-center justify-center text-slate-500 font-medium">
        Loading article...
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen pt-32 pb-20 text-center space-y-4 px-4">
        <h2 className="text-2xl font-bold font-serif text-slate-900">Article Not Found</h2>
        <p className="text-slate-600">The requested article could not be found.</p>
        <Link to="/blog" className="inline-flex items-center gap-2 text-emerald-800 font-bold hover:underline">
          <ArrowRight className="w-4 h-4 rotate-180" /> Back to Blog
        </Link>
      </div>
    );
  }

  const { title, content, author, date, category, image } = post;

  return (
    <div className="pt-24 pb-20 space-y-16 bg-slate-50 min-h-screen">
      
      {/* Header Banner */}
      <section className="bg-hero-gradient text-white py-12 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-4">
          
          <div className="flex items-center gap-2 text-xs text-gold/80 font-medium">
            <Link to="/" className="hover:underline">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link to="/blog" className="hover:underline">Blog</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white truncate max-w-xs">{title}</span>
          </div>

          <span className="inline-block bg-gold text-emerald-950 text-xs font-bold px-3 py-1 rounded-full shadow">
            {category || 'Article'}
          </span>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-serif text-white leading-tight">
            {title}
          </h1>

          <div className="flex items-center gap-6 text-xs text-slate-300 pt-2 border-t border-emerald-800">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-gold" /> {date}
            </span>
            <span className="flex items-center gap-1.5">
              <User className="w-4 h-4 text-gold" /> Written by {author}
            </span>
          </div>

        </div>
      </section>

      {/* Main Content Article */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-xl border border-slate-100 space-y-8">
          
          {/* Article Image */}
          {image && (
            <div className="rounded-2xl overflow-hidden shadow-md max-h-96">
              <img src={image} alt={title} className="w-full h-full object-cover" />
            </div>
          )}

          {/* Article Body */}
          <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed text-base space-y-4 whitespace-pre-line font-light">
            {content}
          </div>

          {/* Author Box & Share CTA */}
          <div className="pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-lg font-serif">
                {author ? author[0] : 'Q'}
              </div>
              <div>
                <h4 className="font-bold text-slate-900 font-serif">{author}</h4>
                <p className="text-xs text-slate-500">Instructor & Contributor at QURAN ONLINE ACADEMIA</p>
              </div>
            </div>

            <a
              href={`https://wa.me/923177479286?text=${encodeURIComponent(`Check out this article from QURAN ONLINE ACADEMIA: ${title}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#395240] hover:bg-[#2d4233] text-white text-xs font-bold rounded-full shadow"
            >
              <Share2 className="w-3.5 h-3.5" /> Share on WhatsApp
            </a>
          </div>

        </div>
      </section>

      {/* RELATED POSTS */}
      {relatedPosts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold font-serif text-slate-900 mb-8">Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedPosts.map((rel) => (
              <BlogCard key={rel.id} post={rel} />
            ))}
          </div>
        </section>
      )}

    </div>
  );
}
