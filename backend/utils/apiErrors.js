class ApiError extends Error {
	/**
	 * @param {number} statusCode - The HTTP status code for the response.
	 * @param {string} message - The error message.
	 * @param {boolean} isOperational - Indicates if this is an expected, handled error.
	 */
	constructor(statusCode, message, isOperational = true) {
		super(message); // Call the parent Error constructor
		this.statusCode = statusCode;
		this.isOperational = isOperational;
		// Capture the stack trace, excluding the constructor call from it.
		Error.captureStackTrace(this, this.constructor);
	}
}

class BadRequestError extends ApiError {
	constructor(message = "Bad Request") {
		super(400, message, true);
		this.name = "BadRequestError";
	}
}

class UnauthorizedError extends ApiError {
	constructor(message = "Unauthorized") {
		super(401, message);
		this.name = "UnauthorizedError";
	}
}

class ForbiddenError extends ApiError {
	constructor(message = "Forbidden") {
		super(403, message);
		this.name = "ForbiddenError";
	}
}

class NotFoundError extends ApiError {
	constructor(message = "Not Found") {
		super(404, message);
		this.name = "NotFoundError";
	}
}

class ConflictError extends ApiError {
	constructor(message = "Conflict") {
		super(409, message);
		this.name = "ConflictError";
	}
}

class InternalServerError extends ApiError {
	constructor(message = "Internal Server Error") {
		// Internal server errors are typically not operational (i.e., they are bugs)
		super(500, message, false);
		this.name = "InternalServerError";
	}
}

module.exports = {
	ApiError,
	BadRequestError,
	UnauthorizedError,
	ForbiddenError,
	NotFoundError,
	ConflictError,
	InternalServerError,
};
