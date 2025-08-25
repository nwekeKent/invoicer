const AuthService = require("../services/authService");
const SuccessResponse = require("../utils/successResponse");
const { BadRequestError } = require("../utils/apiErrors");

exports.loginUser = async (req, res) => {
	const { email, password } = req.body;

	if (!email || !password) {
		throw new BadRequestError("Email and password are required.");
	}

	const result = await AuthService.login(email, password);

	SuccessResponse.ok(res, result, "Login successful");
};

exports.registerUser = async (req, res) => {
	const { email, password, name, companyName } = req.body;

	if (!email || !password || !name) {
		throw new BadRequestError("Email, password, and name are required.");
	}

	if (password.length < 8) {
		throw new BadRequestError("Password must be at least 8 characters long.");
	}

	// Example: Basic email format check
	const emailRegex = /\S+@\S+\.\S+/;
	if (!emailRegex.test(email)) {
		throw new BadRequestError("Please provide a valid email address.");
	}

	const newUser = await AuthService.register({
		email,
		password,
		name,
		companyName,
	});

	// Use SuccessResponse for the successful creation.
	SuccessResponse.created(res, newUser, "User registered successfully");
};

exports.verifyToken = async (req, res) => {
	const { token } = req.body;

	await AuthService.verifyToken(token);

	SuccessResponse.okMessage(res, "Token is valid");
};
