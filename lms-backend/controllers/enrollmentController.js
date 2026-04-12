const Enrollment = require('../models/Enrollment');
const Course = require('../models/Course');

// @desc    Enroll student in a course
// @route   POST /api/enroll
// @access  Student
const enrollInCourse = async (req, res) => {
  try {
    const { courseId } = req.body;

    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: 'Course not found' });

    // Check if already enrolled
    const alreadyEnrolled = await Enrollment.findOne({
      student: req.user._id,
      course: courseId,
    });
    if (alreadyEnrolled) {
      return res.status(400).json({ message: 'You are already enrolled in this course' });
    }

    const enrollment = await Enrollment.create({
      student: req.user._id,
      course: courseId,
    });

    // Increment course enrollment count
    await Course.findByIdAndUpdate(courseId, { $inc: { enrollmentCount: 1 } });

    res.status(201).json({ message: 'Enrolled successfully!', enrollment });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all courses a student is enrolled in
// @route   GET /api/enroll/my-courses
// @access  Student
const getMyCourses = async (req, res) => {
  try {
    const enrollments = await Enrollment.find({ student: req.user._id })
      .populate({
        path: 'course',
        populate: { path: 'instructor', select: 'name email' },
      })
      .sort({ createdAt: -1 });

    res.json(enrollments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update lesson progress
// @route   PUT /api/enroll/:courseId/progress
// @access  Student
const updateProgress = async (req, res) => {
  try {
    const { lessonId, progress } = req.body;

    const enrollment = await Enrollment.findOne({
      student: req.user._id,
      course: req.params.courseId,
    });

    if (!enrollment) return res.status(404).json({ message: 'Enrollment not found' });

    if (lessonId && !enrollment.completedLessons.includes(lessonId)) {
      enrollment.completedLessons.push(lessonId);
    }

    if (progress !== undefined) enrollment.progress = progress;
    if (progress === 100) enrollment.isCompleted = true;

    await enrollment.save();
    res.json({ message: 'Progress updated', enrollment });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { enrollInCourse, getMyCourses, updateProgress };
