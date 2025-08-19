// services/authService.js

const { auth, clientAuth } = require("../database/database");
const { signInWithEmailAndPassword } = require("firebase/auth");
const UserService = require("./userService");
// 1. Import your custom error classes
const {
	BadRequestError,
	UnauthorizedError,
	ConflictError,
} = require("../utils/apiErrors");

class AuthService {
	/**
	 * Logs in a user with email and password.
	 * @param {string} email - The user's email.
	 * @param {string} password - The user's password.
	 * @returns {Promise<{token: string, user: object}>} - The ID token and user info.
	 * @throws {UnauthorizedError} If login credentials are invalid.
	 * @throws {BadRequestError} For other Firebase-related login errors.
	 */
	static async login(email, password) {
		try {
			const userCredential = await signInWithEmailAndPassword(
				clientAuth,
				email,
				password
			);
			const idToken = await userCredential.user.getIdToken();

			return {
				token: idToken,
				user: {
					uid: userCredential.user.uid,
					email: userCredential.user.email,
					displayName: userCredential.user.displayName,
				},
			};
		} catch (error) {
			// 2. Translate Firebase errors into your custom, operational errors.
			if (error.code === "auth/invalid-credential") {
				throw new UnauthorizedError("Invalid email or password.");
			}
			// For other potential errors, throw a generic bad request or re-throw
			throw new BadRequestError(error.message || "Login failed.");
		}
	}

	/**
	 * Registers a new user in Firebase Auth and creates their profile in Firestore.
	 * @param {object} userData - Contains email, password, name, companyName.
	 * @returns {Promise<object>} - The newly created user profile.
	 * @throws {ConflictError} If the email already exists.
	 * @throws {BadRequestError} For invalid data or other creation failures.
	 */
	static async register(userData) {
		const { email, password, name, companyName } = userData;
		let newUserRecord = null;

		try {
			// Step 1: Create the user in Firebase Authentication
			newUserRecord = await auth.createUser({
				email,
				password,
				displayName: name,
			});

			// Step 2: Create the user profile in Firestore using the UserService
			const userProfileData = {
				uid: newUserRecord.uid,
				name,
				email,
				companyName,
			};
			const userProfile = await UserService.createUserProfile(userProfileData);

			return userProfile;
		} catch (error) {
			// Cleanup: If profile creation fails, delete the auth user to prevent orphans
			if (newUserRecord) {
				await auth.deleteUser(newUserRecord.uid);
			}

			// 3. Translate specific Firebase errors into your custom errors.
			if (error.code === "auth/email-already-exists") {
				throw new ConflictError("An account with this email already exists.");
			}
			if (
				error.code === "auth/invalid-password" ||
				error.code === "auth/invalid-email"
			) {
				// Pass the specific message from Firebase for more detail
				throw new BadRequestError(error.message);
			}

			// For any other error (e.g., from profile creation), throw a generic bad request
			throw new BadRequestError(error.message || "Failed to register user.");
		}
	}
}

module.exports = AuthService;
