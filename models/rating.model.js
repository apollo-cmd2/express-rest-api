const mongoose = require("mongoose");

const RatingSchema = mongoose.Schema({
  rate: {
    type: Number,
    default: 0,
  },
  description: String,
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "user",
  },
});

module.exports = mongoose.model("rating", RatingSchema);
