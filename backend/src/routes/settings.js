const express = require('express');
const router = express.Router();
const SiteSettings = require('../models/SiteSettings');
const { protect } = require('../middleware/auth');

// @route   GET /api/settings
// @desc    List all site settings
// @access  Public
router.get('/', async (req, res, next) => {
  try {
    const settings = await SiteSettings.find();

    // Key-value object format convenience option
    const settingsMap = {};
    settings.forEach((s) => {
      settingsMap[s.setting_key] = s.setting_value;
    });

    res.json({
      success: true,
      count: settings.length,
      data: settings,
      settings_map: settingsMap,
    });
  } catch (error) {
    next(error);
  }
});

// @route   GET /api/settings/:key or /api/settings/:key/:key
// @desc    Get single setting by setting_key
// @access  Public
const getSettingByKey = async (req, res, next) => {
  try {
    const key = req.params.key2 || req.params.key;

    const setting = await SiteSettings.findOne({ setting_key: key });

    if (!setting) {
      return res.status(404).json({
        success: false,
        message: `Setting with key '${key}' not found`,
      });
    }

    res.json({
      success: true,
      data: setting,
    });
  } catch (error) {
    next(error);
  }
};

router.get('/:key', getSettingByKey);
router.get('/:key/:key2', getSettingByKey);

// @route   POST /api/settings
// @desc    Create or upsert site setting
// @access  Private
router.post('/', protect, async (req, res, next) => {
  try {
    const { setting_key, setting_value, setting_type } = req.body;

    if (!setting_key) {
      return res.status(400).json({
        success: false,
        message: 'setting_key is required',
      });
    }

    // Upsert logic
    const setting = await SiteSettings.findOneAndUpdate(
      { setting_key },
      { setting_key, setting_value, setting_type },
      { new: true, upsert: true, runValidators: true }
    );

    res.status(201).json({
      success: true,
      data: setting,
    });
  } catch (error) {
    next(error);
  }
});

// @route   PUT /api/settings/:id
// @desc    Update site setting by ID
// @access  Private
router.put('/:id', protect, async (req, res, next) => {
  try {
    let setting = await SiteSettings.findById(req.params.id);

    if (!setting) {
      return res.status(404).json({
        success: false,
        message: 'Setting not found',
      });
    }

    setting = await SiteSettings.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.json({
      success: true,
      data: setting,
    });
  } catch (error) {
    next(error);
  }
});

// @route   DELETE /api/settings/:id
// @desc    Delete site setting
// @access  Private
router.delete('/:id', protect, async (req, res, next) => {
  try {
    const setting = await SiteSettings.findById(req.params.id);

    if (!setting) {
      return res.status(404).json({
        success: false,
        message: 'Setting not found',
      });
    }

    await setting.deleteOne();

    res.json({
      success: true,
      message: 'Setting removed successfully',
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
