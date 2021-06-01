const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  name: String,
  surname: String,
  orders: Array,
  username: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    required: true,
    type: String,
  },
  rating: {
    type: mongoose.SchemaTypes.Number,
    ref: 'rating'
  },
  created_At: { type: Date, default: Date.now },
  role: String,
  isVerified: Boolean,
  emailToken: String,
});

module.exports = mongoose.model('user', UserSchema);
