const mongoose = require('mongoose');

const SiteSettingsSchema = new mongoose.Schema({
  setting_key: {
    type: String,
    required: [true, 'Setting key is required'],
    unique: true,
    trim: true,
  },
  setting_value: {
    type: String,
  },
  setting_type: {
    type: String,
    enum: ['text', 'json', 'image', 'boolean'],
    default: 'text',
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('SiteSettings', SiteSettingsSchema);
