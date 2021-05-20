const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  name: String,
  surname: String,
  orders: Array,
  username: {
    type: String,
    required: true,
    minLength: 6,
    maxLength: 15,
    trim: true,
  },
  password: {
    required: true,
    type: String,
  },
  created_At: { type: Date, default: Date.now },
  role: {
    type: String,
    default: 'user',
  },
});

module.exports = mongoose.model('user', UserSchema);
