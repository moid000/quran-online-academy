const API_URL = import.meta.env.VITE_API_URL || 'https://quran-online-academy-production.up.railway.app/api';

const initialPackages = [
  {
    id: 'p1',
    name: '3 Days Package',
    priceUsd: 20,
    priceEur: 18,
    priceGbp: 15,
    pricePkr: 5600,
    classesPerWeek: '3 Days / Week',
    classesPerMonth: '12 Classes / Month',
    classDuration: '30 Mins / Class',
    popular: false,
    features: [
      '3 Live 1-on-1 Classes per week (12/mo)',
      '30 Minutes per interactive session',
      'Certified Male or Female Educator',
      'Flexible Class Timings (24/7)',
      'Free Learning Materials & PDFs',
      'Progress Tracking & Monthly Report',
      'Free 3-Day Trial Class'
    ]
  },
  {
    id: 'p2',
    name: '4 Days Package',
    priceUsd: 30,
    priceEur: 27,
    priceGbp: 23,
    pricePkr: 8400,
    classesPerWeek: '4 Days / Week',
    classesPerMonth: '16 Classes / Month',
    classDuration: '30 Mins / Class',
    popular: false,
    features: [
      '4 Live 1-on-1 Classes per week (16/mo)',
      '30 Minutes per interactive session',
      'Dedicated Expert Quran Scholar',
      'Priority Scheduling & Rescheduling',
      'Weekly Tajweed & Recitation Assessment',
      'Free Digital Learning Workbook',
      '24/7 WhatsApp Support'
    ]
  },
  {
    id: 'p3',
    name: '5 Days Package',
    priceUsd: 40,
    priceEur: 36,
    priceGbp: 31,
    pricePkr: 11200,
    classesPerWeek: '5 Days / Week',
    classesPerMonth: '20 Classes / Month',
    classDuration: '30 Mins / Class',
    popular: true,
    features: [
      '5 Live 1-on-1 Classes per week (20/mo)',
      '30 Minutes per interactive session',
      'Accelerated Learning & Hifz Path',
      'Top-Tier Certified Quran Educator',
      'Customized Hifz / Tajweed Tracker',
      'Completion Certificate & Ijazah Path',
      'Priority 24/7 Support'
    ]
  },
  {
    id: 'p4',
    name: 'Weekend Only Package',
    priceUsd: 30,
    priceEur: 27,
    priceGbp: 23,
    pricePkr: 8400,
    classesPerWeek: '2 Days / Week (Sat & Sun)',
    classesPerMonth: '8 Classes / Month',
    classDuration: '45 Mins / Class',
    popular: false,
    features: [
      '2 Weekend Classes per week (Sat & Sun)',
      '45 Minutes extended session',
      'Perfect for Working Professionals & Students',
      'Male or Female Certified Teacher',
      'Comprehensive Tajweed & Duas Coverage',
      'Recorded Sessions & Practice Audios',
      'Free 3-Day Trial Class'
    ]
  }
];

const getStoredPackages = () => {
  const data = localStorage.getItem('app_fee_packages_v2');
  if (data) return JSON.parse(data);
  localStorage.setItem('app_fee_packages_v2', JSON.stringify(initialPackages));
  return initialPackages;
};

const saveStoredPackages = (pkgs) => {
  localStorage.setItem('app_fee_packages_v2', JSON.stringify(pkgs));
};

export const getFeePackages = async () => {
  try {
    const res = await fetch(`${API_URL}/fee-packages`);
    if (!res.ok) throw new Error('Failed to fetch fee packages');
    return await res.json();
  } catch (err) {
    return getStoredPackages();
  }
};

export const createFeePackage = async (data, token) => {
  try {
    const res = await fetch(`${API_URL}/fee-packages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error('Failed to create fee package');
    return await res.json();
  } catch (err) {
    const packages = getStoredPackages();
    const newPkg = { ...data, id: 'p_' + Date.now() };
    packages.push(newPkg);
    saveStoredPackages(packages);
    return newPkg;
  }
};

export const updateFeePackage = async (id, data, token) => {
  try {
    const res = await fetch(`${API_URL}/fee-packages/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error('Failed to update fee package');
    return await res.json();
  } catch (err) {
    const packages = getStoredPackages();
    const idx = packages.findIndex(p => p.id === id);
    if (idx !== -1) {
      packages[idx] = { ...packages[idx], ...data };
      saveStoredPackages(packages);
      return packages[idx];
    }
    throw new Error('Package not found');
  }
};

export const deleteFeePackage = async (id, token) => {
  try {
    const res = await fetch(`${API_URL}/fee-packages/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    });
    if (!res.ok) throw new Error('Failed to delete package');
    return await res.json();
  } catch (err) {
    let packages = getStoredPackages();
    packages = packages.filter(p => p.id !== id);
    saveStoredPackages(packages);
    return { success: true };
  }
};
