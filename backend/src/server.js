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
