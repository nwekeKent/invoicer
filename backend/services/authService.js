const { auth, clientAuth } = require("../database/database");
const { signInWithEmailAndPassword } = require("firebase/auth");
const UserService = require("./userService");

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
					id: userCredential.user.uid,
					email: userCredential.user.email,
					name: userCredential.user.displayName,
				},
			};
		} catch (error) {
			if (error.code === "auth/invalid-credential") {
				throw new UnauthorizedError("Invalid email or password.");
			}
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
				id: newUserRecord.uid,
				name,
				email,
				companyName,
			};
			const userProfile = await UserService.createUserProfile(userProfileData);

			// Step 3: Sign in the user to get a token
			const signInResult = await signInWithEmailAndPassword(
				clientAuth,
				email,
				password
			);
			const idToken = await signInResult.user.getIdToken();

			// Step 4: Return token + profile info
			return {
				token: idToken,
				user: userProfile,
			};
		} catch (error) {
			// Cleanup: delete auth user to avoid orphaned records
			if (newUserRecord) {
				await auth.deleteUser(newUserRecord.uid);
			}

			if (error.code === "auth/email-already-exists") {
				throw new ConflictError("An account with this email already exists.");
			}
			if (
				error.code === "auth/invalid-password" ||
				error.code === "auth/invalid-email"
			) {
				throw new BadRequestError(error.message);
			}

			throw new BadRequestError(error.message || "Failed to register user.");
		}
	}
}

module.exports = AuthService;
