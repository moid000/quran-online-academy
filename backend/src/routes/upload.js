const express = require('express');
const router = express.Router();
const multer = require('multer');
const { uploadToCloudinary, isCloudinaryConfigured } = require('../config/cloudinary');
const Upload = require('../models/Upload');

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

// Base URL used for image links stored in the DB
const getBaseUrl = () =>
  process.env.APP_URL || 'https://quran-online-academy-production.up.railway.app';

// @route   POST /api/upload
// @desc    Upload file to Cloudinary (or MongoDB if Cloudinary not configured)
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
      // If Cloudinary is configured, use it
      if (isCloudinaryConfigured()) {
        const folder = req.body.folder || 'quran_academy';
        const result = await uploadToCloudinary(req.file.buffer, folder);

        return res.status(200).json({
          success: true,
          url: result.secure_url || result.url,
          public_id: result.public_id,
          format: result.format,
          bytes: result.bytes,
        });
      }

      // Fallback: store the image in MongoDB and serve it via /api/upload/:id
      const saved = await Upload.create({
        filename: req.file.originalname || 'upload',
        mimeType: req.file.mimetype,
        data: req.file.buffer.toString('base64'),
      });

      return res.status(200).json({
        success: true,
        url: `${getBaseUrl()}/api/upload/${saved._id}`,
        storage: 'mongodb',
        bytes: req.file.size,
      });
    } catch (uploadError) {
      console.error('[Upload Route] Error:', uploadError);
      res.status(500).json({
        success: false,
        message: uploadError.message || 'Error uploading image',
      });
    }
  });
});

// @route   GET /api/upload/:id
// @desc    Serve an image stored in MongoDB
// @access  Public
router.get('/:id', async (req, res, next) => {
  try {
    const upload = await Upload.findById(req.params.id);

    if (!upload) {
      return res.status(404).json({
        success: false,
        message: 'File not found',
      });
    }

    const buffer = Buffer.from(upload.data, 'base64');
    res.set('Content-Type', upload.mimeType);
    res.set('Content-Length', buffer.length);
    res.set('Cache-Control', 'public, max-age=86400');
    return res.send(buffer);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
