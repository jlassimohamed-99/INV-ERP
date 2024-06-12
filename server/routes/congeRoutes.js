const express = require('express');
const router = express.Router();
const congeController = require('../controllers/congeController');
const authMiddleware = require('../middlewares/authMiddleware'); // Make sure you have an auth middleware

router.get('/', authMiddleware, congeController.getAllConges);
router.post('/', authMiddleware, congeController.createConge);
router.put('/:id', authMiddleware, congeController.updateCongeStatus);

module.exports = router;
