const mongoose = require('mongoose');

const BlogPostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Blog post title is required'],
    trim: true,
  },
  slug: {
    type: String,
    required: [true, 'Blog post slug is required'],
    unique: true,
    trim: true,
    lowercase: true,
  },
  excerpt: {
    type: String,
    trim: true,
  },
  content: {
    type: String,
  },
  image_url: {
    type: String,
  },
  category: {
    type: String,
    trim: true,
  },
  author: {
    type: String,
    trim: true,
  },
  is_published: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('BlogPost', BlogPostSchema);
