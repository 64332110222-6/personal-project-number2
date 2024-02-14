const express = require("express");
const seriesController = require("../controllers/series-controller");
const authenticate = require("../middlewares/authenticate");

const router = express.Router();

router.get("/landing", seriesController.getSeriessLanding);
//router.get("/", seriesController.getProducts);
router.get("/:seriesId", authenticate, seriesController.getSeriesById);

module.exports = router;
