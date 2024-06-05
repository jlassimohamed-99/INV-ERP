const Payment = require('../models/paymentModel');
const mongoose = require('mongoose');

// Get all payments
const getPayments = async (req, res) => {
  try {
    const payments = await Payment.find();
    res.json(payments);
  } catch (err) {
    console.error('Error fetching payments:', err);
    res.status(500).send('Server error');
  }
};

// Get a payment by ID
const getPayment = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id);
    if (!payment) {
      return res.status(404).json({ msg: 'Payment not found' });
    }
    res.json(payment);
  } catch (err) {
    console.error('Error fetching payment by ID:', err);
    res.status(500).send('Server error');
  }
};

// Create a new payment
const createPayment = async (req, res) => {
  const { type, amount, description } = req.body;

  try {
    const payment_id = new mongoose.Types.ObjectId().toString();
    const newPayment = new Payment({ payment_id, type, amount, description });
    const payment = await newPayment.save();
    res.json(payment);
  } catch (err) {
    console.error('Error creating payment:', err);
    res.status(500).send('Server error');
  }
};

// Update a payment
const updatePayment = async (req, res) => {
  const { type, amount, description } = req.body;

  try {
    let payment = await Payment.findById(req.params.id);

    if (!payment) {
      return res.status(404).json({ msg: 'Payment not found' });
    }

    payment.type = type;
    payment.amount = amount;
    payment.description = description;

    await payment.save();
    res.json(payment);
  } catch (err) {
    console.error('Error updating payment:', err);
    res.status(500).send('Server error');
  }
};

const deletePayment = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id);

    if (!payment) {
      return res.status(404).json({ msg: 'Payment not found' });
    }

    payment.isDeleted = true;
    await payment.save();
    res.json({ msg: 'Payment marked as deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send(err.message);
  }
};

module.exports = {
  getPayments,
  getPayment,
  createPayment,
  updatePayment,
  deletePayment,
};
