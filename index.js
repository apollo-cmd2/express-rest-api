const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/user.routes');
require('dotenv').config();
const db = require('./db');

const app = express();

app.use(cors());
app.use(express.raw());
app.use('/api', [userRoutes]);

app.listen(process.env.PORT, () => {
  console.log('Server started on port', process.env.PORT);
});
