export const endpoints = {
	getAllInvoices: "/invoices",
	getInvoice: (id: string) => `/invoices/${id}`,
	createInvoice: "/invoices",
	updateInvoice: (id: string) => `/invoices/${id}`,
	deleteInvoice: (id: string) => `/invoices/${id}/delete`,
	markAsPaid: (id: string) => `/invoices/${id}/status`,
};
