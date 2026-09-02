import React, { useState, useEffect } from 'react';
import {
  FileText,
  Plus,
  Edit2,
  Trash2,
  CheckCircle,
  XCircle,
  X,
  AlertTriangle,
  RefreshCw,
  Search,
  Upload,
  Image as ImageIcon,
  Calendar,
  User,
  ExternalLink
} from 'lucide-react';
import AdminLayout from '../../components/AdminLayout';
import Loader from '../../components/Loader';
import { useAuth } from '../../context/AuthContext';
import {
  getBlogPosts,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost
} from '../../api/blogPosts';
import { uploadFile } from '../../api/upload';

export default function Blog() {
  const { token } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [toast, setToast] = useState({ message: '', type: '' });

  const initialForm = {
    title: '',
    slug: '',
    category: 'Quran Learning',
    excerpt: '',
    content: '',
    image: 'https://images.unsplash.com/photo-1609599006353-e629aaabfeae?auto=format&fit=crop&q=80&w=800',
    author: 'Sheikh Omar Farooq',
    published: true,
    date: new Date().toISOString().split('T')[0]
  };

  const [formData, setFormData] = useState(initialForm);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast({ message: '', type: '' }), 4000);
  };

  const fetchBlogPostsList = async () => {
    setLoading(true);
    try {
      const data = await getBlogPosts();
      setPosts(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Failed to fetch blog posts:', err);
      showToast('Failed to load blog posts.', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogPostsList();
  }, []);

  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
  };

  const handleTitleChange = (e) => {
    const newTitle = e.target.value;
    setFormData((prev) => ({
      ...prev,
      title: newTitle,
      // Auto generate slug if slug hasn't been manually edited or if creating new
      slug: generateSlug(newTitle)
    }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    try {
      const url = await uploadFile(file, token);
      setFormData((prev) => ({ ...prev, image: url }));
      showToast('Image uploaded successfully!', 'success');
    } catch (err) {
      console.error('Upload error:', err);
      showToast('Failed to upload image.', 'error');
    } finally {
      setUploadingImage(false);
    }
  };

  const openAddModal = () => {
    setEditingPost(null);
    setFormData({
      ...initialForm,
      date: new Date().toISOString().split('T')[0]
    });
    setShowModal(true);
  };

  const openEditModal = (post) => {
    setEditingPost(post);
    setFormData({
      title: post.title || '',
      slug: post.slug || generateSlug(post.title || ''),
      category: post.category || 'Quran Learning',
      excerpt: post.excerpt || '',
      content: post.content || '',
      image: post.image || post.image_url || 'https://images.unsplash.com/photo-1609599006353-e629aaabfeae?auto=format&fit=crop&q=80&w=800',
      author: post.author || 'Academy Staff',
      published: post.published ?? post.is_published ?? true,
      date: post.date || new Date().toISOString().split('T')[0]
    });
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      showToast('Blog post title is required.', 'error');
      return;
    }

    setActionLoading(true);
    try {
      const payload = {
        ...formData,
        image_url: formData.image,
        is_published: formData.published
      };

      if (editingPost) {
        await updateBlogPost(editingPost.id, payload, token);
        showToast('Blog post updated successfully!', 'success');
      } else {
        await createBlogPost(payload, token);
        showToast('New blog post created successfully!', 'success');
      }

      setShowModal(false);
      fetchBlogPostsList();
    } catch (err) {
      console.error('Blog post save error:', err);
      showToast(err.message || 'Failed to save blog post.', 'error');
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setActionLoading(true);
    try {
      await deleteBlogPost(deleteId, token);
      showToast('Blog post deleted successfully.', 'success');
      setDeleteId(null);
      fetchBlogPostsList();
    } catch (err) {
      console.error('Delete blog post error:', err);
      showToast(err.message || 'Failed to delete blog post.', 'error');
    } finally {
      setActionLoading(false);
    }
  };

  const filteredPosts = posts.filter((p) => {
    const query = searchTerm.toLowerCase().trim();
    if (!query) return true;
    return (
      (p.title || '').toLowerCase().includes(query) ||
      (p.category || '').toLowerCase().includes(query) ||
      (p.author || '').toLowerCase().includes(query)
    );
  });

  const categories = [
    'Quran Learning',
    'Spiritual Growth',
    'Islamic Knowledge',
    'Academy News',
    'Tajweed',
    'Education',
    'Spiritual'
  ];

  return (
    <AdminLayout title="Blog & Articles Management">
      <div className="space-y-6">

        {/* Toast Alert */}
        {toast.message && (
          <div
            className={`px-4 py-3 rounded-xl border text-sm font-medium flex items-center justify-between shadow-sm animate-fadeIn ${
              toast.type === 'error'
                ? 'bg-red-500/10 border-red-500/30 text-red-400'
                : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
            }`}
          >
            <span>{toast.message}</span>
            <button
              onClick={() => setToast({ message: '', type: '' })}
              className="text-slate-400 hover:text-slate-200"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Header Controls */}
        <div className="bg-[#1c2536] p-4 sm:p-5 rounded-2xl border border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Search articles by title, category, or author..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-100 border border-slate-300 text-slate-900 placeholder-slate-500 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchBlogPostsList}
              className="p-2.5 bg-white/5 hover:bg-white/10 text-slate-300 rounded-xl transition-colors"
              title="Refresh blog list"
            >
              <RefreshCw className="w-4 h-4" />
            </button>

            <button
              onClick={openAddModal}
              className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" /> Write New Post
            </button>
          </div>
        </div>

        {/* Blog Table View */}
        {loading ? (
          <Loader message="Loading blog articles..." />
        ) : (
          <div className="bg-[#1c2536] rounded-2xl border border-slate-800 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              {filteredPosts.length === 0 ? (
                <div className="p-12 text-center text-slate-500">
                  <FileText className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                  <p className="font-semibold text-white">No blog posts found</p>
                  <p className="text-xs text-slate-500 mt-1">
                    Click "Write New Post" to publish an article on the blog.
                  </p>
                </div>
              ) : (
                <table className="w-full text-left text-sm">
                  <thead className="bg-[#1a2436] border-b border-slate-800 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    <tr>
                      <th className="px-5 py-3.5">Post Details</th>
                      <th className="px-5 py-3.5">Category</th>
                      <th className="px-5 py-3.5">Author</th>
                      <th className="px-5 py-3.5">Published Status</th>
                      <th className="px-5 py-3.5">Date</th>
                      <th className="px-5 py-3.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {filteredPosts.map((post) => {
                      const isPublished = post.published ?? post.is_published ?? true;
                      const imgSrc = post.image || post.image_url;

                      return (
                        <tr key={post.id} className="hover:bg-white/5 transition-colors">
                          <td className="px-5 py-4 whitespace-nowrap max-w-sm">
                            <div className="flex items-center gap-3">
                              {imgSrc && (
                                <img
                                  src={imgSrc}
                                  alt=""
                                  className="w-10 h-10 rounded-lg object-cover border border-slate-700 shrink-0"
                                />
                              )}
                              <div className="truncate">
                                <div className="font-bold text-white truncate">
                                  {post.title}
                                </div>
                                <div className="text-xs text-slate-400 truncate">
                                  /blog/{post.slug}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-5 py-4 whitespace-nowrap">
                            <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-700 text-slate-300">
                              {post.category || 'General'}
                            </span>
                          </td>
                          <td className="px-5 py-4 whitespace-nowrap text-xs font-medium text-slate-300">
                            {post.author || 'Admin'}
                          </td>
                          <td className="px-5 py-4 whitespace-nowrap">
                            {isPublished ? (
                              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                                <CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> Published
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/15 text-amber-400 border border-amber-500/30">
                                Draft
                              </span>
                            )}
                          </td>
                          <td className="px-5 py-4 whitespace-nowrap text-xs text-slate-400">
                            {post.date || 'N/A'}
                          </td>
                          <td className="px-5 py-4 whitespace-nowrap text-right">
                            <div className="flex items-center justify-end gap-2">
                              <a
                                href={`/blogs/${post.slug || post.id}`}
                                target="_blank"
                                rel="noreferrer"
                                className="p-1.5 bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white rounded-lg transition-colors"
                                title="Preview article"
                              >
                                <ExternalLink className="w-4 h-4" />
                              </a>
                              <button
                                onClick={() => openEditModal(post)}
                                className="p-1.5 bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white rounded-lg transition-colors"
                                title="Edit article"
                              >
                                <Edit2 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => setDeleteId(post.id)}
                                className="p-1.5 text-red-400 hover:text-red-300 bg-red-500/10 hover:bg-red-500/20 rounded-lg transition-colors border border-red-500/20"
                                title="Delete article"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        )}

        {/* Add / Edit Blog Post Modal */}
        {showModal && (
          <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-[#1c2536] rounded-2xl max-w-2xl w-full p-6 shadow-xl border border-slate-800 relative animate-fadeIn my-8 max-h-[90vh] overflow-y-auto">
              <button
                onClick={() => setShowModal(false)}
                className="absolute right-4 top-4 p-2 text-slate-400 hover:text-slate-200 rounded-lg hover:bg-white/5 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3 border-b border-slate-800 pb-4 mb-5">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 font-bold flex items-center justify-center text-lg">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-bold font-serif text-white">
                    {editingPost ? 'Edit Blog Article' : 'Create Blog Article'}
                  </h3>
                  <p className="text-xs text-slate-400">
                    Draft, format, and publish articles for academy readers
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 text-sm">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">
                    Post Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 5 Essential Rules of Tajweed Every Beginner Must Know"
                    value={formData.title}
                    onChange={handleTitleChange}
                    className="w-full px-3.5 py-2 bg-slate-100 border border-slate-300 text-slate-900 placeholder-slate-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-slate-300 mb-1">
                      URL Slug *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 5-essential-rules-of-tajweed"
                      value={formData.slug}
                      onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                      className="w-full px-3.5 py-2 bg-slate-100 border border-slate-300 text-slate-900 placeholder-slate-500 rounded-xl text-xs font-mono focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-300 mb-1">
                      Category *
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-3.5 py-2 bg-slate-100 border border-slate-300 text-slate-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                    >
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-slate-300 mb-1">
                      Author Name
                    </label>
                    <input
                      type="text"
                      value={formData.author}
                      onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                      className="w-full px-3.5 py-2 bg-slate-100 border border-slate-300 text-slate-900 placeholder-slate-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-300 mb-1">
                      Publish Date
                    </label>
                    <input
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full px-3.5 py-2 bg-slate-100 border border-slate-300 text-slate-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                    />
                  </div>
                </div>

                {/* Featured Image URL or Upload */}
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">
                    Featured Image URL or Upload
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="https://images.unsplash.com/..."
                      value={formData.image}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      className="flex-1 px-3.5 py-2 bg-slate-100 border border-slate-300 text-slate-900 placeholder-slate-500 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                    />
                    <label className="px-3.5 py-2 bg-white/5 hover:bg-white/10 border border-slate-700 text-slate-300 font-semibold text-xs rounded-xl cursor-pointer transition-colors flex items-center gap-1.5 shrink-0">
                      <Upload className="w-3.5 h-3.5" />
                      <span>{uploadingImage ? 'Uploading...' : 'Upload File'}</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        disabled={uploadingImage}
                      />
                    </label>
                  </div>
                  {formData.image && (
                    <div className="mt-2 flex items-center gap-3 bg-[#1a2436] p-2 rounded-xl border border-slate-800">
                      <img
                        src={formData.image}
                        alt="Preview"
                        className="w-12 h-12 rounded-lg object-cover border border-slate-700"
                      />
                      <span className="text-xs text-slate-400 truncate">
                        Image Preview Attached
                      </span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">
                    Excerpt (Short Summary for card preview) *
                  </label>
                  <textarea
                    rows={2}
                    required
                    placeholder="Brief summary of the article..."
                    value={formData.excerpt}
                    onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-100 border border-slate-300 text-slate-900 placeholder-slate-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 resize-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">
                    Article Full Content (Markdown supported) *
                  </label>
                  <textarea
                    rows={7}
                    required
                    placeholder="Write your article content here..."
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-100 border border-slate-300 text-slate-900 placeholder-slate-500 rounded-xl font-mono text-xs focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                  />
                </div>

                <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer font-medium text-slate-300">
                    <input
                      type="checkbox"
                      checked={formData.published}
                      onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                      className="w-4 h-4 text-amber-500 rounded focus:ring-amber-500 accent-amber-500"
                    />
                    <span>Publish Immediately</span>
                  </label>
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-300 bg-white/5 hover:bg-white/10 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={actionLoading}
                    className="px-5 py-2 rounded-xl text-xs font-bold text-slate-950 bg-amber-500 hover:bg-amber-400 shadow-md transition-colors"
                  >
                    {actionLoading ? 'Saving...' : editingPost ? 'Update Post' : 'Publish Article'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {deleteId && (
          <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-[#1c2536] rounded-2xl max-w-md w-full p-6 shadow-xl border border-slate-800 animate-fadeIn text-center">
              <div className="w-12 h-12 rounded-full bg-red-500/10 text-red-400 border border-red-500/20 flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white font-serif">
                Delete Blog Article?
              </h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Are you sure you want to permanently delete this blog post?
              </p>
              <div className="flex items-center justify-center gap-3 mt-6">
                <button
                  onClick={() => setDeleteId(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-300 bg-white/5 hover:bg-white/10 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  disabled={actionLoading}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-red-600 hover:bg-red-500 transition-colors shadow-sm"
                >
                  {actionLoading ? 'Deleting...' : 'Confirm Delete'}
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </AdminLayout>
  );
}
