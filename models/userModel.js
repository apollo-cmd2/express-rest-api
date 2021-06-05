const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    name: String,
    phone: String,
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
      ref: "rating",
    },
    role: String,
    isVerified: Boolean,
    emailToken: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("user", UserSchema);
