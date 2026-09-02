const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const initialMethods = [
  {
    id: 'pm1',
    name: 'Bank Alfalah',
    type: 'Bank Transfer',
    accountName: 'QURAN ONLINE ACADEMIA',
    accountNumber: '0317747928601',
    bankName: 'Bank Alfalah Islamic',
    iban: 'PK36ALFH0317747928601',
    swiftCode: 'ALFHPKKA',
    instructions: 'Transfer fee to Bank Alfalah account and upload payment receipt screenshot during registration.',
    active: true
  },
  {
    id: 'pm2',
    name: 'JazzCash',
    type: 'Mobile Wallet',
    accountName: 'Ustaz Abdul Muhaymin',
    accountNumber: '0317 7479 286',
    bankName: 'JazzCash Pakistan',
    instructions: 'Send money via JazzCash app to 0317 7479 286 and upload the transaction screenshot.',
    active: true
  },
  {
    id: 'pm3',
    name: 'Western Union',
    type: 'International Remittance',
    accountName: 'Ustaz Abdul Muhaymin',
    accountNumber: 'Bahawalpur, Punjab, Pakistan',
    bankName: 'Western Union / Remitly / Wise',
    instructions: 'Send international transfer to Ustaz Abdul Muhaymin in Bahawalpur, Pakistan and provide MTCN / Transfer Receipt.',
    active: true
  }
];

const getStoredMethods = () => {
  const data = localStorage.getItem('app_payment_methods');
  if (data) return JSON.parse(data);
  localStorage.setItem('app_payment_methods', JSON.stringify(initialMethods));
  return initialMethods;
};

const saveStoredMethods = (methods) => {
  localStorage.setItem('app_payment_methods', JSON.stringify(methods));
};

export const getPaymentMethods = async () => {
  try {
    const res = await fetch(`${API_URL}/payment-methods`);
    if (!res.ok) throw new Error('Failed to fetch payment methods');
    return await res.json();
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
