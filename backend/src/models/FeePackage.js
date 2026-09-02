const mongoose = require('mongoose');

const FeePackageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Fee package name is required'],
    trim: true,
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
  },
  days_per_week: {
    type: Number,
  },
  classes_per_month: {
    type: Number,
  },
  duration_per_class: {
    type: String,
  },
  features: {
    type: [String],
    default: [],
  },
  is_popular: {
    type: Boolean,
    default: false,
  },
  is_active: {
    type: Boolean,
    default: true,
  },
  order: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('FeePackage', FeePackageSchema);
