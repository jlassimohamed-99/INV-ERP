const mongoose = require('mongoose');
const { Schema } = mongoose;

const congeSchema = new Schema({
  employeeName: {
    type: String,
    required: true
  },
  employeeId: {
    type: String,  // Corrected to string
    required: true,
    ref: 'User'
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  reason: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true,
    enum: ['Pending', 'Approved', 'Rejected'],
    default: 'Pending'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Conge', congeSchema);
