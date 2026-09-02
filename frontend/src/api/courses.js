const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const initialCourses = [
  {
    id: 'c1',
    title: 'Basic Qaidah',
    slug: 'basic-qaidah',
    arabicTitle: 'القاعدة النورانية',
    description: 'Learn Arabic letters, proper articulation (Makharij), joint letters, and basic pronunciation rules for absolute beginners and young children.',
    level: 'Beginner',
    duration: '3-6 Months',
    classesPerWeek: '3 Classes / Week',
    classDuration: '30 mins per class',
    active: true,
    image: 'https://images.unsplash.com/photo-1609599006353-e629aaabfeae?auto=format&fit=crop&q=80&w=800',
    curriculum: [
      'Arabic Alphabet recognition & phonetics',
      'Joint letters & vowel marks (Harakat)',
      'Tanween, Sukoon, and Madd rules',
      'Basic Quranic reading practice'
    ],
    instructor: 'Ustaz Abdul Muhaymin'
  },
  {
    id: 'c2',
    title: 'Quran Reading Nazra',
    slug: 'quran-reading-nazra',
    arabicTitle: 'قراءة القرآن نظرة',
    description: 'Fluent reading of the Holy Quran from Parah 1 to 30 with proper speed, rhythm, and Tajweed application.',
    level: 'Beginner',
    duration: '12+ Months',
    classesPerWeek: '3-5 Classes / Week',
    classDuration: '30 mins per class',
    active: true,
    image: 'https://images.unsplash.com/photo-1585036156171-384164a8c675?auto=format&fit=crop&q=80&w=800',
    curriculum: [
      'Fluent Quranic text reading',
      'Proper stops and pauses (Waqf rules)',
      'Pronunciation accuracy & fluency',
      'Daily recitation practice'
    ],
    instructor: 'Ustaz Abdul Muhaymin'
  },
  {
    id: 'c3',
    title: 'Quran Memorization Hifz',
    slug: 'quran-memorization-hifz',
    arabicTitle: 'حفظ القرآن الكريم',
    description: 'Systematic 1-on-1 memorization program with daily Sabaq, Sabqi, and Manzil revision schedules tailored to individual pace.',
    level: 'All Levels',
    duration: 'Varies (1-3 Years)',
    classesPerWeek: '5 Classes / Week',
    classDuration: '45 mins per class',
    active: true,
    image: 'https://images.unsplash.com/photo-1542816417-0983cbe33577?auto=format&fit=crop&q=80&w=800',
    curriculum: [
      'Sabaq (New daily lesson memorization)',
      'Sabqi (Recent revision of last 5-10 pages)',
      'Manzil (Systematic revision of completed Juz)',
      'Monthly Hifz evaluation & testing'
    ],
    instructor: 'Ustaz Abdul Muhaymin'
  },
  {
    id: 'c4',
    title: 'Tajweed Course',
    slug: 'tajweed-course',
    arabicTitle: 'دورة التجويد',
    description: 'Master the rules of Tajweed including Makharij, Sifat, Nun Sakinah, Meem Sakinah, and Madd for melodious, authentic recitation.',
    level: 'Intermediate',
    duration: '12+ Months',
    classesPerWeek: '3 Classes / Week',
    classDuration: '30 mins per class',
    active: true,
    image: 'https://images.unsplash.com/photo-1597983073493-88cd35cf03b0?auto=format&fit=crop&q=80&w=800',
    curriculum: [
      'Makharij Al-Huroof (Articulation points)',
      'Sifat Al-Huroof (Letter characteristics)',
      'Rules of Nun Sakinah, Tanween & Meem Sakinah',
      'Types of Madd (Elongation rules)'
    ],
    instructor: 'Certified Tajweed Scholar'
  },
  {
    id: 'c5',
    title: 'Quran Translation & Tafseer',
    slug: 'quran-translation-tafseer',
    arabicTitle: 'ترجمة القرآن وتفسيره',
    description: 'Understand the word-for-word translation, spiritual depth, historical context, and practical guidance of the Holy Quran.',
    level: 'Intermediate',
    duration: '12 Months',
    classesPerWeek: '3 Classes / Week',
    classDuration: '40 mins per class',
    active: true,
    image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&q=80&w=800',
    curriculum: [
      'Word-by-word Quranic translation',
      'Contextual background (Asbab al-Nuzul)',
      'Lessons for daily life and spiritual growth',
      'Key Quranic Arabic vocabulary'
    ],
    instructor: 'Ustaz Abdul Muhaymin'
  },
  {
    id: 'c6',
    title: 'Daily Duas & Kalimas',
    slug: 'daily-duas-kalimas',
    arabicTitle: 'الأدعية اليومية والكلمات',
    description: 'Learn 6 Kalimas, Masnoon Duas for daily routines (morning, evening, sleeping, eating), and basic Islamic manners.',
    level: 'Beginner',
    duration: '3 Months',
    classesPerWeek: '2 Classes / Week',
    classDuration: '30 mins per class',
    active: true,
    image: 'https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&q=80&w=800',
    curriculum: [
      'Six Kalimas with translation',
      'Essential daily Masnoon Duas',
      'Duas for Salah and Wudu',
      'Sunnah etiquette and manners'
    ],
    instructor: 'Female / Male Scholar'
  },
  {
    id: 'c7',
    title: 'Hadith Studies',
    slug: 'hadith-studies',
    arabicTitle: 'دراسة الأحاديث النبوية',
    description: 'Study selected sayings of Prophet Muhammad (ﷺ) focusing on moral character, worship, social ethics, and spiritual excellence.',
    level: 'All Levels',
    duration: '6 Months',
    classesPerWeek: '2 Classes / Week',
    classDuration: '40 mins per class',
    active: true,
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=800',
    curriculum: [
      'An-Nawawi 40 Hadith study',
      'Understanding prophetic guidance',
      'Ethics, manners & character building',
      'Practical implementation in daily life'
    ],
    instructor: 'Ustaz Abdul Muhaymin'
  },
  {
    id: 'c8',
    title: 'Islamic Studies',
    slug: 'islamic-studies',
    arabicTitle: 'الدراسات الإسلامية',
    description: 'Comprehensive Islamic curriculum covering Aqeedah (beliefs), Fiqh of Taharah and Salah, Seerah of the Prophet (ﷺ), and Islamic history.',
    level: 'All Levels',
    duration: '6 Months',
    classesPerWeek: '2 Classes / Week',
    classDuration: '45 mins per class',
    active: true,
    image: 'https://images.unsplash.com/photo-1542816417-0983cbe33577?auto=format&fit=crop&q=80&w=800',
    curriculum: [
      'Fundamentals of Islamic Aqeedah',
      'Fiqh of Wudu, Ghusl, and Salah',
      'Seerah of Prophet Muhammad (ﷺ)',
      'Rights of parents, neighbors, and society'
    ],
    instructor: 'Ustaz Abdul Muhaymin'
  }
];

const getStoredCourses = () => {
  const data = localStorage.getItem('app_courses');
  if (data) return JSON.parse(data);
  localStorage.setItem('app_courses', JSON.stringify(initialCourses));
  return initialCourses;
};

const saveStoredCourses = (courses) => {
  localStorage.setItem('app_courses', JSON.stringify(courses));
};

export const getCourses = async () => {
  try {
    const res = await fetch(`${API_URL}/courses`);
    if (!res.ok) throw new Error('Failed to fetch courses');
    return await res.json();
  } catch (err) {
    return getStoredCourses();
  }
};

export const getCourseById = async (id) => {
  try {
    const res = await fetch(`${API_URL}/courses/${id}`);
    if (!res.ok) throw new Error('Failed to fetch course detail');
    return await res.json();
  } catch (err) {
    const courses = getStoredCourses();
    const course = courses.find(c => c.id === id || c.slug === id);
    if (!course) throw new Error('Course not found');
    return course;
  }
};

export const createCourse = async (data, token) => {
  try {
    const res = await fetch(`${API_URL}/courses`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error('Failed to create course');
    return await res.json();
  } catch (err) {
    const courses = getStoredCourses();
    const newCourse = { ...data, id: 'c_' + Date.now(), active: data.active ?? true };
    courses.unshift(newCourse);
    saveStoredCourses(courses);
    return newCourse;
  }
};

export const updateCourse = async (id, data, token) => {
  try {
    const res = await fetch(`${API_URL}/courses/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error('Failed to update course');
    return await res.json();
  } catch (err) {
    const courses = getStoredCourses();
    const idx = courses.findIndex(c => c.id === id);
    if (idx !== -1) {
      courses[idx] = { ...courses[idx], ...data };
      saveStoredCourses(courses);
      return courses[idx];
    }
    throw new Error('Course not found');
  }
};

export const deleteCourse = async (id, token) => {
  try {
    const res = await fetch(`${API_URL}/courses/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    });
    if (!res.ok) throw new Error('Failed to delete course');
    return await res.json();
  } catch (err) {
    let courses = getStoredCourses();
    courses = courses.filter(c => c.id !== id);
    saveStoredCourses(courses);
    return { success: true };
  }
};
