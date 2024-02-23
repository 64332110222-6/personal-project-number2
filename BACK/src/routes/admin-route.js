const express = require("express");
const adminController = require("../controllers/admin-controller");
const upload = require("../middlewares/upload");

const router = express.Router();

router.post(
  "/product",
  upload.array("images", 5),
  adminController.createProduct
);
//* Product ------------------------
router.get("/landing", adminController.getMyProductsLanding);
router.put("/product/update/:productId", adminController.updateProduct);
router.delete("/product/delete/:productId", adminController.deleteProduct);

//* Publishing ------------------------
router.post("/publishing", adminController.createPublishing);
router.put("/publishing/update/:publishingId", adminController.updatePublishing);
router.delete("/publishing/delete/:publishingId", adminController.deletePublishing);

//* Category ------------------------
router.post("/category", adminController.createCategory);
router.put("/category/update/:categoryId", adminController.updateCategory);
router.delete("/category/delete/:categoryId", adminController.deleteCategory);

//* Author ------------------------
router.post("/author", adminController.createAuthor);
router.put("/author/update/:authorId", adminController.updateAuthor);
router.delete("/author/delete/:authorId", adminController.deleteAuthor);

//* Series ------------------------
router.post("/series", adminController.createSeries);
router.put("/series/update/:seriesId", adminController.updateSeries);
router.delete("/series/delete/:seriesId", adminController.deleteSeries);

//* Promotion ------------------------
router.post("/promotion", adminController.createPromotion);

module.exports = router;
