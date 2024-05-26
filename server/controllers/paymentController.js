const Payment = require('../models/paymentModel');

const getPayments = async (req, res) => {
    try {
        const payments = await Payment.find({ isDeleted: false });
        res.status(200).json(payments);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const getPayment = async (req, res) => {
    try {
        const payment = await Payment.findById(req.params.id);
        if (!payment) {
            return res.status(404).json({ message: 'Payment not found' });
        }
        res.status(200).json(payment);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const createPayment = async (req, res) => {
    const { client, social_reason, date, status, comment, amount } = req.body;
    try {
        const newPayment = new Payment({
            payment_id: new mongoose.Types.ObjectId().toString(),
            client,
            social_reason,
            date,
            status,
            comment,
            amount
        });

        await newPayment.save();
        res.status(201).json({ message: 'Payment created successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const updatePayment = async (req, res) => {
    try {
        const payment = await Payment.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!payment) {
            return res.status(404).json({ message: 'Payment not found' });
        }
        res.status(200).json(payment);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const deletePayment = async (req, res) => {
    try {
        const payment = await Payment.findByIdAndUpdate(req.params.id, { isDeleted: true }, { new: true });
        if (!payment) {
            return res.status(404).json({ message: 'Payment not found' });
        }
        res.status(200).json({ message: 'Payment deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { getPayments, getPayment, createPayment, updatePayment, deletePayment };
