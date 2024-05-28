const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  user_id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  role: { 
    type: String, 
    required: true, 
    enum: ['admin', 'responsable rh', 'chef de projet', 'comptable', 'employee'] 
  },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String },
  isDeleted: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Encrypt password before saving the user
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

module.exports = mongoose.model('User', UserSchema);
