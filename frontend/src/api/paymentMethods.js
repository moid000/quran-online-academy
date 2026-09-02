const API_URL = import.meta.env.VITE_API_URL || 'https://quran-online-academy-production.up.railway.app/api';

const initialMethods = [
  {
    id: 'pm1',
    name: 'Bank Alfalah',
    type: 'Bank Transfer',
    accountName: 'ABDUL MUHAYMIN',
    accountNumber: 'PK43ALFH5563005002138756',
    instructions: 'Transfer the amount to the account and upload the receipt screenshot.',
    active: true
  },
  {
    id: 'pm2',
    name: 'JazzCash',
    type: 'Mobile Wallet',
    accountName: 'ABDUL MUHAYMIN',
    accountNumber: '03000789238',
    instructions: 'Send the amount via JazzCash and upload the transaction screenshot.',
    active: true
  },
  {
    id: 'pm3',
    name: 'Western Union',
    type: 'International Remittance',
    accountName: 'ABDUL MUHAYMIN',
    accountNumber: 'CNIC: 42101-1586731-9',
    instructions: 'Send via Western Union and share the MTCN number.',
    active: true
  }
];

const getStoredMethods = () => {
  const data = localStorage.getItem('app_payment_methods_v2');
  if (data) return JSON.parse(data);
  localStorage.setItem('app_payment_methods_v2', JSON.stringify(initialMethods));
  return initialMethods;
};

const saveStoredMethods = (methods) => {
  localStorage.setItem('app_payment_methods_v2', JSON.stringify(methods));
};

export const getPaymentMethods = async () => {
  try {
    const res = await fetch(`${API_URL}/payment-methods`);
    if (!res.ok) throw new Error('Failed to fetch payment methods');
    const result = await res.json();
    return result.data || result;
  } catch (err) {
    return getStoredMethods();
  }
};

export const createPaymentMethod = async (data, token) => {
  try {
    const res = await fetch(`${API_URL}/payment-methods`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error('Failed to create payment method');
    return await res.json();
  } catch (err) {
    const methods = getStoredMethods();
    const newMethod = { ...data, id: 'pm_' + Date.now(), active: data.active ?? true };
    methods.push(newMethod);
    saveStoredMethods(methods);
    return newMethod;
  }
};

export const updatePaymentMethod = async (id, data, token) => {
  try {
    const res = await fetch(`${API_URL}/payment-methods/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error('Failed to update payment method');
    return await res.json();
  } catch (err) {
    const methods = getStoredMethods();
    const idx = methods.findIndex(m => m.id === id);
    if (idx !== -1) {
      methods[idx] = { ...methods[idx], ...data };
      saveStoredMethods(methods);
      return methods[idx];
    }
    throw new Error('Payment method not found');
  }
};

export const deletePaymentMethod = async (id, token) => {
  try {
    const res = await fetch(`${API_URL}/payment-methods/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    });
    if (!res.ok) throw new Error('Failed to delete payment method');
    return await res.json();
  } catch (err) {
    let methods = getStoredMethods();
    methods = methods.filter(m => m.id !== id);
    saveStoredMethods(methods);
    return { success: true };
  }
};
