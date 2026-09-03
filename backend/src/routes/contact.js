const express = require('express');
const router = express.Router();
const ContactMessage = require('../models/ContactMessage');
const { protect } = require('../middleware/auth');

// @route   POST /api/contact
// @desc    Submit contact message
// @access  Public
router.post('/', async (req, res, next) => {
  try {
    const { name, whatsapp, subject, message } = req.body;

    if (!name || !whatsapp || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: 'Name, WhatsApp number, subject, and message are required',
      });
    }

    const contactMsg = await ContactMessage.create({
      name,
      whatsapp,
      subject,
      message,
    });

    res.status(201).json({
      success: true,
      message: 'Your message has been received. We will get back to you soon!',
      data: contactMsg,
    });
  } catch (error) {
    next(error);
  }
});

// @route   GET /api/contact
// @desc    List all contact messages
// @access  Private
router.get('/', protect, async (req, res, next) => {
  try {
    const { is_read } = req.query;
    const filter = {};

    if (is_read !== undefined) {
      filter.is_read = is_read === 'true';
    }

    const messages = await ContactMessage.find(filter).sort({ createdAt: -1 });

    res.json({
      success: true,
      count: messages.length,
      data: messages,
    });
  } catch (error) {
    next(error);
  }
});

// @route   GET /api/contact/:id
// @desc    Get single contact message
// @access  Private
router.get('/:id', protect, async (req, res, next) => {
  try {
    const message = await ContactMessage.findById(req.params.id);

    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Contact message not found',
      });
    }

    res.json({
      success: true,
      data: message,
    });
  } catch (error) {
    next(error);
  }
});

// @route   PATCH /api/contact/:id/read
// @desc    Mark a contact message as read
// @access  Private
router.patch('/:id/read', protect, async (req, res, next) => {
  try {
    const message = await ContactMessage.findByIdAndUpdate(
      req.params.id,
      { is_read: true },
      { new: true }
    );

    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Contact message not found',
      });
    }

    res.json({
      success: true,
      data: message,
    });
  } catch (error) {
    next(error);
  }
});

// @route   PUT /api/contact/:id
// @desc    Mark as read or update contact message
// @access  Private
router.put('/:id', protect, async (req, res, next) => {
  try {
    let message = await ContactMessage.findById(req.params.id);

    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Contact message not found',
      });
    }

    message = await ContactMessage.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.json({
      success: true,
      data: message,
    });
  } catch (error) {
    next(error);
  }
});

// @route   DELETE /api/contact/:id
// @desc    Delete contact message
// @access  Private
router.delete('/:id', protect, async (req, res, next) => {
  try {
    const message = await ContactMessage.findById(req.params.id);

    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Contact message not found',
      });
    }

    await message.deleteOne();

    res.json({
      success: true,
      message: 'Contact message removed successfully',
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
