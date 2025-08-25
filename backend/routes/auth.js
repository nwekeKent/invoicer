const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// Create a new user
router.post("/register", authController.registerUser);

//authenticate user
router.post("/login", authController.loginUser);

// Verify user token
router.post("/verify-token", authController.verifyToken);

module.exports = router;
