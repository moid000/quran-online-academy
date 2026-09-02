const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const initialMessages = [
  {
    id: 'm1',
    name: 'Zayd Merchant',
    email: 'zayd.m@gmail.com',
    subject: 'Inquiry about weekend trial classes',
    message: 'Assalamu Alaikum, I would like to register my two daughters (ages 7 and 10) for weekend Noorani Qaida and Tajweed classes. What time slots are available in EST time zone?',
    date: '2026-08-30 14:20',
    read: false
  },
  {
    id: 'm2',
    name: 'Aisha Abdullah',
    email: 'aisha.a@yahoo.com',
    subject: 'Adult Female Quran Teacher Request',
    message: 'Salam, do you have female scholars for adult sisters living in London for Tajweed correction? JazakAllah Khair.',
    date: '2026-09-01 09:15',
    read: true
  }
];

const getStoredMessages = () => {
  const data = localStorage.getItem('app_messages');
  if (data) return JSON.parse(data);
  localStorage.setItem('app_messages', JSON.stringify(initialMessages));
  return initialMessages;
};

const saveStoredMessages = (msgs) => {
  localStorage.setItem('app_messages', JSON.stringify(msgs));
};

export const sendContactMessage = async (messageData) => {
  try {
    const res = await fetch(`${API_URL}/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(messageData)
    });
    if (!res.ok) throw new Error('Failed to send contact message');
    return await res.json();
  } catch (err) {
    const msgs = getStoredMessages();
    const newMsg = {
      ...messageData,
      id: 'm_' + Date.now(),
      date: new Date().toISOString().slice(0, 16).replace('T', ' '),
      read: false
    };
    msgs.unshift(newMsg);
    saveStoredMessages(msgs);
    return { success: true, message: 'Message sent successfully! We will contact you soon.' };
  }
};

export const getContactMessages = async (token) => {
  try {
    const res = await fetch(`${API_URL}/contact`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (!res.ok) throw new Error('Failed to fetch contact messages');
    return await res.json();
  } catch (err) {
    return getStoredMessages();
  }
};

export const markMessageRead = async (id, token) => {
  try {
    const res = await fetch(`${API_URL}/contact/${id}/read`, {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${token}` }
    });
    if (!res.ok) throw new Error('Failed to mark message as read');
    return await res.json();
  } catch (err) {
    const msgs = getStoredMessages();
    const idx = msgs.findIndex(m => m.id === id);
    if (idx !== -1) {
      msgs[idx].read = true;
      saveStoredMessages(msgs);
    }
    return { success: true };
  }
};

export const deleteMessage = async (id, token) => {
  try {
    const res = await fetch(`${API_URL}/contact/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    });
    if (!res.ok) throw new Error('Failed to delete message');
    return await res.json();
  } catch (err) {
    let msgs = getStoredMessages();
    msgs = msgs.filter(m => m.id !== id);
    saveStoredMessages(msgs);
    return { success: true };
  }
};
