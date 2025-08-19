const express = require("express");
const router = express.Router();
const verifyTokenMiddleware = require("../middlewares/authMiddleware");
const userController = require("../controllers/userController");

// Get a user by ID
router.get("/profile", verifyTokenMiddleware, userController.getUserById);

// Update a user by ID
router.put("/profile", verifyTokenMiddleware, userController.updateUser);

// Delete a user by ID
router.delete("/profile", verifyTokenMiddleware, userController.deleteUser);

module.exports = router;
