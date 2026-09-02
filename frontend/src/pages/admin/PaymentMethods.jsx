import React, { useState, useEffect } from 'react';
import {
  Wallet,
  Plus,
  Edit2,
  Trash2,
  CheckCircle,
  XCircle,
  X,
  AlertTriangle,
  RefreshCw,
  Building,
  CreditCard,
  HelpCircle
} from 'lucide-react';
import AdminLayout from '../../components/AdminLayout';
import Loader from '../../components/Loader';
import { useAuth } from '../../context/AuthContext';
import {
  getPaymentMethods,
  createPaymentMethod,
  updatePaymentMethod,
  deletePaymentMethod
} from '../../api/paymentMethods';

export default function PaymentMethods() {
  const { token } = useAuth();
  const [methods, setMethods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingMethod, setEditingMethod] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [toast, setToast] = useState({ message: '', type: '' });

  const initialForm = {
    name: '',
    account_title: '',
    account_number: '',
    type: 'Bank Transfer',
    bankName: '',
    iban: '',
    swiftCode: '',
    instructions: '',
    icon: '💳',
    active: true
  };

  const [formData, setFormData] = useState(initialForm);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast({ message: '', type: '' }), 4000);
  };

  const fetchPaymentMethodsList = async () => {
    setLoading(true);
    try {
      const data = await getPaymentMethods();
      setMethods(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Failed to fetch payment methods:', err);
      showToast('Failed to load payment methods.', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPaymentMethodsList();
  }, []);

  const openAddModal = () => {
    setEditingMethod(null);
    setFormData(initialForm);
    setShowModal(true);
  };

  const openEditModal = (pm) => {
    setEditingMethod(pm);
    setFormData({
      name: pm.name || '',
      account_title: pm.accountName || pm.account_title || '',
      account_number: pm.accountNumber || pm.account_number || '',
      type: pm.type || 'Bank Transfer',
      bankName: pm.bankName || '',
      iban: pm.iban || '',
      swiftCode: pm.swiftCode || '',
      instructions: pm.instructions || '',
      icon: pm.icon || '💳',
      active: pm.active ?? pm.is_active ?? true
    });
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      showToast('Payment method name is required.', 'error');
      return;
    }

    setActionLoading(true);
    try {
      const payload = {
        name: formData.name,
        accountName: formData.account_title,
        account_title: formData.account_title,
        accountNumber: formData.account_number,
        account_number: formData.account_number,
        type: formData.type,
        bankName: formData.bankName,
        iban: formData.iban,
        swiftCode: formData.swiftCode,
        instructions: formData.instructions,
        icon: formData.icon,
        active: formData.active,
        is_active: formData.active
      };

      if (editingMethod) {
        await updatePaymentMethod(editingMethod.id, payload, token);
        showToast('Payment method updated successfully!', 'success');
      } else {
        await createPaymentMethod(payload, token);
        showToast('New payment method added successfully!', 'success');
      }

      setShowModal(false);
      fetchPaymentMethodsList();
    } catch (err) {
      console.error('Payment method save error:', err);
      showToast(err.message || 'Failed to save payment method.', 'error');
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setActionLoading(true);
    try {
      await deletePaymentMethod(deleteId, token);
      showToast('Payment method deleted successfully.', 'success');
      setDeleteId(null);
      fetchPaymentMethodsList();
    } catch (err) {
      console.error('Delete payment method error:', err);
      showToast(err.message || 'Failed to delete payment method.', 'error');
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <AdminLayout title="Payment Method Configuration">
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

        {/* Controls Header */}
        <div className="bg-[#1c2536] p-4 sm:p-5 rounded-2xl border border-slate-800 shadow-sm flex items-center justify-between gap-4">
          <div>
            <h3 className="font-bold text-white font-serif text-lg">
              Academy Tuition Payment Options
            </h3>
            <p className="text-xs text-slate-400">
              Configure bank accounts, mobile wallets, and remittance channels shown to students
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchPaymentMethodsList}
              className="p-2.5 bg-white/5 hover:bg-white/10 text-slate-300 rounded-xl transition-colors"
              title="Refresh list"
            >
              <RefreshCw className="w-4 h-4" />
            </button>

            <button
              onClick={openAddModal}
              className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" /> Add Payment Method
            </button>
          </div>
        </div>

        {/* Table View */}
        {loading ? (
          <Loader message="Loading payment channels..." />
        ) : (
          <div className="bg-[#1c2536] rounded-2xl border border-slate-800 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              {methods.length === 0 ? (
                <div className="p-12 text-center text-slate-500">
                  <Wallet className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                  <p className="font-semibold text-white">No payment channels active</p>
                  <p className="text-xs text-slate-500 mt-1">
                    Click "Add Payment Method" above to configure payment instructions for new students.
                  </p>
                </div>
              ) : (
                <table className="w-full text-left text-sm">
                  <thead className="bg-[#1a2436] border-b border-slate-800 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    <tr>
                      <th className="px-5 py-3.5">Method & Icon</th>
                      <th className="px-5 py-3.5">Account Title</th>
                      <th className="px-5 py-3.5">Account / IBAN Number</th>
                      <th className="px-5 py-3.5">Active Status</th>
                      <th className="px-5 py-3.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {methods.map((pm, idx) => {
                      const isActive = pm.active ?? pm.is_active ?? true;
                      const title = pm.accountName || pm.account_title || 'N/A';
                      const number = pm.accountNumber || pm.account_number || pm.iban || 'N/A';

                      return (
                        <tr key={pm.id || idx} className="hover:bg-white/5 transition-colors">
                          <td className="px-5 py-4 whitespace-nowrap">
                            <div className="flex items-center gap-3">
                              <span className="w-9 h-9 rounded-xl bg-[#1a2436] border border-slate-800 text-lg flex items-center justify-center shrink-0">
                                {pm.icon || '💳'}
                              </span>
                              <div>
                                <div className="font-bold text-white">{pm.name}</div>
                                <div className="text-xs text-slate-400">
                                  {pm.type || 'Payment Gateway'}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-5 py-4 whitespace-nowrap font-medium text-slate-300">
                            {title}
                          </td>
                          <td className="px-5 py-4 whitespace-nowrap font-mono text-xs text-slate-400">
                            {number}
                          </td>
                          <td className="px-5 py-4 whitespace-nowrap">
                            {isActive ? (
                              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                                <CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> Active
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/15 text-amber-400 border border-amber-500/30">
                                <XCircle className="w-3.5 h-3.5 text-amber-400" /> Disabled
                              </span>
                            )}
                          </td>
                          <td className="px-5 py-4 whitespace-nowrap text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => openEditModal(pm)}
                                className="p-1.5 bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white rounded-lg transition-colors"
                                title="Edit method"
                              >
                                <Edit2 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => setDeleteId(pm.id)}
                                className="p-1.5 text-red-400 hover:text-red-300 bg-red-500/10 hover:bg-red-500/20 rounded-lg transition-colors border border-red-500/20"
                                title="Delete method"
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

        {/* Add / Edit Modal */}
        {showModal && (
          <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-[#1c2536] rounded-2xl max-w-lg w-full p-6 shadow-xl border border-slate-800 relative animate-fadeIn my-8">
              <button
                onClick={() => setShowModal(false)}
                className="absolute right-4 top-4 p-2 text-slate-400 hover:text-slate-200 rounded-lg hover:bg-white/5 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3 border-b border-slate-800 pb-4 mb-5">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 font-bold flex items-center justify-center text-lg">
                  <Wallet className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-bold font-serif text-white">
                    {editingMethod ? 'Edit Payment Method' : 'Add Payment Method'}
                  </h3>
                  <p className="text-xs text-slate-400">
                    Configure account details & instructions for fee transfers
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 text-sm">
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                  <div className="sm:col-span-3">
                    <label className="block font-semibold text-slate-300 mb-1">
                      Method Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Bank Alfalah Islamic or Wise Transfer"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2 bg-slate-100 border border-slate-300 text-slate-900 placeholder-slate-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-300 mb-1">
                      Icon / Emoji
                    </label>
                    <input
                      type="text"
                      placeholder="💳"
                      value={formData.icon}
                      onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-100 border border-slate-300 text-slate-900 placeholder-slate-500 rounded-xl text-center text-lg focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">
                    Account Title / Beneficiary Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. QURAN ONLINE ACADEMIA"
                    value={formData.account_title}
                    onChange={(e) => setFormData({ ...formData, account_title: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-100 border border-slate-300 text-slate-900 placeholder-slate-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">
                    Account Number / IBAN / Wallet ID *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 0317747928601 or PK36ALFH0317747928601"
                    value={formData.account_number}
                    onChange={(e) => setFormData({ ...formData, account_number: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-100 border border-slate-300 text-slate-900 placeholder-slate-500 rounded-xl font-mono text-xs focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">
                    Transfer Instructions & Notes
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Transfer fee to the account above and upload transaction screenshot during registration..."
                    value={formData.instructions}
                    onChange={(e) => setFormData({ ...formData, instructions: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-100 border border-slate-300 text-slate-900 placeholder-slate-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 resize-none text-xs"
                  />
                </div>

                <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer font-medium text-slate-300">
                    <input
                      type="checkbox"
                      checked={formData.active}
                      onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                      className="w-4 h-4 text-amber-500 rounded focus:ring-amber-500 accent-amber-500"
                    />
                    <span>Payment Method Active</span>
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
                    {actionLoading ? 'Saving...' : editingMethod ? 'Update Method' : 'Create Method'}
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
                Delete Payment Method?
              </h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Are you sure you want to remove this payment channel from registration options?
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
