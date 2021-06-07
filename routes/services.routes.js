const router = require("express").Router();
const servicesController = require("../controllers/services.controller");

router
  .route("/services")
  .post(servicesController.createService)
  .get(servicesController.getServices);

router
  .route("/services/:id")
  .put(servicesController.updateService)
  .delete(servicesController.deleteService);

module.exports = router;
