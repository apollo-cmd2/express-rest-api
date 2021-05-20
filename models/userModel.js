const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  userId: String,
  name: String,
  surname: String,
  orders: Array,
  time: String,
});

module.exports = mongoose.model("user", UserSchema);