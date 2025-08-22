export const endpoints = {
	createInvoice: "/invoices",
	updateInvoice: (id: string) => `/invoices/${id}`,
	deleteInvoice: (id: string) => `/invoices/${id}/delete`,
	markAsPaid: (id: string) => `/invoices/${id}/status`,
};
