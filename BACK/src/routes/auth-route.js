const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth-controller");
const authenticate =require("../middlewares/authenticate")

router.post("/register", authController.register);
router.get("/me", authenticate, authController.getme);
router.post("/login", authController.login);
router.post("/forget-password", authController.forgetPassword);
router.get("/forget-password/:token", authController.verifyForgetPassword);
router.post("/reset-password/:token", authController.resetPassword);

module.exports = router;
