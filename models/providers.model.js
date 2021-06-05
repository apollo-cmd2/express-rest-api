const mongoose = require("mongoose");

const providersSchema = mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  address: String,
  phone: String,
  email: String,
  description: String,
});

module.exports = mongoose.model("providers", providersSchema);
