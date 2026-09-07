const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Import middlewares
const notFound = require('./middleware/notFound');
const errorHandler = require('./middleware/error');

// Import routes
const authRoutes = require('./routes/auth');
const blogPostsRoutes = require('./routes/blogPosts');
const contactRoutes = require('./routes/contact');
const coursesRoutes = require('./routes/courses');
const feePackagesRoutes = require('./routes/feePackages');
const paymentMethodsRoutes = require('./routes/paymentMethods');
const settingsRoutes = require('./routes/settings');
const studentsRoutes = require('./routes/students');
const uploadRoutes = require('./routes/upload');

const app = express();

// Express configuration & middlewares
app.use(cors()); // Allow all origins for dev
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Quran Online Academy API is healthy',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
  });
});


// Dynamic sitemap for blog posts (auto-updates when new posts are published)
app.get('/api/sitemap-blog.xml', async (req, res) => {
  try {
    const BlogPost = mongoose.model('BlogPost');
    const posts = await BlogPost.find({ is_published: true }).sort({ createdAt: -1 });
    const base = 'https://quran-online-academy-two.vercel.app/blogs/';
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
    posts.forEach(p => {
      xml += '  <url>\n';
      xml += `    <loc>${base}${p.slug}</loc>\n`;
      xml += `    <lastmod>${p.updatedAt ? p.updatedAt.toISOString() : new Date().toISOString()}</lastmod>\n`;
      xml += '    <changefreq>monthly</changefreq>\n';
      xml += '    <priority>0.6</priority>\n';
      xml += '  </url>\n';
    });
    xml += '</urlset>';
    res.set('Content-Type', 'application/xml');
    res.send(xml);
  } catch (err) {
    res.status(500).send('<?xml version="1.0"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></urlset>');
  }
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/blog-posts', blogPostsRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/courses', coursesRoutes);
app.use('/api/fee-packages', feePackagesRoutes);
app.use('/api/payment-methods', paymentMethodsRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/students', studentsRoutes);
app.use('/api/upload', uploadRoutes);

// Error handling middlewares
app.use(notFound);
app.use(errorHandler);

// Database connection & Server start
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/quran_online_academy';

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('Successfully connected to MongoDB.');
    app.listen(PORT, () => {
      console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  });

module.exports = app;
