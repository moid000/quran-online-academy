const express = require('express');
const router = express.Router();
const FeePackage = require('../models/FeePackage');
const { protect } = require('../middleware/auth');

// @route   GET /api/fee-packages
// @desc    List all active fee packages (public)
// @access  Public
router.get('/', async (req, res, next) => {
  try {
    const { include_inactive } = req.query;

    const filter = include_inactive === 'true' ? {} : { is_active: true };

    const packages = await FeePackage.find(filter).sort({ order: 1, createdAt: -1 });

    res.json({
      success: true,
      count: packages.length,
      data: packages,
    });
  } catch (error) {
    next(error);
  }
});

// @route   GET /api/fee-packages/:id
// @desc    Get single fee package
// @access  Public
router.get('/:id', async (req, res, next) => {
  try {
    const feePackage = await FeePackage.findById(req.params.id);

    if (!feePackage) {
      return res.status(404).json({
        success: false,
        message: 'Fee package not found',
      });
    }

    res.json({
      success: true,
      data: feePackage,
    });
  } catch (error) {
    next(error);
  }
});

// @route   POST /api/fee-packages
// @desc    Create fee package
// @access  Private
router.post('/', protect, async (req, res, next) => {
  try {
    const { name, price, days_per_week, classes_per_month, duration_per_class, features, is_popular, is_active, order } = req.body;

    if (!name || price === undefined) {
      return res.status(400).json({
        success: false,
        message: 'Package name and price are required',
      });
    }

    const feePackage = await FeePackage.create({
      name,
      price,
      days_per_week,
      classes_per_month,
      duration_per_class,
      features: features || [],
      is_popular,
      is_active,
      order: order !== undefined ? order : 0,
    });

    res.status(201).json({
      success: true,
      data: feePackage,
    });
  } catch (error) {
    next(error);
  }
});

// @route   PUT /api/fee-packages/:id
// @desc    Update fee package
// @access  Private
router.put('/:id', protect, async (req, res, next) => {
  try {
    let feePackage = await FeePackage.findById(req.params.id);

    if (!feePackage) {
      return res.status(404).json({
        success: false,
        message: 'Fee package not found',
      });
    }

    feePackage = await FeePackage.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.json({
      success: true,
      data: feePackage,
    });
  } catch (error) {
    next(error);
  }
});

// @route   DELETE /api/fee-packages/:id
// @desc    Delete fee package
// @access  Private
router.delete('/:id', protect, async (req, res, next) => {
  try {
    const feePackage = await FeePackage.findById(req.params.id);

    if (!feePackage) {
      return res.status(404).json({
        success: false,
        message: 'Fee package not found',
      });
    }

    await feePackage.deleteOne();

    res.json({
      success: true,
      message: 'Fee package removed successfully',
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
