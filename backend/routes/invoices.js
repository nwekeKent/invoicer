const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken");
const invoicesController = require("../controllers/invoicesController");

// Create a new user
router.post("/:userId/invoices", verifyToken, invoicesController.createInvoice);

// Get all user Invoices
router.get(
	"/:userId/invoices",
	verifyToken,
	invoicesController.getUserInvoices
);

//get single invoice by id
router.get("/invoices/:id", verifyToken, invoicesController.getInvoiceById);

// edit single invoice
router.put(
	"/:userId/invoices/:id",
	verifyToken,
	invoicesController.updateInvoice
);

// mark invoice as paid
router.patch(
	"/invoices/:id/status",
	verifyToken,
	invoicesController.markAsPaid
);

//delete single invoice
router.delete(
	"/invoices/:id/delete",
	verifyToken,
	invoicesController.deleteInvoice
);
module.exports = router;
