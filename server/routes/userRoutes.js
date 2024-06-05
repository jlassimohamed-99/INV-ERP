const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const { getUsers, getUser, updateUser, deleteUser, getCurrentUser } = require('../controllers/userController');

// Get all users
router.get('/', authMiddleware,getUsers);

// Get user by ID
router.get('/:id', authMiddleware,getUser);

// Update user by ID
router.put('/:id',authMiddleware ,updateUser);

// Soft delete user by ID
router.delete('/:id',authMiddleware, deleteUser);


module.exports = router;
