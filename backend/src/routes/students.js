const express = require('express');
const router = express.Router();
const StudentRegistration = require('../models/StudentRegistration');
const { protect } = require('../middleware/auth');

// @route   POST /api/students/register
// @desc    Register a new student
// @access  Public
router.post('/register', async (req, res, next) => {
  try {
    const {
      student_name,
      father_name,
      email,
      whatsapp,
      country,
      course,
      package: pkg,
      payment_method,
      payment_method_name,
      payment_screenshot,
      notes,
    } = req.body;

    if (!student_name || !email) {
      return res.status(400).json({
        success: false,
        message: 'Student name and email are required',
      });
    }

    const registration = await StudentRegistration.create({
      student_name,
      father_name,
      email,
      whatsapp,
      country,
      course,
      package: pkg,
      payment_method,
      payment_method_name,
      payment_screenshot,
      status: 'pending',
      notes,
    });

    res.status(201).json({
      success: true,
      message: 'Student registration submitted successfully!',
      data: registration,
    });
  } catch (error) {
    next(error);
  }
});

// @route   GET /api/students
// @desc    List all student registrations (Filter by status)
// @access  Private
router.get('/', protect, async (req, res, next) => {
  try {
    const { status } = req.query;
    const filter = {};

    if (status) {
      filter.status = status.toLowerCase();
    }

    const students = await StudentRegistration.find(filter).sort({ createdAt: -1 });

    res.json({
      success: true,
      count: students.length,
      data: students,
    });
  } catch (error) {
    next(error);
  }
});

// @route   GET /api/students/unread-count
// @desc    Count unread registrations (for admin notification badge)
// @access  Private
router.get('/unread-count', protect, async (req, res, next) => {
  try {
    const count = await StudentRegistration.countDocuments({ is_read: false });
    res.json({ success: true, count });
  } catch (error) {
    next(error);
  }
});

// @route   PATCH /api/students/mark-all-read
// @desc    Mark all registrations as read (clears the notification badge)
// @access  Private
router.patch('/mark-all-read', protect, async (req, res, next) => {
  try {
    await StudentRegistration.updateMany({ is_read: false }, { is_read: true });
    res.json({ success: true });
  } catch (error) {
    next(error);
  }
});

// @route   GET /api/students/:id
// @desc    Get single student registration
// @access  Private
router.get('/:id', protect, async (req, res, next) => {
  try {
    const student = await StudentRegistration.findById(req.params.id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student registration not found',
      });
    }

    res.json({
      success: true,
      data: student,
    });
  } catch (error) {
    next(error);
  }
});

// @route   PUT /api/students/:id
// @desc    Update student status or notes
// @access  Private
router.put('/:id', protect, async (req, res, next) => {
  try {
    let student = await StudentRegistration.findById(req.params.id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student registration not found',
      });
    }

    // Normalize status to lowercase (frontend sends 'Approved'/'Rejected')
    const updateData = { ...req.body };
    if (updateData.status) {
      updateData.status = String(updateData.status).toLowerCase();
    }

    student = await StudentRegistration.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    });

    res.json({
      success: true,
      data: student,
    });
  } catch (error) {
    next(error);
  }
});

// @route   DELETE /api/students/:id
// @desc    Delete student registration
// @access  Private
router.delete('/:id', protect, async (req, res, next) => {
  try {
    const student = await StudentRegistration.findById(req.params.id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student registration not found',
      });
    }

    await student.deleteOne();

    res.json({
      success: true,
      message: 'Student registration deleted successfully',
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
