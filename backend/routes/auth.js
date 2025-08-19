const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// Create a new user
router.post("/register", authController.registerUser);

//authenticate user
router.post("/login", authController.loginUser);

module.exports = router;
