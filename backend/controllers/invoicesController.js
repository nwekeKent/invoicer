const UserService = require("../services/userService");
const InvoiceService = require("../services/invoiceService");
const SuccessResponse = require("../utils/successResponse");

const { BadRequestError } = require("../utils/apiErrors");

exports.createInvoice = async (req, res) => {
	// Get userId from the authenticated user's request object
	const userId = req.auth.uid;

	const requiredFields = [
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

	for (const field of requiredFields) {
		if (!req.body[field]) {
			throw new BadRequestError(`${field} is a required field.`);
		}
	}
	if (!Array.isArray(req.body.itemList) || req.body.itemList.length === 0) {
		throw new BadRequestError("Invoice must contain at least one item.");
	}

	const invoiceData = { userId, ...req.body };

	const newInvoice = await InvoiceService.createInvoice(invoiceData);
	SuccessResponse.created(res, newInvoice, "Invoice created successfully.");
};

exports.getUserInvoices = async (req, res) => {
	// Get userId from the authenticated user's request object
	const userId = req.auth.uid;

	await UserService.getUserById(userId);

	const userInvoices = await InvoiceService.getUserInvoices(userId);
	SuccessResponse.ok(res, userInvoices, "User invoices fetched successfully.");
};

exports.getInvoiceById = async (req, res) => {
	// Invoice ID comes from route params
	const invoiceId = req.params.id;

	const invoice = await InvoiceService.getInvoiceById(invoiceId);
	SuccessResponse.ok(res, invoice, "Invoice fetched successfully.");
};

exports.updateInvoice = async (req, res) => {
	const invoiceId = req.params.id; // Assuming invoice ID is in params
	// Optionally, you might want to verify that the logged-in user owns this invoice,
	// which would involve fetching the invoice and checking req.auth.uid against invoice.userId.

	// Controller validation for incoming update data (similar to createInvoice)
	const allowedUpdates = [
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
	const updateData = {};
	let hasValidUpdate = false;
	for (const field of allowedUpdates) {
		if (req.body[field] !== undefined) {
			updateData[field] = req.body[field];
			hasValidUpdate = true;
		}
	}

	if (!hasValidUpdate) {
		throw new BadRequestError("No valid fields provided for update.");
	}

	const updatedInvoice = await InvoiceService.updateInvoice(
		invoiceId,
		updateData
	);

	SuccessResponse.ok(res, updatedInvoice, "Invoice updated successfully.");
};

exports.markAsPaid = async (req, res) => {
	const invoiceId = req.params.id;
	const { status } = req.body; // Expecting 'Paid' in the body

	await InvoiceService.markAsPaid(invoiceId, status);

	SuccessResponse.ok(res, null, "Invoice status updated to paid successfully.");
};

exports.deleteInvoice = async (req, res) => {
	const invoiceId = req.params.id;

	await InvoiceService.deleteInvoice(invoiceId);
	// Use noContent for successful deletion
	SuccessResponse.noContent(res);
};
