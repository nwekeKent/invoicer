const express = require("express");
const router = express.Router();
const admin = require("firebase-admin");

// Function to verify Firebase ID token
const verifyToken = async idToken => {
	try {
		const decodedToken = await admin.auth().verifyIdToken(idToken);
		return decodedToken; // Token is valid
	} catch (error) {
		console.error("Error verifying token:", error);
		return null; // Token is invalid
	}
};

// Endpoint to check token validity
router.post("/check-token", async (req, res) => {
	const { token } = req.body;

	if (!token) {
		return res
			.status(400)
			.json({ status: "failed", error: "Token is required" });
	}

	const decodedToken = await verifyToken(token);

	if (decodedToken) {
		res.status(200).json({ valid: true, user: decodedToken });
	} else {
		res.status(401).json({
			valid: false,
			error: "Authorization Failed. Invalid Credentials",
		});
	}
});

module.exports = router;
