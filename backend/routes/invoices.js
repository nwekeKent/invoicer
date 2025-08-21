const express = require("express");
const router = express.Router();
const verifyTokenMiddleware = require("../middlewares/authMiddleware");
const invoicesController = require("../controllers/invoicesController");

// Create a new Invoice
router.post(
	"/invoices",
	verifyTokenMiddleware,
	invoicesController.createInvoice
);

// Get all user Invoices
router.get(
	"/invoices",
	verifyTokenMiddleware,
	invoicesController.getUserInvoices
);

//get single invoice by id
router.get(
	"/invoices/:id",
	verifyTokenMiddleware,
	invoicesController.getInvoiceById
);

// edit single invoice
router.put(
	"/invoices/:id",
	verifyTokenMiddleware,
	invoicesController.updateInvoice
);

// mark invoice as paid
router.patch(
	"/invoices/:id/status",
	verifyTokenMiddleware,
	invoicesController.markAsPaid
);

//delete single invoice
router.delete(
	"/invoices/:id/delete",
	verifyTokenMiddleware,
	invoicesController.deleteInvoice
);
module.exports = router;
