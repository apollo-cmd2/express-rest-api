const mongoose = require("mongoose");

const detailSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    provider: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    priceWithInstall: {
      type: Number,
    },
    description: String,
    type: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("details", detailSchema);
