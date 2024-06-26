const admin = require("firebase-admin");

const verifyToken = async (req, res, next) => {
	const authHeader = req.headers.authorization;

	if (!authHeader) {
		return res.status(401).json({
			status: "Failed",
			error: "Authorization Failed. No Token Provided!",
		});
	}

	const token = authHeader.split(" ")[1];

	try {
		const decodedToken = await admin.auth().verifyIdToken(token);
		req.user = decodedToken;
		next();
	} catch (error) {
		res.status(401).json({
			status: "Failed",
			error: "Authorization Failed. Invalid Credentials",
			message:
				error.code === "auth/id-token-expired" &&
				" Id token has expired, please generate a new one.",
		});
	}
};

module.exports = verifyToken;
