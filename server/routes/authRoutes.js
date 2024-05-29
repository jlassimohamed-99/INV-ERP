const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const { register, login, getCurrentUser } = require('../controllers/authController');

// Register
router.post('/register', register);

// Login
router.post('/login', login);

// Get current user
router.get('/me', authMiddleware, getCurrentUser);

module.exports = router;
