const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  balance: { type: Number, default: 1000 },
  bank: { type: Number, default: 0 },
  lastDaily: { type: Date, default: null },
  lastWeekly: { type: Date, default: null },
});

module.exports = mongoose.model('User', userSchema);
