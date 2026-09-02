const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const initialCourses = [
  {
    id: 'c1',
    title: 'Basic Qaidah',
    slug: 'basic-qaidah',
    description: 'The foundation of Quran reading. Learn Arabic alphabets, pronunciation, and basic reading rules. Perfect for beginners of all ages.',
    level: 'Beginner',
    duration: '3-6 Months',
    image_url: 'https://myqurantutor.com/wp-content/uploads/2025/08/Noorani-Qaida-Course.webp',
    features: ['Arabic Alphabet recognition & phonetics', 'Joint letters & vowel marks (Harakat)', 'Tanween, Sukoon, and Madd rules', 'Basic Quranic reading practice'],
    is_active: true,
    order: 1
  },
  {
    id: 'c2',
    title: 'Quran Reading (Nazra)',
    slug: 'quran-reading-nazra',
    description: 'Learn to read the Holy Quran with proper pronunciation and fluency. This course is designed for beginners who want to start their Quranic journey with confidence.',
    level: 'Beginner',
    duration: '12+ Months',
    image_url: 'https://quraninuniverse.com/wp-content/uploads/2025/09/Gemini_Generated_Image_m8ji7bm8ji7bm8ji.png',
    features: ['Fluent Quranic text reading', 'Proper stops and pauses (Waqf rules)', 'Pronunciation accuracy & fluency', 'Daily recitation practice'],
    is_active: true,
    order: 2
  },
  {
    id: 'c3',
    title: 'Quran Memorization (Hifz)',
    slug: 'quran-memorization-hifz',
    description: 'Comprehensive memorization program with proven retention techniques and regular revision schedules.',
    level: 'All Levels',
    duration: 'Varies',
    image_url: 'https://www.quranreadinghelp.com/blog/wp-content/uploads/2024/08/How-to-memorize-holy-quran-1.webp',
    features: ['Sabaq (New daily lesson memorization)', 'Sabqi (Recent revision of last 5-10 pages)', 'Manzil (Systematic revision of completed Juz)', 'Monthly Hifz evaluation & testing'],
    is_active: true,
    order: 3
  },
  {
    id: 'c4',
    title: 'Tajweed Course',
    slug: 'tajweed-course',
    description: 'Perfect your Quran recitation with advanced Tajweed rules, Makhaarij, and beautiful recitation techniques.',
    level: 'Intermediate',
    duration: '12+ Months',
    image_url: 'https://tabarakacademy.com/wp-content/uploads/2024/10/Untitled-design-1.webp',
    features: ['Makharij Al-Huroof (Articulation points)', 'Sifat Al-Huroof (Letter characteristics)', 'Rules of Nun Sakinah, Tanween & Meem Sakinah', 'Types of Madd (Elongation rules)'],
    is_active: true,
    order: 4
  },
  {
    id: 'c5',
    title: 'Quran Translation',
    slug: 'quran-translation',
    description: 'Understand the meaning and wisdom of the Holy Quran with word-by-word translation and context.',
    level: 'Intermediate',
    duration: '12+ Months',
    image_url: 'https://esmrypzwo66.exactdn.com/wp-content/uploads/2022/04/3-1.png?strip=all',
    features: ['Word-by-word Quranic translation', 'Contextual background (Asbab al-Nuzul)', 'Lessons for daily life and spiritual growth', 'Key Quranic Arabic vocabulary'],
    is_active: true,
    order: 5
  },
  {
    id: 'c6',
    title: 'Daily Duas & Kalimas',
    slug: 'daily-duas-kalimas',
    description: 'Learn essential daily supplications and the six Kalimas with proper pronunciation and meaning.',
    level: 'Beginner',
    duration: '1-2 Months',
    image_url: 'https://theonlinequranlearning.com/wp-content/uploads/2024/11/dua.jpg',
    features: ['Six Kalimas with translation', 'Essential daily Masnoon Duas', 'Duas for Salah and Wudu', 'Sunnah etiquette and manners'],
    is_active: true,
    order: 6
  },
  {
    id: 'c7',
    title: 'Hadith Studies',
    slug: 'hadith-studies',
    description: 'Study authentic Hadiths of Prophet Muhammad (PBUH) with understanding and practical application.',
    level: 'Intermediate',
    duration: '6+ Months',
    image_url: 'https://teacherofquran.com/wp-content/uploads/2021/01/online-hadith-course.jpg',
    features: ['An-Nawawi 40 Hadith study', 'Understanding prophetic guidance', 'Ethics, manners & character building', 'Practical implementation in daily life'],
    is_active: true,
    order: 7
  },
  {
    id: 'c8',
    title: 'Islamic Studies',
    slug: 'islamic-studies',
    description: 'Comprehensive Islamic education covering beliefs, practices, history, and ethics.',
    level: 'All Levels',
    duration: 'Ongoing',
    image_url: 'https://alquranworld.com/wp-content/uploads/2023/09/Slides-4-w1.png',
    features: ['Fundamentals of Islamic Aqeedah', 'Fiqh of Wudu, Ghusl, and Salah', 'Seerah of Prophet Muhammad (PBUH)', 'Rights of parents, neighbors, and society'],
    is_active: true,
    order: 8
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
    const newCourse = { ...data, id: 'c_' + Date.now(), is_active: data.is_active ?? true };
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
