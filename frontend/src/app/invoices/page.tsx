"use client";

import React from "react";
import Invoices from "@/components/invoices/Invoices";
import EmptyInvoice from "@/components/invoices/components/EmptyInvoice";
import { InvoiceCrud } from "@/components/invoices/components/invoice-crud/InvoiceCrud";
import InvoicesHeader from "@/components/invoices/InvoicesHeader";
import Loader from "@/components/shared/Loader";
import { AnimatePresence } from "framer-motion";
import { useInvoices } from "@/api";
import { useModalManager } from "@/hooks";

export default function InvoicesPage() {
	const { data: invoices, isLoading } = useInvoices();
	const { activeModal } = useModalManager();

	if (isLoading) return <Loader />;

	return (
		<React.Fragment>
			<InvoicesHeader invoiceLength={invoices?.length || 0} />
			{invoices && invoices?.length > 0 ? <Invoices /> : <EmptyInvoice />}
			<AnimatePresence>
				{activeModal === "new-invoice" && <InvoiceCrud />}
			</AnimatePresence>
		</React.Fragment>
	);
}
