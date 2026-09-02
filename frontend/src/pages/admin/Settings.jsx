import React, { useState, useEffect } from 'react';
import {
  Settings as SettingsIcon,
  Plus,
  Edit2,
  Trash2,
  CheckCircle,
  X,
  AlertTriangle,
  RefreshCw,
  Save,
  Globe,
  Sliders,
  Hash,
  Type,
  ToggleLeft,
  Code
} from 'lucide-react';
import AdminLayout from '../../components/AdminLayout';
import Loader from '../../components/Loader';
import { useAuth } from '../../context/AuthContext';
import { getSettings, updateSettings } from '../../api/settings';

export default function Settings() {
  const { token } = useAuth();
  const [settingsList, setSettingsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [deleteKey, setDeleteId] = useState(null);
  const [toast, setToast] = useState({ message: '', type: '' });

  // Form for new/edit setting
  const [newSetting, setNewSetting] = useState({
    key: '',
    value: '',
    type: 'text' // text, number, boolean, json
  });

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast({ message: '', type: '' }), 4000);
  };

  const detectType = (val) => {
    if (typeof val === 'boolean' || val === 'true' || val === 'false') return 'boolean';
    if (typeof val === 'number' || (!isNaN(val) && val !== '' && !val.includes('+'))) return 'number';
    if (typeof val === 'object') return 'json';
    if (typeof val === 'string' && (val.startsWith('{') || val.startsWith('['))) {
      try {
        JSON.parse(val);
        return 'json';
      } catch (e) {}
    }
    return 'text';
  };

  const fetchSettingsData = async () => {
    setLoading(true);
    try {
      const data = await getSettings();
      let parsedList = [];

      if (Array.isArray(data)) {
        parsedList = data.map((item) => ({
          key: item.setting_key || item.key,
          value: item.setting_value ?? item.value,
          type: item.setting_type || item.type || detectType(item.value)
        }));
      } else if (typeof data === 'object' && data !== null) {
        parsedList = Object.entries(data).map(([k, v]) => ({
          key: k,
          value: typeof v === 'object' ? JSON.stringify(v) : String(v),
          type: detectType(v)
        }));
      }

      setSettingsList(parsedList);
    } catch (err) {
      console.error('Failed to fetch settings:', err);
      showToast('Failed to load site settings.', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettingsData();
  }, []);

  const convertListToObject = (list) => {
    const obj = {};
    list.forEach((item) => {
      let val = item.value;
      if (item.type === 'number') {
        val = Number(item.value);
      } else if (item.type === 'boolean') {
        val = String(item.value).toLowerCase() === 'true';
      } else if (item.type === 'json') {
        try {
          val = JSON.parse(item.value);
        } catch (e) {
          val = item.value;
        }
      }
      obj[item.key] = val;
    });
    return obj;
  };

  const handleSaveAll = async (updatedList = settingsList) => {
    setSaving(true);
    try {
      const payload = convertListToObject(updatedList);
      await updateSettings(payload, token);
      showToast('Settings saved successfully!', 'success');
      setSettingsList(updatedList);
    } catch (err) {
      console.error('Failed to update settings:', err);
      showToast(err.message || 'Failed to update settings.', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleAddSetting = (e) => {
    e.preventDefault();
    if (!newSetting.key.trim()) {
      showToast('Setting key is required.', 'error');
      return;
    }

    const keyClean = newSetting.key.trim().replace(/\s+/g, '_');
    const existingIndex = settingsList.findIndex((s) => s.key === keyClean);

    let updated = [...settingsList];
    if (existingIndex !== -1) {
      updated[existingIndex] = {
        key: keyClean,
        value: newSetting.value,
        type: newSetting.type
      };
    } else {
      updated.push({
        key: keyClean,
        value: newSetting.value,
        type: newSetting.type
      });
    }

    setShowAddModal(false);
    setNewSetting({ key: '', value: '', type: 'text' });
    handleSaveAll(updated);
  };

  const handleOpenEdit = (item) => {
    setEditingItem(item);
    setNewSetting({
      key: item.key,
      value: String(item.value),
      type: item.type || 'text'
    });
    setShowAddModal(true);
  };

  const handleDelete = () => {
    if (!deleteKey) return;
    const updated = settingsList.filter((s) => s.key !== deleteKey);
    setDeleteId(null);
    handleSaveAll(updated);
  };

  const handleInlineChange = (key, newValue) => {
    const updated = settingsList.map((item) =>
      item.key === key ? { ...item, value: newValue } : item
    );
    setSettingsList(updated);
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'number':
        return <Hash className="w-3.5 h-3.5 text-blue-600" />;
      case 'boolean':
        return <ToggleLeft className="w-3.5 h-3.5 text-emerald-600" />;
      case 'json':
        return <Code className="w-3.5 h-3.5 text-purple-600" />;
      default:
        return <Type className="w-3.5 h-3.5 text-amber-600" />;
    }
  };

  return (
    <AdminLayout title="Site Settings & Configuration">
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

        {/* Header Control Bar */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-bold text-slate-900 font-serif text-lg">
              Academy General Configuration
            </h3>
            <p className="text-xs text-slate-500">
              Manage global contact email, WhatsApp support number, site titles, and custom key-value pairs
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchSettingsData}
              className="p-2.5 text-slate-500 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
              title="Refresh settings"
            >
              <RefreshCw className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                setEditingItem(null);
                setNewSetting({ key: '', value: '', type: 'text' });
                setShowAddModal(true);
              }}
              className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs rounded-xl transition-colors flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" /> Add Setting
            </button>

            <button
              onClick={() => handleSaveAll()}
              disabled={saving}
              className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5"
            >
              <Save className="w-4 h-4" /> {saving ? 'Saving...' : 'Save All Changes'}
            </button>
          </div>
        </div>

        {/* Settings Grid / List */}
        {loading ? (
          <Loader message="Loading site settings..." />
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              {settingsList.length === 0 ? (
                <div className="p-12 text-center text-slate-500">
                  <SettingsIcon className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                  <p className="font-semibold text-slate-700">No settings defined</p>
                  <p className="text-xs text-slate-400 mt-1">
                    Click "Add Setting" above to create custom site parameters.
                  </p>
                </div>
              ) : (
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-50 border-b border-slate-100 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    <tr>
                      <th className="px-5 py-3.5">Setting Key</th>
                      <th className="px-5 py-3.5">Data Type</th>
                      <th className="px-5 py-3.5">Setting Value</th>
                      <th className="px-5 py-3.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {settingsList.map((item) => {
                      return (
                        <tr key={item.key} className="hover:bg-slate-50/80 transition-colors">
                          <td className="px-5 py-4 whitespace-nowrap">
                            <span className="font-mono text-xs font-bold text-slate-900 bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200">
                              {item.key}
                            </span>
                          </td>
                          <td className="px-5 py-4 whitespace-nowrap">
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200 capitalize">
                              {getTypeIcon(item.type)} {item.type || 'text'}
                            </span>
                          </td>
                          <td className="px-5 py-4">
                            {item.type === 'boolean' ? (
                              <select
                                value={String(item.value)}
                                onChange={(e) => handleInlineChange(item.key, e.target.value)}
                                className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                              >
                                <option value="true">true</option>
                                <option value="false">false</option>
                              </select>
                            ) : (
                              <input
                                type={item.type === 'number' ? 'number' : 'text'}
                                value={item.value}
                                onChange={(e) => handleInlineChange(item.key, e.target.value)}
                                className="w-full max-w-lg px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                              />
                            )}
                          </td>
                          <td className="px-5 py-4 whitespace-nowrap text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => handleOpenEdit(item)}
                                className="p-1.5 text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                                title="Configure setting"
                              >
                                <Edit2 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => setDeleteId(item.key)}
                                className="p-1.5 text-red-600 hover:text-red-800 bg-red-50 hover:bg-red-100 rounded-lg transition-colors border border-red-100"
                                title="Delete setting"
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

        {/* Add / Edit Setting Modal */}
        {showAddModal && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-slate-200 relative animate-fadeIn">
              <button
                onClick={() => setShowAddModal(false)}
                className="absolute right-4 top-4 p-2 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3 border-b border-slate-100 pb-4 mb-4">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-700 font-bold flex items-center justify-center text-lg">
                  <Sliders className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold font-serif text-slate-900">
                    {editingItem ? 'Edit Setting Parameter' : 'Add New Setting Key'}
                  </h3>
                  <p className="text-xs text-slate-500">
                    Define key name, data type, and configuration value
                  </p>
                </div>
              </div>

              <form onSubmit={handleAddSetting} className="space-y-4 text-sm">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Setting Key Name *
                  </label>
                  <input
                    type="text"
                    required
                    disabled={!!editingItem}
                    placeholder="e.g. whatsappNumber or supportEmail"
                    value={newSetting.key}
                    onChange={(e) => setNewSetting({ ...newSetting, key: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono text-xs focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 disabled:opacity-60"
                  />
                  <p className="text-[11px] text-slate-400 mt-1">
                    Use camelCase or snake_case without spaces.
                  </p>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Data Type *
                  </label>
                  <select
                    value={newSetting.type}
                    onChange={(e) => setNewSetting({ ...newSetting, type: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                  >
                    <option value="text">Text (String)</option>
                    <option value="number">Number</option>
                    <option value="boolean">Boolean (True/False)</option>
                    <option value="json">JSON Object / Array</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Setting Value *
                  </label>
                  {newSetting.type === 'boolean' ? (
                    <select
                      value={newSetting.value}
                      onChange={(e) => setNewSetting({ ...newSetting, value: e.target.value })}
                      className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                    >
                      <option value="true">true</option>
                      <option value="false">false</option>
                    </select>
                  ) : newSetting.type === 'json' ? (
                    <textarea
                      rows={4}
                      required
                      placeholder='{"key": "value"}'
                      value={newSetting.value}
                      onChange={(e) => setNewSetting({ ...newSetting, value: e.target.value })}
                      className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono text-xs focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                    />
                  ) : (
                    <input
                      type={newSetting.type === 'number' ? 'number' : 'text'}
                      required
                      placeholder="Setting value..."
                      value={newSetting.value}
                      onChange={(e) => setNewSetting({ ...newSetting, value: e.target.value })}
                      className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                    />
                  )}
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl text-xs font-bold text-slate-950 bg-amber-500 hover:bg-amber-400 shadow-md transition-colors"
                  >
                    {editingItem ? 'Update Setting' : 'Add Setting'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {deleteKey && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-slate-200 animate-fadeIn text-center">
              <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 font-serif">
                Delete Setting Key?
              </h3>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                Are you sure you want to remove <span className="font-mono font-bold text-slate-800">{deleteKey}</span> from site settings?
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
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-red-600 hover:bg-red-700 transition-colors shadow-sm"
                >
                  Confirm Delete
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </AdminLayout>
  );
}
