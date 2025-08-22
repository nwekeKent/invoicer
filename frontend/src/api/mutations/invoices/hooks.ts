import { useMutation } from "@tanstack/react-query";
import {
	InvoicePayload,
	PaidInvoicePayload,
	createInvoice,
	updateInvoice,
	markAsPaid,
	deleteInvoice,
} from "@/api";
import { RequestResponse } from "@/types";

export const useCreateInvoice = () => {
	return useMutation<RequestResponse, Error, InvoicePayload>({
		mutationFn: payload => createInvoice(payload),
	});
};

export const useUpdateInvoice = (id: string) => {
	return useMutation<RequestResponse, Error, InvoicePayload>({
		mutationFn: payload => updateInvoice(id, payload),
	});
};

export const useDeleteInvoice = (id: string) => {
	return useMutation<RequestResponse, Error>({
		mutationFn: () => deleteInvoice(id),
	});
};

export const usePaidInvoice = (id: string) => {
	return useMutation<RequestResponse, Error, PaidInvoicePayload>({
		mutationFn: payload => markAsPaid(id, payload),
	});
};
