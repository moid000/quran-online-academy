import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Users, Clock, CheckCircle, Mail } from 'lucide-react';
import AdminLayout from '../../components/AdminLayout';
import Loader from '../../components/Loader';
import { useAuth } from '../../context/AuthContext';
import { getStudents } from '../../api/students';
import { getContactMessages } from '../../api/contact';

export default function Dashboard() {
  const { token } = useAuth();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalRegistrations: 0,
    pendingVerifications: 0,
    enrolledStudents: 0,
    unreadMessages: 0,
  });
  const [recentStudents, setRecentStudents] = useState([]);
  const [recentMessages, setRecentMessages] = useState([]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [studentsData, messagesData] = await Promise.all([
        getStudents(token),
        getContactMessages(token)
      ]);

      const studentsList = Array.isArray(studentsData) ? studentsData : [];
      const messagesList = Array.isArray(messagesData) ? messagesData : [];

      const pendingCount = studentsList.filter(
        (s) => (s.status || '').toLowerCase() === 'pending'
      ).length;
      const approvedCount = studentsList.filter(
        (s) => (s.status || '').toLowerCase() === 'approved'
      ).length;
      const unreadCount = messagesList.filter(
        (m) => m.read === false || m.is_read === false
      ).length;

      setStats({
        totalRegistrations: studentsList.length,
        pendingVerifications: pendingCount,
        enrolledStudents: approvedCount,
        unreadMessages: unreadCount,
      });

      setRecentStudents(studentsList.slice(0, 5));
      setRecentMessages(messagesList.slice(0, 5));
    } catch (err) {
      console.error('Dashboard fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [token]);

  const statCards = [
    { label: 'Total Registrations', value: stats.totalRegistrations, icon: Users, color: 'bg-blue-500' },
    { label: 'Pending Verifications', value: stats.pendingVerifications, icon: Clock, color: 'bg-amber-500' },
    { label: 'Enrolled Students', value: stats.enrolledStudents, icon: CheckCircle, color: 'bg-emerald-500' },
    { label: 'Unread Messages', value: stats.unreadMessages, icon: Mail, color: 'bg-purple-500' },
  ];

  return (
    <AdminLayout title="Dashboard" subtitle="Welcome back, Admin">
      {loading ? (
        <Loader message="Loading dashboard stats..." />
      ) : (
        <div className="space-y-6">

          {/* Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {statCards.map((card) => {
              const Icon = card.icon;
              return (
                <div key={card.label} className="bg-[#1c2536] rounded-2xl p-5">
                  <div className={`w-11 h-11 rounded-xl ${card.color} flex items-center justify-center`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold text-white mt-4">{card.value}</h3>
                  <p className="text-slate-400 text-sm mt-1">{card.label}</p>
                </div>
              );
            })}
          </div>

          {/* Recent Registrations + Recent Messages */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">

            {/* Recent Registrations */}
            <div className="bg-[#1c2536] rounded-2xl p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-white">Recent Registrations</h3>
                <Link to="/admin/students" className="text-amber-400 text-sm font-medium hover:text-amber-300">
                  View All
                </Link>
              </div>
              {recentStudents.length === 0 ? (
                <p className="text-slate-500 text-sm text-center py-10">No registrations yet</p>
              ) : (
                <div className="space-y-2">
                  {recentStudents.map((s) => (
                    <div key={s._id || s.id} className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-600 mt-3 shrink-0" />
                      <div className="flex-1 bg-[#1a2436] rounded-xl p-3 min-w-0">
                        <p className="text-white text-sm font-semibold truncate">{s.name || s.full_name}</p>
                        <p className="text-slate-400 text-xs truncate">{s.course || s.course_name || s.email}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Recent Messages */}
            <div className="bg-[#1c2536] rounded-2xl p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-white">Recent Messages</h3>
                <Link to="/admin/messages" className="text-amber-400 text-sm font-medium hover:text-amber-300">
                  View All
                </Link>
              </div>
              {recentMessages.length === 0 ? (
                <p className="text-slate-500 text-sm text-center py-10">No messages yet</p>
              ) : (
                <div className="space-y-2">
                  {recentMessages.map((m) => (
                    <div key={m._id || m.id} className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-600 mt-3 shrink-0" />
                      <div className="flex-1 bg-[#1a2436] rounded-xl p-3 min-w-0">
                        <p className="text-white text-sm font-semibold truncate">{m.name}</p>
                        <p className="text-slate-400 text-xs truncate">{m.message}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
        </div>
      )}
    </AdminLayout>
  );
}
