import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { getInvoice, getInvoices } from "./request";
import { InvoiceData } from "@/types";
import { invoiceQueryKeys } from "./keys";

export const useInvoices = () => {
	return useQuery({
		queryKey: [invoiceQueryKeys.GET_INVOICES],
		queryFn: getInvoices,
		select: response => response.data,
	});
};

export const useInvoice = (
	id: string | undefined
): UseQueryResult<InvoiceData, Error> => {
	return useQuery({
		queryKey: [invoiceQueryKeys.GET_INVOICE, id],
		queryFn: () => getInvoice(id!),
		// The `enabled` option prevents the query from running if `id` is null or undefined
		enabled: !!id,
		select: response => response.data,
	});
};
