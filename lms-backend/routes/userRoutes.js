const express = require('express');
const router = express.Router();
const { getAllUsers, deleteUser, getAnalytics, updateUserStatus } = require('../controllers/userController');
const { protect, authorizeRoles } = require('../middleware/authMiddleware');

// All user routes are Admin only
router.get('/', protect, authorizeRoles('admin'), getAllUsers);
router.get('/analytics', protect, authorizeRoles('admin'), getAnalytics);
router.patch('/:id/status', protect, authorizeRoles('admin'), updateUserStatus);
router.delete('/:id', protect, authorizeRoles('admin'), deleteUser);

module.exports = router;
