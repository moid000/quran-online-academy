const express = require('express');
const router = express.Router();
const PaymentMethod = require('../models/PaymentMethod');
const { protect } = require('../middleware/auth');

// @route   GET /api/payment-methods
// @desc    List all active payment methods (public)
// @access  Public
router.get('/', async (req, res, next) => {
  try {
    const { include_inactive } = req.query;

    const filter = include_inactive === 'true' ? {} : { is_active: true };

    const methods = await PaymentMethod.find(filter).sort({ createdAt: -1 });

    res.json({
      success: true,
      count: methods.length,
      data: methods,
    });
  } catch (error) {
    next(error);
  }
});

// @route   GET /api/payment-methods/:id
// @desc    Get single payment method
// @access  Public
router.get('/:id', async (req, res, next) => {
  try {
    const method = await PaymentMethod.findById(req.params.id);

    if (!method) {
      return res.status(404).json({
        success: false,
        message: 'Payment method not found',
      });
    }

    res.json({
      success: true,
      data: method,
    });
  } catch (error) {
    next(error);
  }
});

// @route   POST /api/payment-methods
// @desc    Create payment method
// @access  Private
router.post('/', protect, async (req, res, next) => {
  try {
    const { name, account_title, account_number, instructions, icon, is_active } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: 'Payment method name is required',
      });
    }

    const method = await PaymentMethod.create({
      name,
      account_title,
      account_number,
      instructions,
      icon,
      is_active,
    });

    res.status(201).json({
      success: true,
      data: method,
    });
  } catch (error) {
    next(error);
  }
});

// @route   PUT /api/payment-methods/:id
// @desc    Update payment method
// @access  Private
router.put('/:id', protect, async (req, res, next) => {
  try {
    let method = await PaymentMethod.findById(req.params.id);

    if (!method) {
      return res.status(404).json({
        success: false,
        message: 'Payment method not found',
      });
    }

    method = await PaymentMethod.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.json({
      success: true,
      data: method,
    });
  } catch (error) {
    next(error);
  }
});

// @route   DELETE /api/payment-methods/:id
// @desc    Delete payment method
// @access  Private
router.delete('/:id', protect, async (req, res, next) => {
  try {
    const method = await PaymentMethod.findById(req.params.id);

    if (!method) {
      return res.status(404).json({
        success: false,
        message: 'Payment method not found',
      });
    }

    await method.deleteOne();

    res.json({
      success: true,
      message: 'Payment method deleted successfully',
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
