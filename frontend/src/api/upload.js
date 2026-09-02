const API_URL = import.meta.env.VITE_API_URL || 'https://quran-online-academy-production.up.railway.app/api';

export const uploadFile = async (file, token) => {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const headers = {};
    if (token) headers['Authorization'] = `Bearer ${token}`;

    const res = await fetch(`${API_URL}/upload`, {
      method: 'POST',
      headers,
      body: formData
    });

    if (!res.ok) throw new Error('Failed to upload file');
    const data = await res.json();
    return data.url;
  } catch (err) {
    // Return Object URL for frontend preview in fallback mode
    return URL.createObjectURL(file);
  }
};
