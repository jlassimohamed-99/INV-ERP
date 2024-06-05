const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const { getPayments, getPayment, createPayment, updatePayment, deletePayment } = require('../controllers/paymentController');

router.get('/', authMiddleware, getPayments);
router.get('/:id', authMiddleware, getPayment);
router.post('/', authMiddleware, createPayment);
router.put('/:id', authMiddleware, updatePayment);
router.delete('/:id', authMiddleware, deletePayment);

module.exports = router;
