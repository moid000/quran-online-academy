const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const initialStudents = [
  {
    id: 's1',
    studentName: 'Ibrahim Ahmed',
    fatherName: 'Tariq Ahmed',
    email: 'tariq.ahmed@example.com',
    whatsapp: '+1 555 234 5678',
    country: 'United States',
    courseId: 'c2',
    courseTitle: 'Quran Recitation with Tajweed',
    packageId: 'p2',
    packageName: 'Standard Intensive',
    paymentMethodId: 'pm1',
    paymentMethodName: 'Bank Transfer (Wise / Wire)',
    paymentScreenshot: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=400',
    status: 'Pending',
    createdDate: '2026-09-01'
  },
  {
    id: 's2',
    studentName: 'Fatima Siddiqui',
    fatherName: 'Usman Siddiqui',
    email: 'usman.sid@example.com',
    whatsapp: '+44 7911 123456',
    country: 'United Kingdom',
    courseId: 'c1',
    courseTitle: 'Noorani Qaida for Beginners',
    packageId: 'p1',
    packageName: 'Basic Starter',
    paymentMethodId: 'pm2',
    paymentMethodName: 'JazzCash / EasyPaisa',
    paymentScreenshot: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=400',
    status: 'Approved',
    createdDate: '2026-08-25'
  },
  {
    id: 's3',
    studentName: 'Youssef Khan',
    fatherName: 'Kamran Khan',
    email: 'kkhan@example.ca',
    whatsapp: '+1 416 987 6543',
    country: 'Canada',
    courseId: 'c3',
    courseTitle: 'Quran Memorization (Hifz)',
    packageId: 'p3',
    packageName: 'Premium Hifz & Tajweed',
    paymentMethodId: 'pm3',
    paymentMethodName: 'PayPal / Credit Card',
    paymentScreenshot: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=400',
    status: 'Approved',
    createdDate: '2026-08-20'
  }
];

const getStoredStudents = () => {
  const data = localStorage.getItem('app_students');
  if (data) return JSON.parse(data);
  localStorage.setItem('app_students', JSON.stringify(initialStudents));
  return initialStudents;
};

const saveStoredStudents = (students) => {
  localStorage.setItem('app_students', JSON.stringify(students));
};

export const registerStudent = async (formData) => {
  try {
    const res = await fetch(`${API_URL}/students/register`, {
      method: 'POST',
      body: formData // FormData for file + text fields
    });
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.message || 'Registration failed');
    }
    return await res.json();
  } catch (err) {
    const students = getStoredStudents();
    
    // Extract values from FormData or JSON object
    let studentObj = {};
    if (formData instanceof FormData) {
      for (const [key, value] of formData.entries()) {
        if (key !== 'paymentScreenshot') {
          studentObj[key] = value;
        }
      }
      studentObj.paymentScreenshot = 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=400';
    } else {
      studentObj = { ...formData };
    }

    const newStudent = {
      ...studentObj,
      id: 's_' + Date.now(),
      status: 'Pending',
      createdDate: new Date().toISOString().split('T')[0]
    };

    students.unshift(newStudent);
    saveStoredStudents(students);
    return { success: true, message: 'Registration submitted successfully! Our team will verify your payment and contact you on WhatsApp shortly.', student: newStudent };
  }
};

export const getStudents = async (token) => {
  try {
    const res = await fetch(`${API_URL}/students`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (!res.ok) throw new Error('Failed to fetch students list');
    return await res.json();
  } catch (err) {
    return getStoredStudents();
  }
};

export const updateStudentStatus = async (id, status, token) => {
  try {
    const res = await fetch(`${API_URL}/students/${id}/status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ status })
    });
    if (!res.ok) throw new Error('Failed to update student status');
    return await res.json();
  } catch (err) {
    const students = getStoredStudents();
    const idx = students.findIndex(s => s.id === id);
    if (idx !== -1) {
      students[idx].status = status;
      saveStoredStudents(students);
      return students[idx];
    }
    throw new Error('Student not found');
  }
};

export const deleteStudent = async (id, token) => {
  try {
    const res = await fetch(`${API_URL}/students/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    });
    if (!res.ok) throw new Error('Failed to delete student');
    return await res.json();
  } catch (err) {
    let students = getStoredStudents();
    students = students.filter(s => s.id !== id);
    saveStoredStudents(students);
    return { success: true };
  }
};
