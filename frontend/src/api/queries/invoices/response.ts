import { RequestResponse, InvoiceData } from "@/types";

export type InvoiceResponse = RequestResponse<InvoiceData>;
export type InvoicesResponse = RequestResponse<InvoiceData[]>;
