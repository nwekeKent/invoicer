import axiosInstance from "@/lib/axios-instance";
import { InvoiceResponse, InvoicesResponse } from "./response";
import { endpoints } from "./endpoints";

export const getInvoices = async (): Promise<InvoicesResponse> => {
	const response = await axiosInstance.get(`${endpoints.getAllInvoices}`);
	return response.data;
};

export const getInvoice = async (id: string): Promise<InvoiceResponse> => {
	const response = await axiosInstance.get(endpoints.getInvoice(id));
	return response.data;
};
