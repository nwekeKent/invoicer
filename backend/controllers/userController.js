const { db, auth } = require("../database/database");
const User = require("../models/user");

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
		return res.status(400).json({ error: "All fields are required" });
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

		res.status(201).json({ message: "User registered successfully", user });
	} catch (error) {
		res.status(500).json({ error: "invalid credentials" });
	}
};

exports.getUserById = async (req, res) => {
	const { id } = req.params;

	try {
		const userDoc = await db.collection("users").doc(id).get();
		if (!userDoc.exists) {
			return res.status(404).json({ error: "User not found" });
		}

		const user = User.fromFirestore(userDoc);
		res.status(200).json(user);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

exports.updateUser = async (req, res) => {
	const { id } = req.params;
	const { name, companyName, address } = req.body;

	try {
		const userRef = db.collection("users").doc(id);
		const userDoc = await userRef.get();
		if (!userDoc.exists) {
			return res.status(404).json({ error: "User not found" });
		}

		const updatedData = {};
		if (name) updatedData.name = name;
		if (companyName) updatedData.companyName = companyName;
		if (address) updatedData.address = address;

		await userRef.update(updatedData);

		const updatedUserDoc = await userRef.get();
		const updatedUser = User.fromFirestore(updatedUserDoc);

		res.status(200).json({ message: "User updated successfully", updatedUser });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

exports.deleteUser = async (req, res) => {
	const { id } = req.params;

	try {
		const userRef = db.collection("users").doc(id);
		const userDoc = await userRef.get();
		if (!userDoc.exists) {
			return res.status(404).json({ error: "User not found" });
		}

		await userRef.delete();
		res.status(200).json({
			message: "User deleted successfully",
			user: User.fromFirestore(userDoc),
		});
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};
