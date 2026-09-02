const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const initialSettings = {
  siteName: 'QURAN ONLINE ACADEMIA',
  tagline: 'Learn From Expert Teachers - Authentic Quranic Education Worldwide',
  supportEmail: 'quranonlineacademia@gmail.com',
  whatsappNumber: '+92 317 7479 286',
  contactAddress: 'Bahawalpur, Pakistan',
  founderName: 'Ustaz Abdul Muhaymin',
  facebookUrl: 'https://facebook.com/quranonlineacademia',
  instagramUrl: 'https://instagram.com/quranonlineacademia',
  youtubeUrl: 'https://youtube.com/quranonlineacademia',
  freeTrialDays: '3 Days',
  currencyDefault: 'USD ($)'
};

const getStoredSettings = () => {
  const data = localStorage.getItem('app_settings_v2');
  if (data) return JSON.parse(data);
  localStorage.setItem('app_settings_v2', JSON.stringify(initialSettings));
  return initialSettings;
};

const saveStoredSettings = (settings) => {
  localStorage.setItem('app_settings_v2', JSON.stringify(settings));
};

export const getSettings = async () => {
  try {
    const res = await fetch(`${API_URL}/settings`);
    if (!res.ok) throw new Error('Failed to fetch settings');
    return await res.json();
  } catch (err) {
    return getStoredSettings();
  }
};

export const updateSettings = async (settingsData, token) => {
  try {
    const res = await fetch(`${API_URL}/settings`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(settingsData)
    });
    if (!res.ok) throw new Error('Failed to update settings');
    return await res.json();
  } catch (err) {
    const current = getStoredSettings();
    const updated = { ...current, ...settingsData };
    saveStoredSettings(updated);
    return updated;
  }
};
