const express = require('express');
const router = express.Router();
const { enrollInCourse, getMyCourses, updateProgress } = require('../controllers/enrollmentController');
const { protect, authorizeRoles } = require('../middleware/authMiddleware');

router.post('/', protect, authorizeRoles('student'), enrollInCourse);
router.get('/my-courses', protect, authorizeRoles('student'), getMyCourses);
router.put('/:courseId/progress', protect, authorizeRoles('student'), updateProgress);

module.exports = router;
