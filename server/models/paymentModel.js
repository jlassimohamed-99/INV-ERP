const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
  payment_id: {
    type: String,
    unique: true,
    default: function () {
      return new mongoose.Types.ObjectId().toString();
    },
  },
  type: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model('Payment', PaymentSchema);
