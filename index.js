const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/user.routes');
const roleRoutes = require('./routes/roles.routes');
const orderRoutes = require('./routes/orders.routes');
require('dotenv').config();
const activateRoutes = require('./routes/activation.routes');
require('./db');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', [userRoutes, roleRoutes, orderRoutes]);
app.use(activateRoutes);


app.listen(process.env.PORT, () => {
  console.log('Server started on port', process.env.PORT);
});
