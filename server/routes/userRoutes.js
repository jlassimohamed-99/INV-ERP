const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const { getUsers, getUser, updateUser, deleteUser, getCurrentUser } = require('../controllers/userController');

// Get all users
router.get('/', getUsers);

// Get user by ID
router.get('/:id', getUser);

// Update user by ID
router.put('/:id', updateUser);

// Soft delete user by ID
router.delete('/:id', deleteUser);

// Get current user
router.get('/me', authMiddleware, getCurrentUser);

module.exports = router;
