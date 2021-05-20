const mongoose = require('mongoose');

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
  takenAt: Date || null,
});

module.exports = mongoose.model('orders', OrdersSchema);
