import React, { useState, useEffect } from 'react';
import {
  MessageSquare,
  Search,
  Trash2,
  CheckCircle,
  X,
  AlertTriangle,
  RefreshCw,
  Eye,
  Clock,
  User,
  Inbox
} from 'lucide-react';
import WhatsAppIcon from '../../components/WhatsAppIcon';
import AdminLayout from '../../components/AdminLayout';
import Loader from '../../components/Loader';
import { useAuth } from '../../context/AuthContext';
import {
  getContactMessages,
  markMessageRead,
  deleteMessage
} from '../../api/contact';

export default function Messages() {
  const { token } = useAuth();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [toast, setToast] = useState({ message: '', type: '' });

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast({ message: '', type: '' }), 4000);
  };

  const fetchMessagesList = async () => {
    setLoading(true);
    try {
      const data = await getContactMessages(token);
      setMessages(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Failed to fetch contact messages:', err);
      showToast('Failed to load contact messages.', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessagesList();
  }, [token]);

  const handleOpenMessage = async (msg) => {
    setSelectedMessage(msg);
    const msgId = msg._id || msg.id;
    const isUnread = msg.read === false || msg.is_read === false;
    if (isUnread) {
      try {
        await markMessageRead(msgId, token);
        window.dispatchEvent(new Event('qoa:refresh-notifications'));
        // update local state
        setMessages((prev) =>
          prev.map((m) => ((m._id || m.id) === msgId ? { ...m, read: true, is_read: true } : m))
        );
      } catch (err) {
        console.error('Failed to mark message as read:', err);
      }
    }
  };

  const handleMarkRead = async (id, e) => {
    if (e) e.stopPropagation();
    setActionLoading(true);
    try {
      await markMessageRead(id, token);
      window.dispatchEvent(new Event('qoa:refresh-notifications'));
      showToast('Message marked as read.', 'success');
      setMessages((prev) =>
        prev.map((m) => ((m._id || m.id) === id ? { ...m, read: true, is_read: true } : m))
      );
      if (selectedMessage && (selectedMessage._id || selectedMessage.id) === id) {
        setSelectedMessage((prev) => ({ ...prev, read: true, is_read: true }));
      }
    } catch (err) {
      console.error('Failed to mark read:', err);
      showToast('Failed to update message status.', 'error');
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setActionLoading(true);
    try {
      await deleteMessage(deleteId, token);
      showToast('Message deleted successfully.', 'success');
      setDeleteId(null);
      if (selectedMessage && (selectedMessage._id || selectedMessage.id) === deleteId) {
        setSelectedMessage(null);
      }
      fetchMessagesList();
    } catch (err) {
      console.error('Delete message error:', err);
      showToast(err.message || 'Failed to delete message.', 'error');
    } finally {
      setActionLoading(false);
    }
  };

  const filteredMessages = messages.filter((m) => {
    const query = searchTerm.toLowerCase().trim();
    if (!query) return true;
    return (
      (m.name || '').toLowerCase().includes(query) ||
      (m.whatsapp || '').toLowerCase().includes(query) ||
      (m.subject || '').toLowerCase().includes(query) ||
      (m.message || '').toLowerCase().includes(query)
    );
  });

  const unreadCount = messages.filter(
    (m) => m.read === false || m.is_read === false
  ).length;

  return (
    <AdminLayout title="Contact Messages Inbox">
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

        {/* Controls Bar */}
        <div className="bg-[#1c2536] p-4 sm:p-5 rounded-2xl border border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Search by sender name, WhatsApp number, or subject..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-100 border border-slate-700 rounded-xl text-sm text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all"
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
            <span className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-purple-500/15 text-purple-400 border border-purple-500/30">
              Unread: {unreadCount}
            </span>

            <button
              onClick={fetchMessagesList}
              className="p-2.5 text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 rounded-xl transition-colors"
              title="Refresh inbox"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Messages List / Table */}
        {loading ? (
          <Loader message="Loading inbox messages..." />
        ) : (
          <div className="bg-[#1c2536] rounded-2xl border border-slate-800 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              {filteredMessages.length === 0 ? (
                <div className="p-12 text-center text-slate-500">
                  <Inbox className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                  <p className="font-semibold text-white">Inbox is empty</p>
                  <p className="text-xs text-slate-500 mt-1">
                    No contact form messages found matching your search.
                  </p>
                </div>
              ) : (
                <table className="w-full text-left text-sm">
                  <thead className="bg-[#1a2436] border-b border-slate-800 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    <tr>
                      <th className="px-5 py-3.5">Status</th>
                      <th className="px-5 py-3.5">Sender</th>
                      <th className="px-5 py-3.5">Subject & Message Preview</th>
                      <th className="px-5 py-3.5">Date Received</th>
                      <th className="px-5 py-3.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {filteredMessages.map((msg) => {
                      const isUnread = msg.read === false || msg.is_read === false;
                      return (
                        <tr
                          key={msg._id || msg.id}
                          onClick={() => handleOpenMessage(msg)}
                          className={`cursor-pointer transition-colors ${
                            isUnread
                              ? 'bg-purple-500/10 font-medium hover:bg-purple-500/20'
                              : 'hover:bg-white/5'
                          }`}
                        >
                          <td className="px-5 py-4 whitespace-nowrap">
                            {isUnread ? (
                              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-purple-500/15 text-purple-400 border border-purple-500/30">
                                Unread
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-white/5 text-slate-400">
                                Read
                              </span>
                            )}
                          </td>
                          <td className="px-5 py-4 whitespace-nowrap">
                            <div className="font-bold text-white">{msg.name}</div>
                            <div className="text-xs text-slate-400">{msg.whatsapp}</div>
                          </td>
                          <td className="px-5 py-4 max-w-xs sm:max-w-md truncate">
                            <div className="font-semibold text-slate-200 truncate">
                              {msg.subject || 'General Inquiry'}
                            </div>
                            <div className="text-xs text-slate-400 truncate mt-0.5">
                              {msg.message}
                            </div>
                          </td>
                          <td className="px-5 py-4 whitespace-nowrap text-xs text-slate-400">
                            {msg.date || (msg.createdAt ? new Date(msg.createdAt).toLocaleString() : 'N/A')}
                          </td>
                          <td
                            className="px-5 py-4 whitespace-nowrap text-right"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => handleOpenMessage(msg)}
                                className="p-1.5 text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
                                title="View message"
                              >
                                <Eye className="w-4 h-4" />
                              </button>

                              {isUnread && (
                                <button
                                  onClick={(e) => handleMarkRead(msg.id, e)}
                                  className="px-2.5 py-1 text-xs font-semibold bg-purple-500/15 hover:bg-purple-500/25 text-purple-400 border border-purple-500/30 rounded-lg transition-colors"
                                  title="Mark as read"
                                >
                                  Mark Read
                                </button>
                              )}

                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setDeleteId(msg.id);
                                }}
                                className="p-1.5 text-red-400 hover:text-red-300 bg-red-500/10 hover:bg-red-500/20 rounded-lg transition-colors border border-red-500/20"
                                title="Delete message"
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

        {/* View Message Detail Modal */}
        {selectedMessage && (
          <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-[#1c2536] rounded-2xl max-w-xl w-full p-6 shadow-xl border border-slate-800 relative animate-fadeIn">
              <button
                onClick={() => setSelectedMessage(null)}
                className="absolute right-4 top-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3 border-b border-slate-800 pb-4 mb-4">
                <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 font-bold flex items-center justify-center text-lg">
                  <WhatsAppIcon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold font-serif text-white">
                    {selectedMessage.subject || 'Contact Inquiry'}
                  </h3>
                  <p className="text-xs text-slate-400">
                    Received on {selectedMessage.date || (selectedMessage.createdAt ? new Date(selectedMessage.createdAt).toLocaleString() : 'Unknown date')}
                  </p>
                </div>
              </div>

              <div className="bg-[#1a2436] p-4 rounded-xl border border-slate-800/50 space-y-2 mb-4 text-xs sm:text-sm">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-400">Sender Name:</span>
                  <span className="text-white font-medium">{selectedMessage.name}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-400">WhatsApp Number:</span>
                  <a
                    href={`https://wa.me/${(selectedMessage.whatsapp || '').replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-amber-400 hover:underline font-medium"
                  >
                    {selectedMessage.whatsapp}
                  </a>
                </div>
              </div>

              <div className="bg-[#1a2436] p-4 rounded-xl border border-slate-800/50 mb-6">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                  Message Body
                </h4>
                <p className="text-slate-200 text-sm leading-relaxed whitespace-pre-wrap">
                  {selectedMessage.message}
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                <a
                  href={`https://wa.me/${(selectedMessage.whatsapp || '').replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-950 bg-amber-500 hover:bg-amber-400 shadow-md transition-colors flex items-center gap-1.5"
                >
                  <WhatsAppIcon className="w-3.5 h-3.5" /> Reply on WhatsApp
                </a>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setDeleteId(selectedMessage._id || selectedMessage.id);
                    }}
                    className="px-3 py-2 rounded-xl text-xs font-semibold text-red-400 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 transition-colors"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => setSelectedMessage(null)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-300 bg-white/5 hover:bg-white/10 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {deleteId && (
          <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-[#1c2536] rounded-2xl max-w-md w-full p-6 shadow-xl border border-slate-800 animate-fadeIn text-center">
              <div className="w-12 h-12 rounded-full bg-red-500/10 text-red-400 flex items-center justify-center mx-auto mb-4 border border-red-500/20">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white font-serif">
                Delete Message?
              </h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Are you sure you want to delete this inquiry from your inbox?
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
