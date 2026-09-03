const mongoose = require('mongoose');

const StudentRegistrationSchema = new mongoose.Schema({
  student_name: {
    type: String,
    required: [true, 'Student name is required'],
    trim: true,
  },
  father_name: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
  },
  whatsapp: {
    type: String,
    trim: true,
  },
  country: {
    type: String,
    trim: true,
  },
  course: {
    type: String,
    trim: true,
  },
  package: {
    type: String,
    trim: true,
  },
  payment_method: {
    type: String,
    trim: true,
  },
  payment_method_name: {
    type: String,
    trim: true,
  },
  payment_screenshot: {
    type: String,
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
  },
  is_read: {
    type: Boolean,
    default: false,
  },
  notes: {
    type: String,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('StudentRegistration', StudentRegistrationSchema);
