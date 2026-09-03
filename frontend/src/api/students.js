const API_URL = import.meta.env.VITE_API_URL || 'https://quran-online-academy-production.up.railway.app/api';

// Convert a base64 data URL to a Blob
const base64ToBlob = (dataUrl) => {
  const arr = dataUrl.split(',');
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  const u8arr = new Uint8Array(bstr.length);
  for (let i = 0; i < bstr.length; i++) u8arr[i] = bstr.charCodeAt(i);
  return new Blob([u8arr], { type: mime });
};

// Upload an image to Cloudinary via /api/upload
const uploadImage = async (dataUrl) => {
  const fd = new FormData();
  fd.append('file', base64ToBlob(dataUrl), 'payment_screenshot.jpg');
  fd.append('folder', 'quran_academy/registrations');
  const res = await fetch(`${API_URL}/upload`, { method: 'POST', body: fd });
  const result = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(result.message || 'Failed to upload payment screenshot');
  }
  return result.url;
};

export const registerStudent = async (formData) => {
  const payload = { ...formData };

  // Upload base64 screenshot to Cloudinary first, then store the URL
  if (payload.payment_screenshot && payload.payment_screenshot.startsWith('data:')) {
    payload.payment_screenshot = await uploadImage(payload.payment_screenshot);
  }

  const res = await fetch(`${API_URL}/students/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  const result = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(result.message || 'Registration failed');
  }
  return result; // { success, message, data }
};

// Map a DB record to the field names the admin page expects
const mapStudent = (s) => ({
  ...s,
  id: s._id || s.id,
  studentName: s.studentName || s.student_name || s.name || '',
  fatherName: s.fatherName || s.father_name || '',
  packageName: s.packageName || s.package || '',
  courseTitle: s.courseTitle || s.course || '',
  paymentMethodName: s.paymentMethodName || s.payment_method_name || s.payment_method || '',
  paymentScreenshot: s.paymentScreenshot || s.payment_screenshot || '',
  createdDate: s.createdDate || (s.createdAt ? s.createdAt.split('T')[0] : ''),
});

export const getStudents = async (token) => {
  const res = await fetch(`${API_URL}/students`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const result = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(result.message || 'Failed to fetch students list');
  }
  return (result.data || []).map(mapStudent);
};

export const updateStudentStatus = async (id, status, token) => {
  const res = await fetch(`${API_URL}/students/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ status })
  });
  const result = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(result.message || 'Failed to update student status');
  }
  return result.data || result;
};

export const deleteStudent = async (id, token) => {
  const res = await fetch(`${API_URL}/students/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` }
  });
  const result = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(result.message || 'Failed to delete student');
  }
  return result;
};
