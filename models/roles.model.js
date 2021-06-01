const mongoose = require('mongoose');

const RolesSchema = mongoose.Schema({
  role: String,
  name: String,
});

module.exports = mongoose.model('roles', RolesSchema);
