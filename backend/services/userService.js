const { db, auth } = require("../database/database");
const User = require("../models/user");
const { NotFoundError } = require("../utils/apiErrors");

class UserService {
	/**
	 * Creates a user profile document in Firestore.
	 * @param {object} profileData - Contains uid, name, email, companyName.
	 * @returns {Promise<User>} - The created user object.
	 */
	static async createUserProfile(profileData) {
		const { id, name, email, companyName } = profileData;
		const user = new User(id, name, email, companyName);
		await db.collection("users").doc(user.id).set(user.toFirestore());
		return user;
	}

	/**
	 * Retrieves a user profile from Firestore by ID.
	 * @param {string} userId - The user's UID.
	 * @returns {Promise<User>} - The user object.
	 */
	static async getUserById(userId) {
		const userDoc = await db.collection("users").doc(userId).get();
		if (!userDoc.exists) {
			throw new NotFoundError("User with that ID was not found.");
		}
		return User.fromFirestore(userDoc);
	}

	/**
	 * Updates a user's profile in Firestore.
	 * @param {string} userId - The user's UID.
	 * @param {object} updateData - The data to update.
	 * @returns {Promise<User>} - The updated user object.
	 */
	static async updateUser(userId, updateData) {
		const userRef = db.collection("users").doc(userId);
		const userDoc = await userRef.get();

		if (!userDoc.exists) {
			throw new NotFoundError("User with that ID was not found.");
		}

		// Filter for allowed fields to prevent unwanted updates
		const allowedUpdates = {};
		if (updateData.name) allowedUpdates.name = updateData.name;
		if (updateData.companyName)
			allowedUpdates.companyName = updateData.companyName;
		if (updateData.email) allowedUpdates.email = updateData.email;

		await userRef.update(allowedUpdates);

		const updatedUserDoc = await userRef.get();
		return User.fromFirestore(updatedUserDoc);
	}

	/**
	 * Deletes a user from Firestore and Firebase Authentication.
	 * @param {string} userId - The user's UID.
	 */
	static async deleteUser(userId) {
		const userRef = db.collection("users").doc(userId);
		const doc = await userRef.get();

		if (!doc.exists) {
			throw new NotFoundError("User with that ID was not found.");
		}

		await auth.deleteUser(userId);
		await userRef.delete();
	}
}

module.exports = UserService;
