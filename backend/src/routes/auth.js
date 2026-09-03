const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const EmailVerification = require('../models/EmailVerification');
const sendEmail = require('../utils/sendEmail');
const { protect } = require('../middleware/auth');

/**
 * Helper to generate JWT Token
 */
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'fallback_secret', {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });
};

// @route   POST /api/auth/login
// @desc    Admin login & get token
// @access  Public
router.post('/login', async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    if ((!username && !email) || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide username or email, and password',
      });
    }

    // Find admin by username or email
    const query = username ? { username: username.toLowerCase() } : { email: email.toLowerCase() };
    const admin = await Admin.findOne(query).select('+password');

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      });
    }

    const isMatch = await admin.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      });
    }

    const token = generateToken(admin._id);

    res.json({
      success: true,
      token,
      admin: {
        id: admin._id,
        username: admin.username,
        email: admin.email,
      },
    });
  } catch (error) {
    next(error);
  }
});

// @route   POST /api/auth/verify-email
// @desc    Send OTP to email for verification
// @access  Public
router.post('/verify-email', async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email address is required',
      });
    }

    // Generate 6 digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expires_at = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Delete existing OTPs for this email to keep clean
    await EmailVerification.deleteMany({ email: email.toLowerCase() });

    // Create new verification record
    await EmailVerification.create({
      email: email.toLowerCase(),
      otp,
      expires_at,
      verified: false,
    });

    // Send email
    await sendEmail({
      to: email,
      subject: 'Quran Online Academy - Verification Code',
      text: `Your verification code is: ${otp}. This code will expire in 10 minutes.`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
          <h2 style="color: #1a5f7a;">Quran Online Academy</h2>
          <p>Assalamu Alaikum,</p>
          <p>Your email verification code is:</p>
          <div style="font-size: 24px; font-weight: bold; color: #1a5f7a; letter-spacing: 4px; padding: 10px 0;">${otp}</div>
          <p>This code is valid for 10 minutes. If you did not request this code, please ignore this email.</p>
        </div>
      `,
    });

    res.json({
      success: true,
      message: 'Verification OTP sent to email',
    });
  } catch (error) {
    next(error);
  }
});

// @route   POST /api/auth/verify-otp
// @desc    Verify OTP code
// @access  Public
router.post('/verify-otp', async (req, res, next) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: 'Email and OTP are required',
      });
    }

    const verificationRecord = await EmailVerification.findOne({
      email: email.toLowerCase(),
      otp,
    });

    if (!verificationRecord) {
      return res.status(400).json({
        success: false,
        message: 'Invalid OTP code',
      });
    }

    if (verificationRecord.expires_at < new Date()) {
      return res.status(400).json({
        success: false,
        message: 'OTP code has expired. Please request a new one.',
      });
    }

    verificationRecord.verified = true;
    await verificationRecord.save();

    res.json({
      success: true,
      message: 'Email verified successfully',
    });
  } catch (error) {
    next(error);
  }
});

// @route   GET /api/auth/me
// @desc    Get logged in admin profile
// @access  Private
router.get('/me', protect, async (req, res) => {
  res.json({
    success: true,
    admin: req.admin,
  });
});


// @route   PUT /api/auth/update-credentials
// @desc    Update logged-in admin's username/email/password
// @access  Private
router.put('/update-credentials', protect, async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const admin = await Admin.findById(req.admin.id).select('+password');

    if (!admin) {
      return res.status(404).json({ success: false, message: 'Admin not found' });
    }

    if (username) admin.username = username.toLowerCase();
    if (email) admin.email = email.toLowerCase();
    if (password) admin.password = password; // pre-save hook hashes it

    await admin.save();

    res.json({
      success: true,
      message: 'Credentials updated successfully',
      admin: { id: admin._id, username: admin.username, email: admin.email },
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
