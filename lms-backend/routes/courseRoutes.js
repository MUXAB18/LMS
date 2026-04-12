const express = require('express');
const router = express.Router();
const {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
  addLesson,
  getInstructorCourses,
} = require('../controllers/courseController');
const { protect, authorizeRoles } = require('../middleware/authMiddleware');

// Public routes
router.get('/', getAllCourses);

// Instructor-only: get their own courses (must come before /:id)
router.get(
  '/instructor/my-courses',
  protect,
  authorizeRoles('instructor', 'admin'),
  getInstructorCourses
);

router.get('/:id', getCourseById);

// Protected: create course
router.post('/', protect, authorizeRoles('instructor', 'admin'), createCourse);

// Protected: update/delete course
router.put('/:id', protect, authorizeRoles('instructor', 'admin'), updateCourse);
router.delete('/:id', protect, authorizeRoles('instructor', 'admin'), deleteCourse);

// Protected: add lesson to course
router.post('/:id/lessons', protect, authorizeRoles('instructor', 'admin'), addLesson);

module.exports = router;
