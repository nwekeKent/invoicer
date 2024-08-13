const Invoice = require("../models/invoice");
const { db } = require("../database/database");
const { database } = require("firebase-admin");

exports.createInvoice = async (req, res) => {
	const userId = req.params.userId; // Get userId from path parameterss
	const {
		streetAddress,
		city,
		postCode,
		country,
		clientName,
		clientEmail,
		clientStreetAddress,
		clientCity,
		clientPostCode,
		clientCountry,
		invoiceDate,
		dueDate,
		projectDescription,
		itemList,
	} = req.body;

	if (
		!streetAddress ||
		!city ||
		!postCode ||
		!country ||
		!clientName ||
		!clientEmail ||
		!clientStreetAddress ||
		!clientCity ||
		!clientPostCode ||
		!clientCountry ||
		!invoiceDate ||
		!dueDate ||
		!projectDescription ||
		!itemList
	) {
		return res.status(400).json({
			status: "Failed",
			error: "All fields are required!",
		});
	}
	let status = "Pending";

	const newInvoice = new Invoice(
		userId,
		streetAddress,
		city,
		postCode,
		country,
		clientName,
		clientEmail,
		clientStreetAddress,
		clientCity,
		clientPostCode,
		clientCountry,
		invoiceDate,
		dueDate,
		projectDescription,
		status,
		itemList
	);

	const invoiceObj = newInvoice.toFirestore();

	try {
		await db.collection("invoices").doc(newInvoice.id).set(invoiceObj);
		res.status(201).json({
			status: "Success",
			message: "Invoice created successfully.",
			data: invoiceObj,
		});
	} catch (error) {
		res.status(500).json({ status: "Failed", error: error });
	}
};

exports.getUserInvoices = async (req, res) => {
	const { userId } = req.params;

	try {
		const invoicesRef = db.collection("invoices");
		const snapshot = await invoicesRef.where("userId", "==", userId).get();

		if (snapshot.empty) {
			return res
				.status(404)
				.json({ status: "Failed", message: "No invoices found for this user" });
		}

		const invoices = [];
		snapshot.forEach(doc => {
			invoices.push(Invoice.fromFirestore(doc));
		});

		res.status(200).json({
			status: "Success",
			message: "All user invoices fetched successfully",
			data: invoices,
		});
	} catch (error) {
		console.error("Error fetching invoices:", error);
		res.status(500).json({ error: "Failed to fetch invoices" });
	}
};

exports.getInvoiceById = async (req, res) => {
	try {
		const { id } = req.params; // Get userId and invoice id from path parameters

		const doc = await db.collection("invoices").doc(id).get();
		if (!doc.exists) {
			return res
				.status(404)
				.json({ status: "Failed", error: "Invoice not found" });
		}

		const invoice = Invoice.fromFirestore(doc);
		res.status(200).json({
			status: "Success",
			message: "Invoice fetched successfully.",
			data: invoice,
		});
	} catch (error) {
		res.status(500).json({ status: "Failed", error: error.message });
	}
};

exports.updateInvoice = async (req, res) => {
	try {
		const { userId, id } = req.params;

		const status = "Pending"; // Get userId and invoice id from path parameters
		const {
			streetAddress,
			city,
			postCode,
			country,
			clientName,
			clientEmail,
			clientStreetAddress,
			clientCity,
			clientPostCode,
			clientCountry,
			invoiceDate,
			dueDate,
			projectDescription,
			itemList,
		} = req.body;

		const updatedInvoice = new Invoice(
			userId,
			streetAddress,
			city,
			postCode,
			country,
			clientName,
			clientEmail,
			clientStreetAddress,
			clientCity,
			clientPostCode,
			clientCountry,
			invoiceDate,
			dueDate,
			projectDescription,
			status,
			itemList
		);

		const invoiceRef = db.collection("invoices").doc(id);
		const doc = await invoiceRef.get();
		if (!doc.exists) {
			return res
				.status(404)
				.json({ status: "Failed", error: "Invoice not found" });
		}

		await invoiceRef.update(updatedInvoice.toFirestore());
		res
			.status(200)
			.json({ status: "Success", message: "Invoice updated successfully." });
	} catch (error) {
		res.status(500).json({ status: "Failed", error: error.message });
	}
};

exports.markAsPaid = async (req, res) => {
	try {
		const { id } = req.params; // Get userId and invoice id from path parameters
		const { status } = req.body;

		if (status !== "Paid") {
			return res
				.status(404)
				.json({ status: "Failed", error: "Status shoukd be set as 'Paid'" });
		}

		const invoiceRef = db.collection("invoices").doc(id);
		const doc = await invoiceRef.get();

		if (!doc.exists) {
			return res
				.status(404)
				.json({ status: "Failed", error: "Invoice not found" });
		}

		invoiceRef.update({ status: status });
		res.status(200).json({
			status: "Success",
			message: "Invoice status updated to paid successfully.",
		});
	} catch (error) {
		res.status(500).json({ status: "Failed", error: error.message });
	}
};
exports.deleteInvoice = async (req, res) => {
	try {
		const { id } = req.params; // Get userId and invoice id from path parameters

		const invoiceRef = db.collection("invoices").doc(id);
		const doc = await invoiceRef.get();
		if (!doc.exists) {
			return res
				.status(404)
				.json({ status: "Failed", error: "Invoice not found" });
		}

		await invoiceRef.delete();

		res
			.status(200)
			.json({ status: "Success", message: "Invoice deleted successfully." });
	} catch (error) {
		res.status(500).json({ status: "Failed", error: error.message });
	}
};
