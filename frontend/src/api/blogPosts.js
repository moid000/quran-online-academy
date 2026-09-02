const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const initialPosts = [
  {
    id: 'b1',
    title: 'The Spiritual Benefits of Daily Quran Recitation',
    slug: 'spiritual-benefits-daily-quran-recitation',
    category: 'Spiritual',
    excerpt: 'Discover how establishing a daily relationship with the Book of Allah brings tranquility (Sakinah), light, and guidance into your household.',
    content: `Reciting the Holy Quran daily transforms the spiritual atmosphere of a believer's heart and home. 

### 1. Inner Peace and Tranquility (Sakinah)
Allah SWT says in Surah Ar-Ra'd (13:28): *"Unquestionably, by the remembrance of Allah hearts are assured."* Regular recitation serves as a divine balm for anxiety and stress in modern life.

### 2. Illumination of the Heart
The Quran is described as 'Nur' (Light). Engaging with its verses daily cleanses the heart from spiritual rust and brings clarity to moral decision-making.

### 3. Intercession on the Day of Judgment
Prophet Muhammad (ﷺ) said: *"Read the Quran, for it will come as an intercessor for its companions on the Day of Resurrection."* (Sahih Muslim)

### Practical Tips to Maintain Consistency
- Set a fixed time right after Fajr or Maghrib.
- Aim for quality and reflection rather than speed.
- Listen to certified Qaris when commuting.`,
    author: 'Sheikh Omar Farooq',
    date: '2026-08-15',
    published: true,
    image: 'https://images.unsplash.com/photo-1609599006353-e629aaabfeae?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'b2',
    title: '5 Essential Rules of Tajweed Every Beginner Must Know',
    slug: '5-essential-rules-of-tajweed-for-beginners',
    category: 'Tajweed',
    excerpt: 'An easy-to-understand breakdown of Makharij, Nun Sakinah rules, and elongation (Madd) for flawless Quranic reading.',
    content: `Tajweed means 'beautification' and 'improvement'. In Quranic sciences, Tajweed is giving every letter its right (Haqq) and due properties.

### 1. Makharij Al-Huroof (Articulation Points)
Knowing exactly where each letter originates—throat, tongue, lips, or nasal cavity—is the foundation of correct pronunciation.

### 2. Izhar (Clarity)
When Nun Sakinah or Tanween is followed by one of the 6 throat letters (Throat letters: Hamzah, Ha, 'Ayn, Hha, Ghayn, Kha), the Nun sound is pronounced clearly without nasalization (Ghunnah).

### 3. Idgham (Merging)
When Nun Sakinah meets letters of Yarmaloon (ي ، ر ، م ، ل ، و ، ن), the sound merges seamlessly.

### 4. Iqlab (Conversion)
When Nun Sakinah precedes the letter Ba (ب), the Nun turns into a Meem (م) sound with Ghunnah.

### 5. Ikhfa (Concealment)
Concealing the sound of Nun when followed by the remaining 15 letters with a light nasal tone.`,
    author: 'Ustadha Fatima Zahra',
    date: '2026-08-28',
    published: true,
    image: 'https://images.unsplash.com/photo-1585036156171-384164a8c675?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'b3',
    title: 'How Online Quran Classes Bridge the Distance for Global Families',
    slug: 'online-quran-classes-for-global-families',
    category: 'Education',
    excerpt: 'Explore how modern 1-on-1 virtual classrooms help Muslim diaspora communities keep their children connected to authentic Islamic education.',
    content: `Living in non-Muslim majority countries often presents unique challenges for parents seeking high-quality Islamic and Quranic instruction for their kids.

### 1. Access to Top Arabic Tutors worldwide
Online academies enable students in the USA, UK, Canada, and Australia to connect directly with native Arab and Al-Azhar certified scholars from the comfort of home.

### 2. Flexible Scheduling for Busy School Timings
Classes can be scheduled around school homework, sports, and weekend activities without stressful commuting time.

### 3. Customized 1-on-1 Attention
Unlike large group weekend madrasas, 1-on-1 online classes allow the teacher to adapt completely to the child's learning speed and confidence level.`,
    author: 'Dr. Tariq Al-Hashimi',
    date: '2026-09-01',
    published: true,
    image: 'https://images.unsplash.com/photo-1542816417-0983cbe33577?auto=format&fit=crop&q=80&w=800'
  }
];

const getStoredPosts = () => {
  const data = localStorage.getItem('app_blog_posts');
  if (data) return JSON.parse(data);
  localStorage.setItem('app_blog_posts', JSON.stringify(initialPosts));
  return initialPosts;
};

const saveStoredPosts = (posts) => {
  localStorage.setItem('app_blog_posts', JSON.stringify(posts));
};

export const getBlogPosts = async () => {
  try {
    const res = await fetch(`${API_URL}/blog-posts`);
    if (!res.ok) throw new Error('Failed to fetch blog posts');
    return await res.json();
  } catch (err) {
    return getStoredPosts();
  }
};

export const getBlogPostBySlug = async (slug) => {
  try {
    const res = await fetch(`${API_URL}/blog-posts/${slug}`);
    if (!res.ok) throw new Error('Failed to fetch blog post');
    return await res.json();
  } catch (err) {
    const posts = getStoredPosts();
    const post = posts.find(p => p.slug === slug || p.id === slug);
    if (!post) throw new Error('Blog post not found');
    return post;
  }
};

export const createBlogPost = async (data, token) => {
  try {
    const res = await fetch(`${API_URL}/blog-posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error('Failed to create blog post');
    return await res.json();
  } catch (err) {
    const posts = getStoredPosts();
    const newPost = {
      ...data,
      id: 'b_' + Date.now(),
      date: new Date().toISOString().split('T')[0],
      published: data.published ?? true
    };
    posts.unshift(newPost);
    saveStoredPosts(posts);
    return newPost;
  }
};

export const updateBlogPost = async (id, data, token) => {
  try {
    const res = await fetch(`${API_URL}/blog-posts/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error('Failed to update blog post');
    return await res.json();
  } catch (err) {
    const posts = getStoredPosts();
    const idx = posts.findIndex(p => p.id === id);
    if (idx !== -1) {
      posts[idx] = { ...posts[idx], ...data };
      saveStoredPosts(posts);
      return posts[idx];
    }
    throw new Error('Post not found');
  }
};

export const deleteBlogPost = async (id, token) => {
  try {
    const res = await fetch(`${API_URL}/blog-posts/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    });
    if (!res.ok) throw new Error('Failed to delete blog post');
    return await res.json();
  } catch (err) {
    let posts = getStoredPosts();
    posts = posts.filter(p => p.id !== id);
    saveStoredPosts(posts);
    return { success: true };
  }
};
