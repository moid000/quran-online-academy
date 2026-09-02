import React, { useState, useEffect } from 'react';
import {
  Users,
  Search,
  Filter,
  Eye,
  CheckCircle,
  XCircle,
  Trash2,
  Clock,
  ExternalLink,
  X,
  AlertTriangle,
  RefreshCw,
  Phone,
  Mail,
  MapPin,
  Calendar,
  CreditCard,
  BookOpen
} from 'lucide-react';
import AdminLayout from '../../components/AdminLayout';
import Loader from '../../components/Loader';
import { useAuth } from '../../context/AuthContext';
import {
  getStudents,
  updateStudentStatus,
  deleteStudent
} from '../../api/students';

export default function Students() {
  const { token } = useAuth();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All'); // All, Pending, Approved, Rejected
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [toast, setToast] = useState({ message: '', type: '' });
  const [actionLoading, setActionLoading] = useState(false);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast({ message: '', type: '' }), 4000);
  };

  const fetchStudentsList = async () => {
    setLoading(true);
    try {
      const data = await getStudents(token);
      setStudents(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Failed to fetch students:', err);
      showToast('Failed to load students list.', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudentsList();
  }, [token]);

  const handleStatusChange = async (id, newStatus) => {
    setActionLoading(true);
    try {
      await updateStudentStatus(id, newStatus, token);
      showToast(`Student status updated to ${newStatus}.`, 'success');
      fetchStudentsList();
      if (selectedStudent && selectedStudent.id === id) {
        setSelectedStudent((prev) => ({ ...prev, status: newStatus }));
      }
    } catch (err) {
      console.error('Failed to update status:', err);
      showToast(err.message || 'Failed to update student status.', 'error');
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setActionLoading(true);
    try {
      await deleteStudent(deleteId, token);
      showToast('Student registration deleted successfully.', 'success');
      setDeleteId(null);
      if (selectedStudent && selectedStudent.id === deleteId) {
        setSelectedStudent(null);
      }
      fetchStudentsList();
    } catch (err) {
      console.error('Failed to delete student:', err);
      showToast(err.message || 'Failed to delete student.', 'error');
    } finally {
      setActionLoading(false);
    }
  };

  // Filter & search students
  const filteredStudents = students.filter((s) => {
    const matchesFilter =
      filter === 'All'
        ? true
        : (s.status || '').toLowerCase() === filter.toLowerCase();

    const name = (s.studentName || s.name || '').toLowerCase();
    const email = (s.email || '').toLowerCase();
    const father = (s.fatherName || '').toLowerCase();
    const course = (s.courseTitle || s.course || '').toLowerCase();
    const query = searchTerm.toLowerCase().trim();

    const matchesSearch =
      !query ||
      name.includes(query) ||
      email.includes(query) ||
      father.includes(query) ||
      course.includes(query);

    return matchesFilter && matchesSearch;
  });

  const getStatusBadge = (status) => {
    const s = (status || 'pending').toLowerCase();
    if (s === 'approved') {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
          <CheckCircle className="w-3.5 h-3.5 text-emerald-600" /> Approved
        </span>
      );
    }
    if (s === 'rejected') {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-800 border border-red-200">
          <XCircle className="w-3.5 h-3.5 text-red-600" /> Rejected
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 border border-amber-200">
        <Clock className="w-3.5 h-3.5 text-amber-600" /> Pending
      </span>
    );
  };

  return (
    <AdminLayout title="Student Registrations">
      <div className="space-y-6">
        
        {/* Toast Alert */}
        {toast.message && (
          <div
            className={`px-4 py-3 rounded-xl border text-sm font-medium flex items-center justify-between shadow-sm animate-fadeIn ${
              toast.type === 'error'
                ? 'bg-red-50 border-red-200 text-red-800'
                : 'bg-emerald-50 border-emerald-200 text-emerald-800'
            }`}
          >
            <span>{toast.message}</span>
            <button
              onClick={() => setToast({ message: '', type: '' })}
              className="text-slate-400 hover:text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Controls: Search and Status Filters */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Search bar */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by student name, father name, email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all"
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

          {/* Filter tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
            {['All', 'Pending', 'Approved', 'Rejected'].map((status) => {
              const active = filter === status;
              const count =
                status === 'All'
                  ? students.length
                  : students.filter(
                      (s) => (s.status || '').toLowerCase() === status.toLowerCase()
                    ).length;

              return (
                <button
                  key={status}
                  onClick={() => setFilter(status)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                    active
                      ? 'bg-amber-500 text-slate-950 shadow-sm'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                  }`}
                >
                  <span>{status}</span>
                  <span
                    className={`px-1.5 py-0.5 rounded-full text-[10px] ${
                      active ? 'bg-slate-950/20 text-slate-950' : 'bg-slate-200 text-slate-700'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}

            <button
              onClick={fetchStudentsList}
              className="p-2 text-slate-500 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors ml-1"
              title="Refresh list"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Table View */}
        {loading ? (
          <Loader message="Loading student records..." />
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              {filteredStudents.length === 0 ? (
                <div className="p-12 text-center text-slate-500">
                  <Users className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                  <p className="font-semibold text-slate-700">No students found</p>
                  <p className="text-xs text-slate-400 mt-1">
                    Try clearing your search or filter parameters.
                  </p>
                </div>
              ) : (
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-50 border-b border-slate-100 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    <tr>
                      <th className="px-5 py-3.5">Student Name</th>
                      <th className="px-5 py-3.5">Course</th>
                      <th className="px-5 py-3.5">Fee Package</th>
                      <th className="px-5 py-3.5">Status</th>
                      <th className="px-5 py-3.5">Submitted Date</th>
                      <th className="px-5 py-3.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredStudents.map((student) => {
                      const statusLower = (student.status || 'pending').toLowerCase();
                      return (
                        <tr
                          key={student.id}
                          className="hover:bg-slate-50/80 transition-colors"
                        >
                          <td className="px-5 py-4 whitespace-nowrap">
                            <div className="font-bold text-slate-900">
                              {student.studentName || student.name || 'N/A'}
                            </div>
                            <div className="text-xs text-slate-500">
                              Father: {student.fatherName || 'N/A'} • {student.whatsapp || student.email || ''}
                            </div>
                          </td>
                          <td className="px-5 py-4 whitespace-nowrap text-slate-700 font-medium max-w-[200px] truncate">
                            {student.courseTitle || student.course || 'N/A'}
                          </td>
                          <td className="px-5 py-4 whitespace-nowrap text-slate-600 max-w-[160px] truncate">
                            {student.packageName || student.package || 'N/A'}
                          </td>
                          <td className="px-5 py-4 whitespace-nowrap">
                            {getStatusBadge(student.status)}
                          </td>
                          <td className="px-5 py-4 whitespace-nowrap text-xs text-slate-500">
                            {student.createdDate || student.date || 'N/A'}
                          </td>
                          <td className="px-5 py-4 whitespace-nowrap text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              {/* View Details */}
                              <button
                                onClick={() => setSelectedStudent(student)}
                                className="p-1.5 text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                                title="View details"
                              >
                                <Eye className="w-4 h-4" />
                              </button>

                              {/* Approve button */}
                              {statusLower !== 'approved' && (
                                <button
                                  onClick={() => handleStatusChange(student.id, 'Approved')}
                                  disabled={actionLoading}
                                  className="px-2.5 py-1 text-xs font-semibold bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 rounded-lg transition-colors"
                                  title="Approve registration"
                                >
                                  Approve
                                </button>
                              )}

                              {/* Reject button */}
                              {statusLower !== 'rejected' && (
                                <button
                                  onClick={() => handleStatusChange(student.id, 'Rejected')}
                                  disabled={actionLoading}
                                  className="px-2.5 py-1 text-xs font-semibold bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 rounded-lg transition-colors"
                                  title="Reject registration"
                                >
                                  Reject
                                </button>
                              )}

                              {/* Delete button */}
                              <button
                                onClick={() => setDeleteId(student.id)}
                                className="p-1.5 text-red-600 hover:text-red-800 bg-red-50 hover:bg-red-100 rounded-lg transition-colors border border-red-100"
                                title="Delete student"
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

        {/* View Details Modal */}
        {selectedStudent && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-xl border border-slate-200 relative animate-fadeIn my-8">
              <button
                onClick={() => setSelectedStudent(null)}
                className="absolute right-4 top-4 p-2 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3 border-b border-slate-100 pb-4 mb-4">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-700 font-bold flex items-center justify-center text-lg font-serif">
                  {(selectedStudent.studentName || 'S')[0]}
                </div>
                <div>
                  <h3 className="text-xl font-bold font-serif text-slate-900">
                    {selectedStudent.studentName || selectedStudent.name}
                  </h3>
                  <div className="flex items-center gap-2 mt-0.5">
                    {getStatusBadge(selectedStudent.status)}
                    <span className="text-xs text-slate-400">
                      ID: {selectedStudent.id}
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm mb-6">
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                    Father / Guardian
                  </span>
                  <p className="font-semibold text-slate-800">
                    {selectedStudent.fatherName || 'Not provided'}
                  </p>
                </div>

                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                    Country
                  </span>
                  <p className="font-semibold text-slate-800 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-amber-600" />
                    {selectedStudent.country || 'Not provided'}
                  </p>
                </div>

                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                    Email Address
                  </span>
                  <p className="font-semibold text-slate-800 flex items-center gap-1.5 truncate">
                    <Mail className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    {selectedStudent.email || 'Not provided'}
                  </p>
                </div>

                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                    WhatsApp Number
                  </span>
                  <p className="font-semibold text-slate-800 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-emerald-600" />
                    {selectedStudent.whatsapp || 'Not provided'}
                  </p>
                </div>

                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                    Enrolled Course
                  </span>
                  <p className="font-semibold text-slate-800 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-blue-600" />
                    {selectedStudent.courseTitle || selectedStudent.course || 'Not specified'}
                  </p>
                </div>

                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                    Selected Fee Package
                  </span>
                  <p className="font-semibold text-slate-800 flex items-center gap-1.5">
                    <CreditCard className="w-3.5 h-3.5 text-purple-600" />
                    {selectedStudent.packageName || selectedStudent.package || 'Not specified'}
                  </p>
                </div>
              </div>

              {/* Payment Info & Screenshot */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 mb-6 space-y-3">
                <h4 className="font-bold text-xs uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
                  <CreditCard className="w-4 h-4 text-emerald-600" /> Payment & Verification Details
                </h4>
                <div className="text-xs text-slate-700 space-y-1">
                  <p>
                    <span className="font-medium text-slate-500">Method:</span>{' '}
                    {selectedStudent.paymentMethodName || selectedStudent.paymentMethod || 'Bank Transfer / Manual'}
                  </p>
                  <p>
                    <span className="font-medium text-slate-500">Submission Date:</span>{' '}
                    {selectedStudent.createdDate || selectedStudent.date || 'N/A'}
                  </p>
                </div>

                {selectedStudent.paymentScreenshot ? (
                  <div className="mt-3">
                    <p className="text-xs font-semibold text-slate-600 mb-1">Payment Receipt / Screenshot:</p>
                    <div className="relative group rounded-xl overflow-hidden border border-slate-200 bg-slate-900 max-h-56 flex items-center justify-center">
                      <img
                        src={selectedStudent.paymentScreenshot}
                        alt="Payment Screenshot"
                        className="object-contain max-h-56 w-full"
                      />
                      <a
                        href={selectedStudent.paymentScreenshot}
                        target="_blank"
                        rel="noreferrer"
                        className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-semibold gap-1.5"
                      >
                        <ExternalLink className="w-4 h-4" /> Open Full Image
                      </a>
                    </div>
                  </div>
                ) : (
                  <p className="text-xs text-slate-400 italic">No payment receipt attached.</p>
                )}
              </div>

              {/* Action Buttons in Modal */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  onClick={() => setSelectedStudent(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors"
                >
                  Close
                </button>

                <button
                  onClick={() => handleStatusChange(selectedStudent.id, 'Rejected')}
                  disabled={actionLoading}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-red-700 bg-red-50 hover:bg-red-100 border border-red-200 transition-colors"
                >
                  Mark Rejected
                </button>

                <button
                  onClick={() => handleStatusChange(selectedStudent.id, 'Approved')}
                  disabled={actionLoading}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-950 bg-emerald-500 hover:bg-emerald-400 shadow-md transition-colors"
                >
                  Approve Student
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {deleteId && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-slate-200 animate-fadeIn text-center">
              <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 font-serif">
                Delete Registration Record?
              </h3>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                Are you sure you want to permanently delete this student registration? This action cannot be undone.
              </p>
              <div className="flex items-center justify-center gap-3 mt-6">
                <button
                  onClick={() => setDeleteId(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  disabled={actionLoading}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-red-600 hover:bg-red-700 transition-colors shadow-sm"
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
