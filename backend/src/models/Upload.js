const mongoose = require('mongoose');

const UploadSchema = new mongoose.Schema(
  {
    filename: {
      type: String,
      default: 'upload',
    },
    mimeType: {
      type: String,
      default: 'image/jpeg',
    },
    // base64-encoded image data
    data: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Upload', UploadSchema);
