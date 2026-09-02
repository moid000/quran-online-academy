import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Users,
  BookOpen,
  MessageSquare,
  Clock,
  CheckCircle,
  XCircle,
  Eye,
  ArrowRight,
  TrendingUp,
  AlertCircle,
  Mail,
  RefreshCw
} from 'lucide-react';
import AdminLayout from '../../components/AdminLayout';
import Loader from '../../components/Loader';
import { useAuth } from '../../context/AuthContext';
import { getStudents } from '../../api/students';
import { getCourses } from '../../api/courses';
import { getContactMessages } from '../../api/contact';

export default function Dashboard() {
  const { token } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [stats, setStats] = useState({
    totalStudents: 0,
    pendingApprovals: 0,
    totalCourses: 0,
    unreadMessages: 0,
  });
  const [recentStudents, setRecentStudents] = useState([]);
  const [recentMessages, setRecentMessages] = useState([]);

  const fetchData = async () => {
    setLoading(true);
    setError('');
    try {
      const [studentsData, coursesData, messagesData] = await Promise.all([
        getStudents(token),
        getCourses(),
        getContactMessages(token)
      ]);

      const studentsList = Array.isArray(studentsData) ? studentsData : [];
      const coursesList = Array.isArray(coursesData) ? coursesData : [];
      const messagesList = Array.isArray(messagesData) ? messagesData : [];

      const pendingCount = studentsList.filter(
        (s) => (s.status || '').toLowerCase() === 'pending'
      ).length;

      const unreadCount = messagesList.filter(
        (m) => m.read === false || m.is_read === false
      ).length;

      setStats({
        totalStudents: studentsList.length,
        pendingApprovals: pendingCount,
        totalCourses: coursesList.length,
        unreadMessages: unreadCount,
      });

      setRecentStudents(studentsList.slice(0, 5));
      setRecentMessages(messagesList.slice(0, 5));
    } catch (err) {
      console.error('Dashboard fetch error:', err);
      setError('Failed to load dashboard data. Please refresh.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [token]);

  const getStatusBadge = (status) => {
    const s = (status || 'pending').toLowerCase();
    if (s === 'approved') {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 border border-emerald-200">
          <CheckCircle className="w-3 h-3 text-emerald-600" /> Approved
        </span>
      );
    }
    if (s === 'rejected') {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 border border-red-200">
          <XCircle className="w-3 h-3 text-red-600" /> Rejected
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800 border border-amber-200">
        <Clock className="w-3 h-3 text-amber-600" /> Pending
      </span>
    );
  };

  return (
    <AdminLayout title="Dashboard Overview">
      {loading ? (
        <Loader message="Loading dashboard stats..." />
      ) : (
        <div className="space-y-6 animate-fadeIn">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm flex items-center justify-between">
              <span>{error}</span>
              <button
                onClick={fetchData}
                className="font-medium text-red-700 underline flex items-center gap-1 hover:text-red-900"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Retry
              </button>
            </div>
          )}

          {/* Quick Action Banner */}
          <div className="bg-gradient-to-r from-emerald-900 via-emerald-850 to-slate-900 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden border border-emerald-800/40">
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <span className="text-amber-400 font-semibold text-xs uppercase tracking-wider block mb-1">
                  Welcome Back, Administrator
                </span>
                <h2 className="text-xl md:text-2xl font-serif font-bold tracking-tight text-white">
                  Quran Online Academy Management Console
                </h2>
                <p className="text-emerald-200/80 text-xs sm:text-sm mt-1 max-w-xl">
                  Monitor student enrollments, course catalogs, fee packages, and visitor inquiries in real time.
                </p>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <Link
                  to="/admin/students"
                  className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-xs shadow-md transition-all flex items-center gap-1.5"
                >
                  <Users className="w-4 h-4" /> Manage Students
                </Link>
                <button
                  onClick={fetchData}
                  className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 transition-colors border border-slate-700"
                  title="Refresh Dashboard"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* 4 Overview Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {/* Stat Card 1: Total Students */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Total Students
                  </p>
                  <h3 className="text-2xl font-bold text-slate-900 mt-1">
                    {stats.totalStudents}
                  </h3>
                </div>
                <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <Users className="w-6 h-6" />
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span className="text-emerald-600 font-medium flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5" /> Enrolled Students
                </span>
                <Link to="/admin/students" className="hover:text-amber-600 font-medium flex items-center gap-0.5">
                  View <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>

            {/* Stat Card 2: Pending Approvals */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Pending Approvals
                  </p>
                  <h3 className="text-2xl font-bold text-amber-600 mt-1">
                    {stats.pendingApprovals}
                  </h3>
                </div>
                <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-100 text-amber-600 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <AlertCircle className="w-6 h-6" />
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span className="text-amber-600 font-medium">Requires verification</span>
                <Link to="/admin/students" className="hover:text-amber-600 font-medium flex items-center gap-0.5">
                  Review <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>

            {/* Stat Card 3: Total Courses */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Total Courses
                  </p>
                  <h3 className="text-2xl font-bold text-slate-900 mt-1">
                    {stats.totalCourses}
                  </h3>
                </div>
                <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <BookOpen className="w-6 h-6" />
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span className="text-blue-600 font-medium">Active Academy Courses</span>
                <Link to="/admin/courses" className="hover:text-amber-600 font-medium flex items-center gap-0.5">
                  Manage <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>

            {/* Stat Card 4: Unread Messages */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Unread Messages
                  </p>
                  <h3 className="text-2xl font-bold text-purple-600 mt-1">
                    {stats.unreadMessages}
                  </h3>
                </div>
                <div className="w-12 h-12 rounded-xl bg-purple-50 border border-purple-100 text-purple-600 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <MessageSquare className="w-6 h-6" />
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span className="text-purple-600 font-medium">Inbox inquiries</span>
                <Link to="/admin/messages" className="hover:text-amber-600 font-medium flex items-center gap-0.5">
                  Read <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>

          {/* Grid section: Recent Registrations & Recent Messages */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Recent Registrations Table (Spans 2 columns) */}
            <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
              <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                <div>
                  <h3 className="font-bold text-slate-900 font-serif text-base flex items-center gap-2">
                    <Users className="w-4 h-4 text-emerald-700" /> Recent Student Registrations
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Latest 5 student submissions awaiting or completed processing
                  </p>
                </div>
                <Link
                  to="/admin/students"
                  className="text-xs font-semibold text-amber-700 hover:text-amber-800 flex items-center gap-1 hover:underline"
                >
                  View All <ArrowRight className="w-3 h-3" />
                </Link>
              </div>

              <div className="overflow-x-auto flex-1">
                {recentStudents.length === 0 ? (
                  <div className="p-8 text-center text-slate-500 text-sm">
                    No student registrations found yet.
                  </div>
                ) : (
                  <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50 border-b border-slate-100 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      <tr>
                        <th className="px-4 py-3">Student Name</th>
                        <th className="px-4 py-3">Course</th>
                        <th className="px-4 py-3">Package</th>
                        <th className="px-4 py-3">Status</th>
                        <th className="px-4 py-3 text-right">Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {recentStudents.map((student) => (
                        <tr key={student.id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="px-4 py-3 font-medium text-slate-900 whitespace-nowrap">
                            {student.studentName || student.name || 'N/A'}
                            {student.country && (
                              <span className="block text-[11px] text-slate-400 font-normal">
                                {student.country}
                              </span>
                            )}
                          </td>
                          <td className="px-4 py-3 text-slate-600 whitespace-nowrap max-w-[160px] truncate">
                            {student.courseTitle || student.course || 'N/A'}
                          </td>
                          <td className="px-4 py-3 text-slate-600 whitespace-nowrap max-w-[140px] truncate">
                            {student.packageName || student.package || 'N/A'}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            {getStatusBadge(student.status)}
                          </td>
                          <td className="px-4 py-3 text-right text-xs text-slate-500 whitespace-nowrap">
                            {student.createdDate || student.date || 'Recent'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>

            {/* Recent Messages List (1 column) */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
              <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                <div>
                  <h3 className="font-bold text-slate-900 font-serif text-base flex items-center gap-2">
                    <Mail className="w-4 h-4 text-purple-700" /> Recent Inquiries
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Latest contact form messages from visitors
                  </p>
                </div>
                <Link
                  to="/admin/messages"
                  className="text-xs font-semibold text-amber-700 hover:text-amber-800 flex items-center gap-1 hover:underline"
                >
                  View All <ArrowRight className="w-3 h-3" />
                </Link>
              </div>

              <div className="divide-y divide-slate-100 flex-1 overflow-y-auto max-h-[380px]">
                {recentMessages.length === 0 ? (
                  <div className="p-8 text-center text-slate-500 text-sm">
                    No contact messages found.
                  </div>
                ) : (
                  recentMessages.map((msg) => {
                    const isUnread = msg.read === false || msg.is_read === false;
                    return (
                      <div
                        key={msg.id}
                        className={`p-4 hover:bg-slate-50 transition-colors ${
                          isUnread ? 'bg-purple-50/30 font-medium' : ''
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-bold text-slate-900 truncate max-w-[160px]">
                            {msg.name}
                          </span>
                          <span className="text-[10px] text-slate-400 shrink-0">
                            {msg.date || 'Recent'}
                          </span>
                        </div>
                        <p className="text-xs font-semibold text-slate-700 truncate mb-1">
                          {msg.subject || 'General Inquiry'}
                        </p>
                        <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                          {msg.message}
                        </p>
                        <div className="mt-2 flex items-center justify-between">
                          {isUnread ? (
                            <span className="text-[10px] font-bold text-purple-700 bg-purple-100 px-2 py-0.5 rounded-full">
                              New
                            </span>
                          ) : (
                            <span className="text-[10px] text-slate-400">Read</span>
                          )}
                          <Link
                            to="/admin/messages"
                            className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-0.5"
                          >
                            <Eye className="w-3 h-3" /> View
                          </Link>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

          </div>
        </div>
      )}
    </AdminLayout>
  );
}
