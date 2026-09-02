const API_URL = import.meta.env.VITE_API_URL || 'https://quran-online-academy-production.up.railway.app/api';

const initialPosts = [
  {
    id: 1,
    title: 'The Virtues of Learning the Holy Quran',
    excerpt: 'Discover the immense rewards and blessings associated with learning and reciting the Quran as mentioned in authentic Hadiths.',
    content: `The Holy Quran is the eternal guidance sent by Allah for all of humanity. Learning and reciting the Quran carries immense rewards both in this world and the hereafter.

The Prophet Muhammad (PBUH) said: "The best among you are those who learn the Quran and teach it." (Sahih Bukhari)

Every letter of the Quran that you recite brings ten good deeds. Imagine the blessings that come from reciting entire Surahs! 

In another Hadith, the Prophet (PBUH) said: "Whoever reads a letter from the Book of Allah will receive a hasanah (good deed), and every hasanah will be multiplied by ten."

Learning the Quran also brings barakah (blessings) into your life, protects you from trials, and on the Day of Judgment, the Quran will intercede for those who recited and followed it.`,
    image: 'https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=1200&q=80',
    category: 'Spiritual Growth',
    author: 'Abdul Muhaymin',
    date: '2024-01-15',
    readTime: '5 min',
  },
  {
    id: 2,
    title: 'Benefits of Online Quran Education',
    excerpt: 'How modern technology is making Quran education accessible to Muslims worldwide, breaking geographical barriers.',
    content: `In today's connected world, learning the Quran has become more accessible than ever before. Online Quran education offers numerous benefits that were not available to previous generations.

With one-on-one online classes, students receive personalized attention, flexible scheduling, and can learn from qualified teachers regardless of their location. This has opened doors for Muslims living in areas where Quran teachers are not readily available.

Benefits include:
- Learn from the comfort of your home
- Flexible scheduling that fits your routine
- One-on-one attention from qualified teachers
- Access to teachers from around the world
- Safe and comfortable learning environment
- Progress tracking and regular assessments

The digital age has truly revolutionized how we approach Islamic education, making it possible for anyone, anywhere, to connect with the divine words of Allah.`,
    image: 'https://images.unsplash.com/photo-1585036156171-384164a8c675?w=1200&q=80',
    category: 'Academy News',
    author: 'Abdul Muhaymin',
    date: '2024-01-10',
    readTime: '4 min',
  },
  {
    id: 3,
    title: 'The Importance of Tajweed in Quran Recitation',
    excerpt: 'Understanding why proper Tajweed is essential for correct Quran recitation and how it preserves the divine message.',
    content: `Tajweed is the science of reciting the Quran correctly. It involves giving every letter its due right in terms of pronunciation, characteristics, and articulation points.

The word 'Tajweed' comes from the Arabic root word meaning 'to improve' or 'to make better.' When applied to Quran recitation, it means improving our recitation by following the rules that preserve the way the Quran was revealed.

Why is Tajweed Important?
1. Preserves the Divine Message - Tajweed ensures we recite the Quran exactly as it was revealed
2. Prevents Meaning Changes - Incorrect pronunciation can alter meanings
3. Shows Respect to Allah's Words - Reciting properly honors the sacred text
4. Following the Sunnah - The Prophet (PBUH) recited with Tajweed

Learning Tajweed is not just recommended - it's an obligation for every Muslim who recites the Quran.`,
    image: 'https://images.unsplash.com/photo-1542816417-0983c9c9ad53?w=1200&q=80',
    category: 'Quran Learning',
    author: 'Abdul Muhaymin',
    date: '2024-01-05',
    readTime: '6 min',
  },
];

const getStoredPosts = () => {
  const data = localStorage.getItem('app_blog_posts_v2');
  if (data) return JSON.parse(data);
  localStorage.setItem('app_blog_posts_v2', JSON.stringify(initialPosts));
  return initialPosts;
};

const saveStoredPosts = (posts) => {
  localStorage.setItem('app_blog_posts_v2', JSON.stringify(posts));
};

export const getBlogPosts = async () => {
  try {
    const res = await fetch(`${API_URL}/blog-posts`);
    if (!res.ok) throw new Error('Failed to fetch blog posts');
    const result = await res.json();
    return result.data || result;
  } catch (err) {
    return getStoredPosts();
  }
};

export const getBlogPostById = async (id) => {
  try {
    const res = await fetch(`${API_URL}/blog-posts/${id}`);
    if (!res.ok) throw new Error('Failed to fetch blog post');
    const result = await res.json();
    return result.data || result;
  } catch (err) {
    const posts = getStoredPosts();
    return posts.find(p => p.id === parseInt(id) || p.id === id);
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
    const result = await res.json();
    return result.data || result;
  } catch (err) {
    const posts = getStoredPosts();
    const newPost = { ...data, id: Date.now() };
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
    const result = await res.json();
    return result.data || result;
  } catch (err) {
    const posts = getStoredPosts();
    const idx = posts.findIndex(p => p.id === id);
    if (idx !== -1) {
      posts[idx] = { ...posts[idx], ...data };
      saveStoredPosts(posts);
      return posts[idx];
    }
    throw new Error('Blog post not found');
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
