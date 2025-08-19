const UserService = require("../services/userService");
const SuccessResponse = require("../utils/successResponse");

exports.getUserById = async (req, res) => {
	const userId = req.auth.uid;
	const user = await UserService.getUserById(userId);
	SuccessResponse.ok(res, user);
};

exports.updateUser = async (req, res) => {
	const userId = req.auth.uid;
	const updatedUser = await UserService.updateUser(userId, req.body);
	SuccessResponse.ok(res, updatedUser, "User updated successfully");
};

exports.deleteUser = async (req, res) => {
	const userId = req.auth.uid;
	await UserService.deleteUser(userId);
	SuccessResponse.noContent(res);
};
