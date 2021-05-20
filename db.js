const mongoose = require('mongoose');
const userModel = require('./models/userModel');
require('dotenv').config();

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_URL}/jamshid?authSource=admin&replicaSet=atlas-47wh78-shard-0&w=majority&readPreference=primary&ssl=true`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log('connected to db');
  })
  .catch((err) => {
    console.log(err);
  });

const db = mongoose.connection;

module.exports = db;
