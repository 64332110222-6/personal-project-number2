const express = require("express");
const shippingController = require("../controllers/shipping-controller");
const authenticate = require("../middlewares/authenticate");


const router = express.Router();

router.get("/landing", shippingController.getShippingLanding);
router.get("/my/landing", shippingController.getMyShippingLanding);
router.post("/new", authenticate,shippingController.createShipping);
router.put("/update/:shippingId",shippingController.updateShipping);
router.delete("/delete/:shippingId", shippingController.deleteShipping);
router.get("/:shippingId", authenticate, shippingController.getShippingById);

module.exports = router;
