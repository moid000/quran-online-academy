import React, { useState, useEffect } from 'react';
import {
  CreditCard,
  Plus,
  Edit2,
  Trash2,
  CheckCircle,
  XCircle,
  X,
  AlertTriangle,
  RefreshCw,
  Star,
  Check,
  DollarSign
} from 'lucide-react';
import AdminLayout from '../../components/AdminLayout';
import Loader from '../../components/Loader';
import { useAuth } from '../../context/AuthContext';
import {
  getFeePackages,
  createFeePackage,
  updateFeePackage,
  deleteFeePackage
} from '../../api/feePackages';

export default function FeePackages() {
  const { token } = useAuth();
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingPackage, setEditingPackage] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [toast, setToast] = useState({ message: '', type: '' });

  const initialForm = {
    name: '',
    price_usd: 25,
    price_eur: 22,
    price_gbp: 20,
    days_per_week: '3 Days / Week',
    classes_per_month: '12 Classes / Month',
    duration_per_class: '30 Mins / Class',
    featuresInput: 'Live 1-on-1 Classes, Certified Teacher, Free Trial, Flexible Schedule',
    is_popular: false,
    is_active: true,
    order: 1
  };

  const [formData, setFormData] = useState(initialForm);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast({ message: '', type: '' }), 4000);
  };

  const fetchPackagesList = async () => {
    setLoading(true);
    try {
      const data = await getFeePackages();
      setPackages(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Failed to fetch fee packages:', err);
      showToast('Failed to load fee packages.', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPackagesList();
  }, []);

  const openAddModal = () => {
    setEditingPackage(null);
    setFormData({ ...initialForm, order: packages.length + 1 });
    setShowModal(true);
  };

  const openEditModal = (pkg) => {
    setEditingPackage(pkg);
    const feats = Array.isArray(pkg.features)
      ? pkg.features.join(', ')
      : pkg.features || '';

    setFormData({
      name: pkg.name || '',
      price_usd: pkg.priceUsd ?? pkg.price_usd ?? 0,
      price_eur: pkg.priceEur ?? pkg.price_eur ?? 0,
      price_gbp: pkg.priceGbp ?? pkg.price_gbp ?? 0,
      days_per_week: pkg.classesPerWeek || pkg.days_per_week || '3 Days / Week',
      classes_per_month: pkg.classesPerMonth || pkg.classes_per_month || '12 Classes / Month',
      duration_per_class: pkg.classDuration || pkg.duration_per_class || '30 Mins / Class',
      featuresInput: feats,
      is_popular: pkg.popular ?? pkg.is_popular ?? false,
      is_active: pkg.active ?? pkg.is_active ?? true,
      order: pkg.order || 1
    });
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      showToast('Package name is required.', 'error');
      return;
    }

    setActionLoading(true);
    try {
      // Convert comma-separated string to features array
      const featuresArray = formData.featuresInput
        .split(',')
        .map((f) => f.trim())
        .filter((f) => f.length > 0);

      const payload = {
        name: formData.name,
        priceUsd: Number(formData.price_usd),
        price_usd: Number(formData.price_usd),
        priceEur: Number(formData.price_eur),
        price_eur: Number(formData.price_eur),
        priceGbp: Number(formData.price_gbp),
        price_gbp: Number(formData.price_gbp),
        classesPerWeek: formData.days_per_week,
        days_per_week: formData.days_per_week,
        classesPerMonth: formData.classes_per_month,
        classes_per_month: formData.classes_per_month,
        classDuration: formData.duration_per_class,
        duration_per_class: formData.duration_per_class,
        features: featuresArray,
        popular: formData.is_popular,
        is_popular: formData.is_popular,
        active: formData.is_active,
        is_active: formData.is_active,
        order: formData.order
      };

      if (editingPackage) {
        await updateFeePackage(editingPackage.id, payload, token);
        showToast('Fee package updated successfully!', 'success');
      } else {
        await createFeePackage(payload, token);
        showToast('New fee package added successfully!', 'success');
      }

      setShowModal(false);
      fetchPackagesList();
    } catch (err) {
      console.error('Fee package save error:', err);
      showToast(err.message || 'Failed to save fee package.', 'error');
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setActionLoading(true);
    try {
      await deleteFeePackage(deleteId, token);
      showToast('Fee package deleted successfully.', 'success');
      setDeleteId(null);
      fetchPackagesList();
    } catch (err) {
      console.error('Delete fee package error:', err);
      showToast(err.message || 'Failed to delete fee package.', 'error');
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <AdminLayout title="Fee Package Management">
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

        {/* Action Header Bar */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between gap-4">
          <div>
            <h3 className="font-bold text-slate-900 font-serif text-lg">
              Academy Pricing & Tuition Packages
            </h3>
            <p className="text-xs text-slate-500">
              Manage fee plans, multi-currency rates, and highlighted feature badges
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchPackagesList}
              className="p-2.5 text-slate-500 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
              title="Refresh list"
            >
              <RefreshCw className="w-4 h-4" />
            </button>

            <button
              onClick={openAddModal}
              className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" /> Add Fee Package
            </button>
          </div>
        </div>

        {/* Package List Table */}
        {loading ? (
          <Loader message="Loading fee packages..." />
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              {packages.length === 0 ? (
                <div className="p-12 text-center text-slate-500">
                  <CreditCard className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                  <p className="font-semibold text-slate-700">No fee packages configured</p>
                  <p className="text-xs text-slate-400 mt-1">
                    Click "Add Fee Package" to create your first package.
                  </p>
                </div>
              ) : (
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-50 border-b border-slate-100 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    <tr>
                      <th className="px-5 py-3.5">Package Name</th>
                      <th className="px-5 py-3.5">Price (USD / EUR / GBP)</th>
                      <th className="px-5 py-3.5">Days / Week</th>
                      <th className="px-5 py-3.5">Popular Badge</th>
                      <th className="px-5 py-3.5">Active Status</th>
                      <th className="px-5 py-3.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {packages.map((pkg, idx) => {
                      const usd = pkg.priceUsd ?? pkg.price_usd ?? 0;
                      const eur = pkg.priceEur ?? pkg.price_eur ?? 0;
                      const gbp = pkg.priceGbp ?? pkg.price_gbp ?? 0;
                      const days = pkg.classesPerWeek || pkg.days_per_week || 'N/A';
                      const isPopular = pkg.popular ?? pkg.is_popular ?? false;
                      const isActive = pkg.active ?? pkg.is_active ?? true;

                      return (
                        <tr key={pkg.id || idx} className="hover:bg-slate-50/80 transition-colors">
                          <td className="px-5 py-4 whitespace-nowrap">
                            <div className="font-bold text-slate-900 flex items-center gap-2">
                              {pkg.name}
                            </div>
                            <div className="text-xs text-slate-500 mt-0.5">
                              {pkg.classesPerMonth || pkg.classes_per_month || ''}
                            </div>
                          </td>
                          <td className="px-5 py-4 whitespace-nowrap font-semibold text-slate-900">
                            ${usd} <span className="text-xs text-slate-400 font-normal">/ mo (€{eur} | £{gbp})</span>
                          </td>
                          <td className="px-5 py-4 whitespace-nowrap text-xs text-slate-600 font-medium">
                            {days}
                          </td>
                          <td className="px-5 py-4 whitespace-nowrap">
                            {isPopular ? (
                              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300">
                                <Star className="w-3 h-3 fill-amber-500 text-amber-500" /> Popular
                              </span>
                            ) : (
                              <span className="text-xs text-slate-400">—</span>
                            )}
                          </td>
                          <td className="px-5 py-4 whitespace-nowrap">
                            {isActive ? (
                              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
                                <CheckCircle className="w-3.5 h-3.5 text-emerald-600" /> Active
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-500 border border-slate-200">
                                <XCircle className="w-3.5 h-3.5 text-slate-400" /> Disabled
                              </span>
                            )}
                          </td>
                          <td className="px-5 py-4 whitespace-nowrap text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => openEditModal(pkg)}
                                className="p-1.5 text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                                title="Edit package"
                              >
                                <Edit2 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => setDeleteId(pkg.id)}
                                className="p-1.5 text-red-600 hover:text-red-800 bg-red-50 hover:bg-red-100 rounded-lg transition-colors border border-red-100"
                                title="Delete package"
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

        {/* Add/Edit Fee Package Modal */}
        {showModal && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-xl border border-slate-200 relative animate-fadeIn my-8">
              <button
                onClick={() => setShowModal(false)}
                className="absolute right-4 top-4 p-2 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3 border-b border-slate-100 pb-4 mb-5">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-700 font-bold flex items-center justify-center text-lg">
                  <CreditCard className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-bold font-serif text-slate-900">
                    {editingPackage ? 'Edit Fee Package' : 'Add New Fee Package'}
                  </h3>
                  <p className="text-xs text-slate-500">
                    Configure package rates, class frequency, and bullet features
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 text-sm">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Package Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 3 Days Package"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Price (USD $) *
                    </label>
                    <input
                      type="number"
                      required
                      min={0}
                      value={formData.price_usd}
                      onChange={(e) => setFormData({ ...formData, price_usd: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Price (EUR €)
                    </label>
                    <input
                      type="number"
                      min={0}
                      value={formData.price_eur}
                      onChange={(e) => setFormData({ ...formData, price_eur: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Price (GBP £)
                    </label>
                    <input
                      type="number"
                      min={0}
                      value={formData.price_gbp}
                      onChange={(e) => setFormData({ ...formData, price_gbp: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Days / Week
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 3 Days / Week"
                      value={formData.days_per_week}
                      onChange={(e) => setFormData({ ...formData, days_per_week: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Classes / Month
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 12 Classes / Month"
                      value={formData.classes_per_month}
                      onChange={(e) => setFormData({ ...formData, classes_per_month: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Class Duration
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 30 Mins / Class"
                      value={formData.duration_per_class}
                      onChange={(e) => setFormData({ ...formData, duration_per_class: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Package Features (Comma-Separated)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="3 Live 1-on-1 Classes per week, 30 Minutes per session, Certified Teacher, Free Trial"
                    value={formData.featuresInput}
                    onChange={(e) => setFormData({ ...formData, featuresInput: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 resize-none text-xs leading-relaxed"
                  />
                  <p className="text-[11px] text-slate-400 mt-1">
                    Separate features with commas. Each comma item becomes a bullet point.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-slate-100">
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-700">
                    <input
                      type="checkbox"
                      checked={formData.is_popular}
                      onChange={(e) => setFormData({ ...formData, is_popular: e.target.checked })}
                      className="w-4 h-4 text-amber-500 rounded focus:ring-amber-500 accent-amber-500"
                    />
                    <span>Highlight as Popular / Most Chosen</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-700">
                    <input
                      type="checkbox"
                      checked={formData.is_active}
                      onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                      className="w-4 h-4 text-amber-500 rounded focus:ring-amber-500 accent-amber-500"
                    />
                    <span>Package Active & Visible</span>
                  </label>
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={actionLoading}
                    className="px-5 py-2 rounded-xl text-xs font-bold text-slate-950 bg-amber-500 hover:bg-amber-400 shadow-md transition-colors"
                  >
                    {actionLoading ? 'Saving...' : editingPackage ? 'Update Package' : 'Create Package'}
                  </button>
                </div>
              </form>
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
                Delete Fee Package?
              </h3>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                Are you sure you want to delete this pricing package?
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
