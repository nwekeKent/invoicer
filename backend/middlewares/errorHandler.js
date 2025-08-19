const { ApiError } = require("../utils/apiErrors");

const errorHandler = (error, req, res, next) => {
	if (error instanceof ApiError) {
		// If it's an operational error, send the details to the client
		if (error.isOperational) {
			return res.status(error.statusCode).json({
				status: "error",
				message: error.message,
			});
		} else {
			// If it's a programmer error (not operational), we don't want to leak details
			// 1. Log the full error for developers (important for production)
			console.error("PROGRAMMING ERROR:", error);

			// 2. Send a generic message to the client
			return res.status(500).json({
				status: "error",
				message: "Something went very wrong!",
			});
		}
	}

	// For any other unexpected errors that are not an instance of ApiError
	console.error("UNEXPECTED ERROR:", error);
	res.status(500).json({
		status: "error",
		message: "An unexpected internal server error occurred.",
	});
};

module.exports = errorHandler;
