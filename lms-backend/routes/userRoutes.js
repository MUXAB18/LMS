const express = require('express');
const router = express.Router();
const { getAllUsers, deleteUser, getAnalytics } = require('../controllers/userController');
const { protect, authorizeRoles } = require('../middleware/authMiddleware');

// All user routes are Admin only
router.get('/', protect, authorizeRoles('admin'), getAllUsers);
router.get('/analytics', protect, authorizeRoles('admin'), getAnalytics);
router.delete('/:id', protect, authorizeRoles('admin'), deleteUser);

module.exports = router;
