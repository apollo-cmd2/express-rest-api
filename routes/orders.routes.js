const Router = require('express');
const ordersController = require('../controllers/orders.controller');

const router = new Router();

router.post('/order/:userId', ordersController.createOrder);

module.exports = router;
