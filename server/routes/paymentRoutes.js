const express = require('express');
const { getPayments, getPayment, createPayment, updatePayment, deletePayment } = require('../controllers/paymentController');
const router = express.Router();

router.get('/', getPayments);
router.get('/:id', getPayment);
router.post('/', createPayment);
router.put('/:id', updatePayment);
router.delete('/:id', deletePayment);

module.exports = router;
