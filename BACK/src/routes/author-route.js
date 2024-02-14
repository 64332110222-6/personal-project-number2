const express = require("express");
const authorController = require("../controllers/author-controller");
const authenticate = require("../middlewares/authenticate");

const router = express.Router();

router.get("/landing", authorController.getAuthorsLanding);
//router.get("/", authorController.getProducts);
router.get("/:authorId", authenticate, authorController.getAuthorById);

module.exports = router;
