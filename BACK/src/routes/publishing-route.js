const express = require("express");
const publishingController = require("../controllers/publishing-controller");
const authenticate = require("../middlewares/authenticate");

const router = express.Router();

router.get("/landing", publishingController.getPublishingsLanding);
//router.get("/", publishingController.getProducts);
router.get("/:publishingId", authenticate, publishingController.getPublishingById);

module.exports = router;
