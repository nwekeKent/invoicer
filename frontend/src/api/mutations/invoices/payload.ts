import { InvoiceItem } from "@/types";

export type InvoicePayload = {
	streetAddress: string;
	city: string;
	postCode: string;
	country: string;
	clientName: string;
	clientEmail: string;
	clientStreetAddress: string;
	clientCity: string;
	clientPostCode: string;
	clientCountry: string;
	currency: "USD" | "EUR" | "GBP" | "NGN";
	invoiceDate: string;
	dueDate: string;
	projectDescription: string;
	itemList: InvoiceItem[];
};

export type PaidInvoicePayload = {
	status: "Paid";
};
