// services/invoiceService.js

const { db } = require("../database/database"); // Assuming db is exported from here
const Invoice = require("../models/invoice"); // Your Invoice model
const { NotFoundError, BadRequestError } = require("../utils/apiErrors"); // Custom errors

class InvoiceService {
	/**
	 * Creates a new invoice in Firestore.
	 * @param {object} invoiceData - Data for the new invoice.
	 * @returns {Promise<Invoice>} - The created Invoice object.
	 */
	static async createInvoice(invoiceData) {
		const {
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
			itemList,
		} = invoiceData;

		// Minimal validation here, more thorough validation can happen in controller or dedicated validator
		if (!userId) {
			throw new BadRequestError("User ID is required for invoice creation.");
		}
		if (!itemList || itemList.length === 0) {
			throw new BadRequestError("Invoice must contain at least one item.");
		}

		// It's good practice to create a unique ID outside the model, or let Firestore generate it.
		// If your Invoice model already generates an ID, that's fine.
		// If not, you might want to use something like crypto.randomUUID()
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
			"Pending", // Default status
			itemList
		);

		const invoiceObj = newInvoice.toFirestore();

		// Use the service's db instance and handle potential Firestore errors
		await db.collection("invoices").doc(newInvoice.id).set(invoiceObj);

		return newInvoice; // Return the created Invoice object
	}

	/**
	 * Retrieves all invoices for a specific user.
	 * @param {string} userId - The ID of the user whose invoices to fetch.
	 * @returns {Promise<Invoice[]>} - An array of Invoice objects.
	 */
	static async getUserInvoices(userId) {
		if (!userId) {
			throw new BadRequestError("User ID is required to fetch invoices.");
		}

		const invoicesRef = db.collection("invoices");
		const snapshot = await invoicesRef.where("userId", "==", userId).get();

		if (snapshot.empty) {
			// It's often better to return an empty array for "not found" than a 404,
			// unless the user ID itself is invalid. The controller can decide the status.
			return [];
		}

		const invoices = [];
		snapshot.forEach(doc => {
			// Assuming Invoice.fromFirestore correctly creates an Invoice object
			invoices.push(Invoice.fromFirestore(doc));
		});

		return invoices;
	}

	/**
	 * Retrieves a single invoice by its ID.
	 * @param {string} invoiceId - The ID of the invoice to fetch.
	 * @returns {Promise<Invoice>} - The Invoice object.
	 */
	static async getInvoiceById(invoiceId) {
		if (!invoiceId) {
			throw new BadRequestError("Invoice ID is required.");
		}

		const doc = await db.collection("invoices").doc(invoiceId).get();
		if (!doc.exists) {
			throw new NotFoundError("Invoice not found.");
		}

		return Invoice.fromFirestore(doc);
	}

	/**
	 * Updates an existing invoice.
	 * @param {string} invoiceId - The ID of the invoice to update.
	 * @param {object} updateData - The data to update.
	 * @returns {Promise<Invoice>} - The updated Invoice object.
	 */
	static async updateInvoice(invoiceId, updateData) {
		if (!invoiceId) {
			throw new BadRequestError("Invoice ID is required for update.");
		}

		const userRef = db.collection("invoices").doc(invoiceId);
		const doc = await userRef.get();

		if (!doc.exists) {
			throw new NotFoundError("Invoice not found.");
		}

		// Prepare update data, ensuring only valid fields are passed.
		// This is a crucial step for security to prevent unintended updates.
		const allowedUpdates = {};
		// Add checks for each field if necessary, or rely on the Invoice model's structure.
		if (updateData.streetAddress !== undefined)
			allowedUpdates.streetAddress = updateData.streetAddress;
		if (updateData.city !== undefined) allowedUpdates.city = updateData.city;
		if (updateData.postCode !== undefined)
			allowedUpdates.postCode = updateData.postCode;
		if (updateData.country !== undefined)
			allowedUpdates.country = updateData.country;
		if (updateData.clientName !== undefined)
			allowedUpdates.clientName = updateData.clientName;
		if (updateData.clientEmail !== undefined)
			allowedUpdates.clientEmail = updateData.clientEmail;
		if (updateData.clientStreetAddress !== undefined)
			allowedUpdates.clientStreetAddress = updateData.clientStreetAddress;
		if (updateData.clientCity !== undefined)
			allowedUpdates.clientCity = updateData.clientCity;
		if (updateData.clientPostCode !== undefined)
			allowedUpdates.clientPostCode = updateData.clientPostCode;
		if (updateData.clientCountry !== undefined)
			allowedUpdates.clientCountry = updateData.clientCountry;
		if (updateData.invoiceDate !== undefined)
			allowedUpdates.invoiceDate = updateData.invoiceDate;
		if (updateData.dueDate !== undefined)
			allowedUpdates.dueDate = updateData.dueDate;
		if (updateData.projectDescription !== undefined)
			allowedUpdates.projectDescription = updateData.projectDescription;
		if (updateData.itemList !== undefined)
			allowedUpdates.itemList = updateData.itemList;
		// Note: You might want to control whether 'status' can be updated here or via a separate endpoint.

		if (Object.keys(allowedUpdates).length === 0) {
			throw new BadRequestError("No valid fields provided for update.");
		}

		await userRef.update(allowedUpdates);

		// Fetch and return the updated invoice
		const updatedUserDoc = await userRef.get();
		return Invoice.fromFirestore(updatedUserDoc);
	}

	/**
	 * Marks an invoice as Paid.
	 * @param {string} invoiceId - The ID of the invoice to update.
	 * @param {string} status - The status to set (should be 'Paid').
	 */
	static async markAsPaid(invoiceId, status) {
		if (!invoiceId) {
			throw new BadRequestError("Invoice ID is required to mark as paid.");
		}
		if (status !== "Paid") {
			throw new BadRequestError(
				"Status must be 'Paid' to mark invoice as paid."
			);
		}

		const invoiceRef = db.collection("invoices").doc(invoiceId);
		const doc = await invoiceRef.get();

		if (!doc.exists) {
			throw new NotFoundError("Invoice not found.");
		}

		await invoiceRef.update({ status: status });
		// You might want to fetch and return the updated invoice here too
	}

	/**
	 * Deletes an invoice by its ID.
	 * @param {string} invoiceId - The ID of the invoice to delete.
	 */
	static async deleteInvoice(invoiceId) {
		if (!invoiceId) {
			throw new BadRequestError("Invoice ID is required to delete.");
		}

		const invoiceRef = db.collection("invoices").doc(invoiceId);
		const doc = await invoiceRef.get();

		if (!doc.exists) {
			throw new NotFoundError("Invoice not found.");
		}

		await invoiceRef.delete();
	}
}

module.exports = InvoiceService;
