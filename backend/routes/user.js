const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken");
const userController = require("../controllers/userController");

// Create a new user
router.post("/register", userController.registerUser);

//authenticate user
router.post("/login", userController.loginUser);

// Get a user by ID
router.get("/:id", verifyToken, userController.getUserById);

// Update a user by ID
router.put("/:id", verifyToken, userController.updateUser);

// Delete a user by ID
router.delete("/:id", verifyToken, userController.deleteUser);

module.exports = router;
