const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
    company_id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    social_reason: { type: String },
    activity: { type: String },
    next_payment_date: { type: Date },
    fiscal_calendar: { type: String },
    address: { type: String },
    phone: { type: String },
    category: { type: String },
    isDeleted: { type: Boolean, default: false }
});

module.exports = mongoose.model('Company', companySchema);
