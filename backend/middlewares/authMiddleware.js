const admin = require("firebase-admin");
const { UnauthorizedError, BadRequestError } = require("../utils/apiErrors");

const verifyTokenMiddleware = async (req, res, next) => {
	const authHeader = req.headers["authorization"];
	const token = authHeader && authHeader.split(" ")[1];

	if (!token) {
		throw new BadRequestError(
			"Authorization header missing or malformed. Expected 'Bearer TOKEN'."
		);
	}

	try {
		// Verify the token using Firebase Admin SDK
		const decodedToken = await admin.auth().verifyIdToken(token);

		req.auth = decodedToken;
		next();
	} catch (error) {
		if (
			error.code === "auth/id-token-expired" ||
			error.code === "auth/invalid-id-token"
		) {
			// Throw an UnauthorizedError for invalid or expired tokens.
			throw new UnauthorizedError(
				"Invalid or expired token. Please log in again."
			);
		}

		throw new UnauthorizedError(`Token verification failed: ${error.message}`);
	}
};

module.exports = verifyTokenMiddleware;
