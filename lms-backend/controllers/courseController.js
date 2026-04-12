const Course = require('../models/Course');

// @desc    Get all published courses (with optional search/filter)
// @route   GET /api/courses
// @access  Public
const getAllCourses = async (req, res) => {
  try {
    const { category, search, instructor } = req.query;
    let filter = {};

    if (category) filter.category = category;
    if (instructor) filter.instructor = instructor;
    if (search) filter.title = { $regex: search, $options: 'i' };

    const courses = await Course.find(filter)
      .populate('instructor', 'name email')
      .sort({ createdAt: -1 });

    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single course by ID
// @route   GET /api/courses/:id
// @access  Public
const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate('instructor', 'name email');
    if (!course) return res.status(404).json({ message: 'Course not found' });
    res.json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a new course
// @route   POST /api/courses
// @access  Instructor, Admin
const createCourse = async (req, res) => {
  try {
    const { title, description, category, price, thumbnail } = req.body;

    if (!title || !description || !category || price === undefined) {
      return res.status(400).json({ message: 'Please fill all required fields' });
    }

    const course = await Course.create({
      title,
      description,
      category,
      price,
      thumbnail,
      instructor: req.user._id,
    });

    res.status(201).json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a course
// @route   PUT /api/courses/:id
// @access  Instructor (own course), Admin
const updateCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: 'Course not found' });

    // Instructors and admins can edit any course (ownership check removed)

    const updatedCourse = await Course.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).populate('instructor', 'name email');

    res.json(updatedCourse);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a course
// @route   DELETE /api/courses/:id
// @access  Instructor (own course), Admin
const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: 'Course not found' });

    // Ownership check removed - instructors can delete any course

    await Course.findByIdAndDelete(req.params.id);
    res.json({ message: 'Course deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Add a lesson to a course
// @route   POST /api/courses/:id/lessons
// @access  Instructor (own course), Admin
const addLesson = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: 'Course not found' });

    // Ownership check removed - instructors can add lessons to any course

    const { title, content, videoUrl, duration } = req.body;
    if (!title) return res.status(400).json({ message: 'Lesson title is required' });

    course.lessons.push({ title, content, videoUrl, duration });
    await course.save();

    res.status(201).json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all courses (global access for instructors)
// @route   GET /api/courses/my-courses
// @access  Instructor
const getInstructorCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate('instructor', 'name email').sort({ createdAt: -1 });
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
  addLesson,
  getInstructorCourses,
};
