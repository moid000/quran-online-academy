const mongoose = require('mongoose');

const PaymentMethodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Payment method name is required'],
    trim: true,
  },
  account_title: {
    type: String,
    trim: true,
  },
  account_number: {
    type: String,
    trim: true,
  },
  instructions: {
    type: String,
  },
  icon: {
    type: String,
  },
  is_active: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('PaymentMethod', PaymentMethodSchema);
