const express = require('express');
const router = express.Router();
const multer = require('multer');
const { uploadToCloudinary } = require('../config/cloudinary');

// Configure Multer Memory Storage
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    // Allowed mime types for image uploads
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  },
});

// @route   POST /api/upload
// @desc    Upload file to Cloudinary
// @access  Public
router.post('/', (req, res, next) => {
  upload.single('file')(req, res, async (err) => {
    if (err) {
      return res.status(400).json({
        success: false,
        message: err.message || 'File upload failed',
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Please attach a file to upload',
      });
    }

    try {
      const folder = req.body.folder || 'quran_academy';
      const result = await uploadToCloudinary(req.file.buffer, folder);

      res.status(200).json({
        success: true,
        url: result.secure_url || result.url,
        public_id: result.public_id,
        format: result.format,
        bytes: result.bytes,
      });
    } catch (uploadError) {
      console.error('[Upload Route] Cloudinary error:', uploadError);
      res.status(500).json({
        success: false,
        message: uploadError.message || 'Error uploading image to Cloudinary',
      });
    }
  });
});

module.exports = router;
