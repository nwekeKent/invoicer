import axiosInstance from "@/lib/axios-instance";
import { endpoints } from "./endpoint";
import { InvoicePayload, PaidInvoicePayload } from "@/api";
import { RequestResponse } from "@/types";

export const createInvoice = async (
	payload: InvoicePayload
): Promise<RequestResponse> => {
	const response = await axiosInstance.post<RequestResponse>(
		endpoints.createInvoice,
		payload
	);
	return response.data;
};

export const updateInvoice = async (
	id: string,
	payload: InvoicePayload
): Promise<RequestResponse> => {
	const response = await axiosInstance.patch<RequestResponse>(
		endpoints.updateInvoice(id),
		payload
	);
	return response.data;
};

export const markAsPaid = async (
	id: string,
	payload: PaidInvoicePayload
): Promise<RequestResponse> => {
	const response = await axiosInstance.patch<RequestResponse>(
		endpoints.markAsPaid(id),
		payload
	);
	return response.data;
};

export const deleteInvoice = async (id: string): Promise<RequestResponse> => {
	const response = await axiosInstance.delete<RequestResponse>(
		endpoints.deleteInvoice(id)
	);
	return response.data;
};
