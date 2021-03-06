const { Router } = require("express");
const ordersController = require("../controllers/orders.controller");

const router = new Router();

router.post("/order/:userId", ordersController.createOrder);
router.get("/orders", ordersController.getOrders);
router.put("/order/:workerId", ordersController.updateOrder);
router.get("/order/:orderId", ordersController.getOrder);
router.delete("/order/:orderId", ordersController.deleteOrder);

module.exports = router;
