const router = require("express").Router();

const authController = require("../controller/auth");

router.post("/login", authController.login);

router.post("/register", authController.register);
// router.post("/verify", authController.verifyOtp);
// router.post("/send-otp", authController.sendOtp);
router.post("/forgot-password", authController.forgotPassword);
router.post("/reset-password", authController.resetPassword);

module.exports = router;
