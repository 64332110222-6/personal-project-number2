const express = require("express");
const categoryController = require("../controllers/category-controller");
const authenticate = require("../middlewares/authenticate");

const router = express.Router();

router.get("/landing", categoryController.getCategoriesLanding);
//router.get("/", categoryController.getProducts);
router.get("/:categoryId", authenticate, categoryController.getCategoryById);

module.exports = router;
