import { RequestResponse, InvoiceData } from "@/types";

export type Invoice = {
	invoice: InvoiceData;
};

export type Invoices = {
	invoices: InvoiceData[];
};

export type InvoiceResponse = RequestResponse<Invoice>;
export type InvoicesResponse = RequestResponse<Invoices>;
