const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    payment_id: { type: String, required: true, unique: true },
    client: { type: String, required: true },
    social_reason: { type: String },
    date: { type: Date, required: true },
    status: { type: String },
    comment: { type: String },
    amount: { type: Number, required: true },
    isDeleted: { type: Boolean, default: false }
});

module.exports = mongoose.model('Payment', paymentSchema);
