import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  Plus,
  Edit2,
  Trash2,
  CheckCircle,
  XCircle,
  X,
  AlertTriangle,
  RefreshCw,
  Search,
  Clock
} from 'lucide-react';
import AdminLayout from '../../components/AdminLayout';
import Loader from '../../components/Loader';
import { useAuth } from '../../context/AuthContext';
import {
  getCourses,
  createCourse,
  updateCourse,
  deleteCourse
} from '../../api/courses';

export default function Courses() {
  const { token } = useAuth();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [toast, setToast] = useState({ message: '', type: '' });

  const initialForm = {
    title: '',
    arabicTitle: '',
    description: '',
    imageUrl: '',
    level: 'Beginner',
    duration: '3-6 Months',
    classesPerWeek: '3 Classes / Week',
    classDuration: '30 mins per class',
    instructor: 'Ustaz Abdul Muhaymin',
    active: true,
    order: 1
  };

  const [formData, setFormData] = useState(initialForm);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast({ message: '', type: '' }), 4000);
  };

  const fetchCoursesList = async () => {
    setLoading(true);
    try {
      const data = await getCourses();
      setCourses(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Failed to fetch courses:', err);
      showToast('Failed to load courses.', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoursesList();
  }, []);

  const openAddModal = () => {
    setEditingCourse(null);
    setFormData({ ...initialForm, order: courses.length + 1 });
    setShowModal(true);
  };

  const openEditModal = (course) => {
    setEditingCourse(course);
    setFormData({
      title: course.title || '',
      arabicTitle: course.arabicTitle || '',
      description: course.description || '',
      imageUrl: course.imageUrl || course.image || '',
      level: course.level || 'Beginner',
      duration: course.duration || '',
      classesPerWeek: course.classesPerWeek || '3 Classes / Week',
      classDuration: course.classDuration || '30 mins per class',
      instructor: course.instructor || 'Ustaz Abdul Muhaymin',
      active: course.active ?? course.is_active ?? true,
      order: course.order || 1
    });
    setShowModal(true);
  };

  const handleToggleActive = async (course) => {
    const newActiveState = !(course.active ?? course.is_active ?? true);
    try {
      await updateCourse(
        course.id,
        { ...course, active: newActiveState, is_active: newActiveState },
        token
      );
      showToast(`Course "${course.title}" status updated.`, 'success');
      fetchCoursesList();
    } catch (err) {
      console.error('Failed to toggle status:', err);
      showToast('Failed to update course status.', 'error');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      showToast('Course title is required.', 'error');
      return;
    }

    setActionLoading(true);
    try {
      const payload = {
        ...formData,
        imageUrl: formData.imageUrl,
        image: formData.imageUrl,
        is_active: formData.active,
        slug: formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
      };

      if (editingCourse) {
        await updateCourse(editingCourse.id, payload, token);
        showToast('Course updated successfully!', 'success');
      } else {
        await createCourse(payload, token);
        showToast('New course added successfully!', 'success');
      }

      setShowModal(false);
      fetchCoursesList();
    } catch (err) {
      console.error('Course save error:', err);
      showToast(err.message || 'Failed to save course.', 'error');
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setActionLoading(true);
    try {
      await deleteCourse(deleteId, token);
      showToast('Course deleted successfully.', 'success');
      setDeleteId(null);
      fetchCoursesList();
    } catch (err) {
      console.error('Delete course error:', err);
      showToast(err.message || 'Failed to delete course.', 'error');
    } finally {
      setActionLoading(false);
    }
  };

  const filteredCourses = courses.filter((c) => {
    const query = searchTerm.toLowerCase().trim();
    if (!query) return true;
    return (
      (c.title || '').toLowerCase().includes(query) ||
      (c.description || '').toLowerCase().includes(query) ||
      (c.level || '').toLowerCase().includes(query)
    );
  });

  const getLevelBadge = (level) => {
    const l = (level || 'Beginner').toLowerCase();
    if (l.includes('beginner')) {
      return (
        <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/20">
          Beginner
        </span>
      );
    }
    if (l.includes('intermediate')) {
      return (
        <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-500/15 text-blue-400 border border-blue-500/20">
          Intermediate
        </span>
      );
    }
    return (
      <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-500/15 text-purple-400 border border-purple-500/20">
        All Levels
      </span>
    );
  };

  return (
    <AdminLayout title="Course Management">
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

        {/* Action Header bar */}
        <div className="bg-[#1c2536] p-4 sm:p-5 rounded-2xl border border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Search courses by title, level, description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-100 text-slate-900 placeholder-slate-500 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchCoursesList}
              className="p-2.5 text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 rounded-xl transition-colors"
              title="Refresh course list"
            >
              <RefreshCw className="w-4 h-4" />
            </button>

            <button
              onClick={openAddModal}
              className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" /> Add New Course
            </button>
          </div>
        </div>

        {/* Course Cards / Table */}
        {loading ? (
          <Loader message="Loading course catalog..." />
        ) : (
          <div className="bg-[#1c2536] rounded-2xl border border-slate-800 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              {filteredCourses.length === 0 ? (
                <div className="p-12 text-center text-slate-500">
                  <BookOpen className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                  <p className="font-semibold text-white">No courses found</p>
                  <p className="text-xs text-slate-500 mt-1">
                    Click "Add New Course" above to create your first course offering.
                  </p>
                </div>
              ) : (
                <table className="w-full text-left text-sm">
                  <thead className="bg-[#1a2436] border-b border-slate-800 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    <tr>
                      <th className="px-5 py-3.5 w-12 text-center">Order</th>
                      <th className="px-5 py-3.5">Course Title</th>
                      <th className="px-5 py-3.5">Level</th>
                      <th className="px-5 py-3.5">Duration</th>
                      <th className="px-5 py-3.5">Active Status</th>
                      <th className="px-5 py-3.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {filteredCourses.map((course, idx) => {
                      const isActive = course.active ?? course.is_active ?? true;
                      const imageSrc = course.imageUrl || course.image;
                      return (
                        <tr key={course.id || idx} className="hover:bg-white/5 transition-colors">
                          <td className="px-5 py-4 text-center font-semibold text-slate-400 text-xs">
                            {course.order || idx + 1}
                          </td>
                          <td className="px-5 py-4 whitespace-nowrap">
                            <div className="flex items-center gap-3">
                              {imageSrc ? (
                                <img
                                  src={imageSrc}
                                  alt={course.title}
                                  className="w-10 h-10 object-cover rounded-lg border border-slate-700 flex-shrink-0"
                                  onError={(e) => {
                                    e.target.style.display = 'none';
                                  }}
                                />
                              ) : (
                                <div className="w-10 h-10 rounded-lg bg-[#1a2436] border border-slate-800 flex items-center justify-center flex-shrink-0">
                                  <BookOpen className="w-5 h-5 text-slate-500" />
                                </div>
                              )}
                              <div>
                                <div className="font-bold text-white flex items-center gap-2">
                                  {course.title}
                                  {course.arabicTitle && (
                                    <span className="font-arabic text-amber-400 text-xs bg-amber-500/15 px-2 py-0.5 rounded border border-amber-500/20">
                                      {course.arabicTitle}
                                    </span>
                                  )}
                                </div>
                                <div className="text-xs text-slate-400 max-w-md truncate mt-0.5">
                                  {course.description}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-5 py-4 whitespace-nowrap">
                            {getLevelBadge(course.level)}
                          </td>
                          <td className="px-5 py-4 whitespace-nowrap text-xs text-slate-400 font-medium">
                            <span className="flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5 text-slate-500" />
                              {course.duration || 'N/A'}
                            </span>
                          </td>
                          <td className="px-5 py-4 whitespace-nowrap">
                            <button
                              onClick={() => handleToggleActive(course)}
                              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
                                isActive
                                  ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/25'
                                  : 'bg-slate-800 text-slate-400 border border-slate-700 hover:bg-slate-700'
                              }`}
                            >
                              {isActive ? (
                                <>
                                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> Active
                                </>
                              ) : (
                                <>
                                  <XCircle className="w-3.5 h-3.5 text-slate-500" /> Inactive
                                </>
                              )}
                            </button>
                          </td>
                          <td className="px-5 py-4 whitespace-nowrap text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => openEditModal(course)}
                                className="p-1.5 text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
                                title="Edit course"
                              >
                                <Edit2 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => setDeleteId(course.id)}
                                className="p-1.5 text-red-400 hover:text-red-300 bg-red-500/10 hover:bg-red-500/20 rounded-lg transition-colors border border-red-500/20"
                                title="Delete course"
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

        {/* Add / Edit Course Modal */}
        {showModal && (
          <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-[#1c2536] rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-slate-800 relative animate-fadeIn my-8">
              <button
                onClick={() => setShowModal(false)}
                className="absolute right-4 top-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3 border-b border-slate-800 pb-4 mb-5">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 font-bold flex items-center justify-center text-lg">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-bold font-serif text-white">
                    {editingCourse ? 'Edit Course' : 'Add New Course'}
                  </h3>
                  <p className="text-xs text-slate-400">
                    Configure course details, image URL, level, duration, and active visibility
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 text-sm">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">
                    Course Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Basic Noorani Qaida"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-100 text-slate-900 placeholder-slate-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-slate-300 mb-1">
                      Arabic Title (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. القاعدة النورانية"
                      value={formData.arabicTitle}
                      onChange={(e) => setFormData({ ...formData, arabicTitle: e.target.value })}
                      className="w-full px-3.5 py-2 bg-slate-100 text-slate-900 placeholder-slate-500 rounded-xl font-arabic focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-300 mb-1">
                      Target Level *
                    </label>
                    <select
                      value={formData.level}
                      onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                      className="w-full px-3.5 py-2 bg-slate-100 text-slate-900 placeholder-slate-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                    >
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="All Levels">All Levels</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">
                    Course Description *
                  </label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Provide a detailed summary of what students will learn..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-100 text-slate-900 placeholder-slate-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 resize-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">
                    Image URL (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="https://images.unsplash.com/photo-..."
                    value={formData.imageUrl}
                    onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-100 text-slate-900 placeholder-slate-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                  />
                  {formData.imageUrl && (
                    <div className="mt-2.5 flex items-center gap-3 bg-[#1a2436] p-2.5 rounded-xl border border-slate-800">
                      <img
                        src={formData.imageUrl}
                        alt="Course preview"
                        className="w-12 h-12 object-cover rounded-lg border border-slate-700 flex-shrink-0"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.style.display = 'none';
                        }}
                      />
                      <div className="text-xs text-slate-400 overflow-hidden">
                        <p className="font-semibold text-slate-200">Image Preview</p>
                        <p className="text-[11px] text-slate-500 truncate max-w-xs">{formData.imageUrl}</p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-slate-300 mb-1">
                      Duration
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 3-6 Months"
                      value={formData.duration}
                      onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                      className="w-full px-3.5 py-2 bg-slate-100 text-slate-900 placeholder-slate-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-300 mb-1">
                      Display Order (Number)
                    </label>
                    <input
                      type="number"
                      min={1}
                      value={formData.order}
                      onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 1 })}
                      className="w-full px-3.5 py-2 bg-slate-100 text-slate-900 placeholder-slate-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                    />
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer font-medium text-slate-300">
                    <input
                      type="checkbox"
                      checked={formData.active}
                      onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                      className="w-4 h-4 text-amber-500 rounded focus:ring-amber-500 accent-amber-500 bg-slate-100"
                    />
                    <span>Course is Active & Visible</span>
                  </label>
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold bg-white/5 hover:bg-white/10 text-slate-300 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={actionLoading}
                    className="px-5 py-2 rounded-xl text-xs font-bold text-slate-950 bg-amber-500 hover:bg-amber-400 shadow-md transition-colors"
                  >
                    {actionLoading ? 'Saving...' : editingCourse ? 'Update Course' : 'Create Course'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {deleteId && (
          <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-[#1c2536] rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-800 animate-fadeIn text-center">
              <div className="w-12 h-12 rounded-full bg-red-500/10 text-red-400 flex items-center justify-center mx-auto mb-4 border border-red-500/20">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white font-serif">
                Delete Course?
              </h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Are you sure you want to delete this course from the academy catalog?
              </p>
              <div className="flex items-center justify-center gap-3 mt-6">
                <button
                  onClick={() => setDeleteId(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-white/5 hover:bg-white/10 text-slate-300 transition-colors"
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
