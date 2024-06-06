const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// Create a new user
router.post("/register", userController.registerUser);

// Get a user by ID
router.get("/:id", userController.getUserById);

// Update a user by ID
router.put("/:id", userController.updateUser);

// Delete a user by ID
router.delete("/:id", userController.deleteUser);

module.exports = router;
