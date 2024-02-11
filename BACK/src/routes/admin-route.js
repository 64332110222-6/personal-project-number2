const express = require("express");
const adminController = require("../controllers/admin-controller");
const upload = require("../middlewares/upload");

const router = express.Router();

router.post(
  "/product",
  upload.array("images", 5),
  adminController.createProduct
);
router.patch("/product/:productId", adminController.updateProduct);
router.post("/publishing", adminController.createPublishing);
router.post("/category", adminController.createCategory);
router.post("/author", adminController.createAuthor);
router.post("/series", adminController.createSeries);
router.post("/promotion", adminController.createPromotion);

module.exports = router;
