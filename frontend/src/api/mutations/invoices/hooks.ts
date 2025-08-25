import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
	InvoicePayload,
	PaidInvoicePayload,
	createInvoice,
	updateInvoice,
	markAsPaid,
	deleteInvoice,
} from "@/api";
import { RequestResponse } from "@/types";
import { Toast } from "@/components/shared/Toast";
import { invoiceQueryKeys } from "@/api";
import { useRouter } from "next/router";

export const useCreateInvoice = () => {
	const queryClient = useQueryClient();
	return useMutation<RequestResponse, Error, InvoicePayload>({
		mutationFn: payload => createInvoice(payload),
		onSuccess: response => {
			queryClient.invalidateQueries({
				queryKey: [invoiceQueryKeys.GET_INVOICES],
			});
			Toast.fire({
				icon: "success",
				title: response.message || "Invoice created successfully!",
			});
		},
		onError: (error: Error) => {
			Toast.fire({
				icon: "error",
				title: error.message || "Failed to create Invoice!",
			});
		},
	});
};

export const useUpdateInvoice = (id: string) => {
	const queryClient = useQueryClient();
	return useMutation<RequestResponse, Error, InvoicePayload>({
		mutationFn: payload => updateInvoice(id, payload),
		onSuccess: response => {
			queryClient.invalidateQueries({
				queryKey: [invoiceQueryKeys.GET_INVOICE, id],
			});
			Toast.fire({
				icon: "success",
				title: response.message || "Invoice updated successfully!",
			});
		},
		onError: (error: Error) => {
			Toast.fire({
				icon: "error",
				title: error.message || "Failed to update Invoice!",
			});
		},
	});
};

export const useDeleteInvoice = (id: string) => {
	const queryClient = useQueryClient();
	const router = useRouter();
	return useMutation<RequestResponse, Error>({
		mutationFn: () => deleteInvoice(id),
		onSuccess: response => {
			queryClient.invalidateQueries({
				queryKey: [invoiceQueryKeys.GET_INVOICES],
			});
			Toast.fire({
				icon: "success",
				title: response.message || "Invoice deleted successfully!",
			});
			router.push("/invoices");
		},
		onError: (error: Error) => {
			Toast.fire({
				icon: "error",
				title: error.message || "Failed to delete Invoice!",
			});
		},
	});
};

export const usePaidInvoice = (id: string) => {
	const queryClient = useQueryClient();
	return useMutation<RequestResponse, Error, PaidInvoicePayload>({
		mutationFn: payload => markAsPaid(id, payload),
		onSuccess: response => {
			queryClient.invalidateQueries({
				queryKey: [invoiceQueryKeys.GET_INVOICE, id],
			});
			Toast.fire({
				icon: "success",
				title: response.message || "Invoice created successfully!",
			});
		},
		onError: (error: Error) => {
			Toast.fire({
				icon: "error",
				title: error.message || "Failed to create Invoice!",
			});
		},
	});
};
