const { db } = require("../database/database");
const Invoice = require("../models/invoice");
const { NotFoundError, BadRequestError } = require("../utils/apiErrors");

class InvoiceService {
	/**
	 * Creates a new invoice in Firestore.
	 * @param {object} invoiceData - Data for the new invoice.
	 * @returns {Promise<Invoice>} - The created Invoice object.
	 */
	static async createInvoice(invoiceData) {
		const { userId, itemList } = invoiceData;

		if (!userId) {
			throw new BadRequestError("User ID is required for invoice creation.");
		}
		if (!itemList || itemList.length === 0) {
			throw new BadRequestError("Invoice must contain at least one item.");
		}

		const newInvoice = new Invoice({
			...invoiceData,
			status: "Pending",
		});

		const invoiceObj = newInvoice.toFirestore();

		await db.collection("invoices").doc(newInvoice.id).set(invoiceObj);

		return newInvoice;
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

		const invoiceRef = db.collection("invoices").doc(invoiceId);
		const doc = await invoiceRef.get();

		if (!doc.exists) {
			throw new NotFoundError("Invoice not found.");
		}

		const allowedFields = [
			"streetAddress",
			"city",
			"postCode",
			"country",
			"clientName",
			"clientEmail",
			"clientStreetAddress",
			"clientCity",
			"clientPostCode",
			"clientCountry",
			"invoiceDate",
			"dueDate",
			"projectDescription",
			"itemList",
		];

		const hasValidUpdate = Object.keys(updateData).some(field =>
			allowedFields.includes(field)
		);

		if (!hasValidUpdate) {
			throw new BadRequestError("No valid fields provided for update.");
		}

		const updatedInvoice = new Invoice({
			...updateData,
			status: "Pending",
		});
		await invoiceRef.update(updatedInvoice.toFirestore());

		// Fetch and return the updated invoice
		const updatedInvoiceDoc = await invoiceRef.get();
		return Invoice.fromFirestore(updatedInvoiceDoc);
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
