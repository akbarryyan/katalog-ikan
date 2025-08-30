const express = require('express');
const router = express.Router();
const AdminController = require('../controllers/adminController');
const authMiddleware = require('../middleware/auth');

// Public routes (tidak perlu authentication)
router.post('/login', AdminController.login);

// Protected routes (perlu authentication)
router.get('/profile', authMiddleware, AdminController.getProfile);
router.post('/logout', authMiddleware, AdminController.logout);

module.exports = router;
