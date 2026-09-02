const express = require('express');
const router = express.Router();
const Course = require('../models/Course');
const { protect } = require('../middleware/auth');

// @route   GET /api/courses
// @desc    List all active courses (public)
// @access  Public
router.get('/', async (req, res, next) => {
  try {
    const { include_inactive } = req.query;
    
    // By default, list active courses sorted by order ascending
    const filter = include_inactive === 'true' ? {} : { is_active: true };
    
    const courses = await Course.find(filter).sort({ order: 1, createdAt: -1 });

    res.json({
      success: true,
      count: courses.length,
      data: courses,
    });
  } catch (error) {
    next(error);
  }
});

// @route   GET /api/courses/:id
// @desc    Get single course
// @access  Public
router.get('/:id', async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found',
      });
    }

    res.json({
      success: true,
      data: course,
    });
  } catch (error) {
    next(error);
  }
});

// @route   POST /api/courses
// @desc    Create new course
// @access  Private
router.post('/', protect, async (req, res, next) => {
  try {
    const { title, description, image_url, duration, level, is_active, order } = req.body;

    if (!title) {
      return res.status(400).json({
        success: false,
        message: 'Course title is required',
      });
    }

    const course = await Course.create({
      title,
      description,
      image_url,
      duration,
      level,
      is_active,
      order: order !== undefined ? order : 0,
    });

    res.status(201).json({
      success: true,
      data: course,
    });
  } catch (error) {
    next(error);
  }
});

// @route   PUT /api/courses/:id
// @desc    Update course
// @access  Private
router.put('/:id', protect, async (req, res, next) => {
  try {
    let course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found',
      });
    }

    course = await Course.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.json({
      success: true,
      data: course,
    });
  } catch (error) {
    next(error);
  }
});

// @route   DELETE /api/courses/:id
// @desc    Delete course
// @access  Private
router.delete('/:id', protect, async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found',
      });
    }

    await course.deleteOne();

    res.json({
      success: true,
      message: 'Course removed successfully',
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
