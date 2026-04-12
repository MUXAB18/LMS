const User = require('../models/User');
const Enrollment = require('../models/Enrollment');
const Course = require('../models/Course');

// @desc    Get all users
// @route   GET /api/users
// @access  Admin
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a user
// @route   DELETE /api/users/:id
// @access  Admin
const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Prevent deleting yourself
    if (user._id.toString() === req.user._id.toString()) {
      return res.status(400).json({ message: 'You cannot delete your own account' });
    }

    await User.findByIdAndDelete(req.params.id);
    // Also remove their enrollments
    await Enrollment.deleteMany({ student: req.params.id });

    res.json({ message: 'User and their enrollments deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get admin analytics
// @route   GET /api/users/analytics
// @access  Admin
const getAnalytics = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalStudents = await User.countDocuments({ role: 'student' });
    const totalInstructors = await User.countDocuments({ role: 'instructor' });
    const totalCourses = await Course.countDocuments();
    const totalEnrollments = await Enrollment.countDocuments();

    // 1. Calculate Total Revenue (Assuming each enrollment = course price)
    const revenueStats = await Enrollment.aggregate([
      {
        $lookup: {
          from: 'courses',
          localField: 'course',
          foreignField: '_id',
          as: 'courseDetails',
        },
      },
      { $unwind: '$courseDetails' },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: '$courseDetails.price' },
        },
      },
    ]);
    const totalRevenue = revenueStats.length > 0 ? revenueStats[0].totalRevenue : 0;

    // 2. Enrollment Trends (Last 30 Days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const enrollmentTrends = await Enrollment.aggregate([
      {
        $match: {
          createdAt: { $gte: thirtyDaysAgo },
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    // 3. Category Stats
    const categoryStats = await Course.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 },
        },
      },
      { $project: { name: '$_id', value: '$count', _id: 0 } },
    ]);

    // 4. Popular Courses
    const popularCourses = await Course.find()
      .sort({ enrollmentCount: -1 })
      .limit(5)
      .select('title enrollmentCount price');

    // 5. Recent Enrollments
    const recentEnrollmentDocs = await Enrollment.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate('student', 'name email')
      .populate('course', 'title price');

    res.json({
      summary: {
        totalUsers,
        totalStudents,
        totalInstructors,
        totalCourses,
        totalEnrollments,
        totalRevenue,
      },
      enrollmentTrends,
      categoryStats,
      popularCourses,
      recentEnrollments: recentEnrollmentDocs,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update user status (approve/disable)
// @route   PATCH /api/users/:id/status
// @access  Admin
const updateUserStatus = async (req, res) => {
  try {
    const { isApproved } = req.body;
    const user = await User.findById(req.params.id);

    if (!user) return res.status(404).json({ message: 'User not found' });

    user.isApproved = isApproved;
    await user.save();

    res.json({ message: `User status updated to ${isApproved ? 'Approved' : 'Pending'}` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getAllUsers, deleteUser, getAnalytics, updateUserStatus };
