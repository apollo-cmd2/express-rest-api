const mongoose = require("mongoose");

const OrdersSchema = mongoose.Schema({
  orderedBy: {
    name: String,
    _id: mongoose.SchemaTypes.ObjectId,
  },
  description: String,
  ordered_At: { type: Date, default: Date.now },
  takenBy:
    {
      name: String,
      _id: mongoose.SchemaTypes.ObjectId,
    } || null,
  takenAt: {
    type: Date || null,
    default: null,
  },
  clientComment: {
    rate: Number,
    description: String,
  },
  workerComment: {
    rate: Number,
    description: String,
  },
  status: String,
});

module.exports = mongoose.model("orders", OrdersSchema);
