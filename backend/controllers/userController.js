const { db, auth, clientAuth } = require("../database/database");
const User = require("../models/user");
const firebase = require("firebase/app");
const { signInWithEmailAndPassword } = require("firebase/auth");

exports.loginUser = async (req, res) => {
	const { email, password } = req.body;

	if (!email || !password) {
		return res
			.status(400)
			.json({ status: "Failed", error: "Email and password are required." });
	}

	try {
		// Sign in the user using Firebase Authentication
		const userCredential = await signInWithEmailAndPassword(
			clientAuth,
			email,
			password
		);

		// Get the ID token from the authenticated user
		const idToken = await userCredential.user.getIdToken();

		res.status(200).json({
			status: "Success",
			message: "Login successful",
			token: idToken,
			user: {
				uid: userCredential.user.uid,
				email: userCredential.user.email,
				displayName: userCredential.user.displayName,
			},
		});
	} catch (error) {
		res.status(401).json({ status: "Failed", error: error });
	}
};

exports.registerUser = async (req, res) => {
	const {
		email,
		password,
		name,
		companyName,
		streetAddress,
		city,
		postCode,
		country,
	} = req.body;

	if (
		(!email || !password || !name || !companyName || !streetAddress,
		!city,
		!postCode,
		!country)
	) {
		return res
			.status(400)
			.json({ error: "All fields are required", data: req.body });
	}

	try {
		const userRecord = await auth.createUser({
			email,
			password,
			displayName: name,
		});

		const user = new User(
			userRecord.uid,
			name,
			email,
			companyName,
			streetAddress,
			city,
			postCode,
			country
		);
		await db.collection("users").doc(user.id).set(user.toFirestore());

		res.status(201).json({
			status: "success",
			message: "User registered successfully",
			user,
		});
	} catch (error) {
		res.status(400).json({ status: "Failed", error: error.message });
	}
};

exports.getUserById = async (req, res) => {
	const { id } = req.params;

	try {
		const userDoc = await db.collection("users").doc(id).get();
		if (!userDoc.exists) {
			return res
				.status(404)
				.json({ status: "Failed", error: "User not found" });
		}

		const user = User.fromFirestore(userDoc);
		res.status(200).json({
			status: "Sucesss",
			user,
		});
	} catch (error) {
		res.status(500).json({ status: "Failed", error: error.message });
	}
};

exports.updateUser = async (req, res) => {
	const { id } = req.params;
	const { name, companyName, email, streetAddress, city, postCode, country } =
		req.body;

	try {
		const userRef = db.collection("users").doc(id);
		const userDoc = await userRef.get();
		if (!userDoc.exists) {
			return res
				.status(404)
				.json({ status: "Failed", error: "User not found" });
		}

		const updatedData = {};
		if (name) updatedData.name = name;
		if (companyName) updatedData.companyName = companyName;
		if (email) updatedData.email = email;
		if (streetAddress && city && postCode && country)
			updatedData.address = {
				streetAddress,
				city,
				postCode,
				country,
			};

		await userRef.update(updatedData);

		const updatedUserDoc = await userRef.get();
		const updatedUser = User.fromFirestore(updatedUserDoc);

		res.status(200).json({
			status: "Success",
			message: "User updated successfully",
			updatedUser,
		});
	} catch (error) {
		res.status(500).json({ status: "Failed", error: error.message });
	}
};

exports.deleteUser = async (req, res) => {
	const { id } = req.params;
	try {
		// Delete user document from Firestore
		const userRef = db.collection("users").doc(id);
		const doc = await userRef.get();

		// check if user exist in db
		if (!doc.exists) {
			return res
				.status(404)
				.json({ status: "Failed", error: "User not found" });
		}
		// delete user from user collection
		await userRef.delete();

		// Delete user account from Firebase Authentication
		await auth.deleteUser(id);

		res.status(200).json({
			status: "Success",
			message: "User account has been deleted successfully.",
		});
	} catch (error) {
		res
			.status(500)
			.json({ error: "Error deleting user account.", error: error.message });
	}
};
