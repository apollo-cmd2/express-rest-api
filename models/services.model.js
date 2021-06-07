const mongoose = require("mongoose");

const servicesSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("services", servicesSchema);
