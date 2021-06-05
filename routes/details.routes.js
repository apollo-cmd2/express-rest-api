const DetailsController = require("../controllers/details.controller");
const router = require("express").Router();

router.post("/details", DetailsController.createDetail);
router.get("/details", DetailsController.getDetails);
router.put("/details/:id", DetailsController.updateDetail);
router.delete("/details/:id", DetailsController.deleteDetail);



module.exports = router;
