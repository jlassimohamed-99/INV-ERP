const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');

// Define your routes and link them to the controller methods
router.post('/register', register);
router.post('/login', login);

module.exports = router;
