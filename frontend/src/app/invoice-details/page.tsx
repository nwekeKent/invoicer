"use client";

import DeleteInvoice from "@/components/invoices/components/invoice-crud/DeleteInvoice";
import { InvoiceCrud } from "@/components/invoices/components/invoice-crud/InvoiceCrud";
import InvoiceDetails from "@/components/invoices/components/InvoiceDetails";
import Modal from "@/components/shared/Modal";
import React from "react";
import { AnimatePresence } from "framer-motion";
import { useModalManager } from "@/hooks";

export default function Home() {
	const { activeModal } = useModalManager();

	return (
		<React.Fragment>
			<InvoiceDetails />
			{activeModal === "edit-invoice" && <InvoiceCrud />}
			<AnimatePresence>
				{activeModal === "delete-invoice" && (
					<Modal>
						<DeleteInvoice />
					</Modal>
				)}
			</AnimatePresence>
		</React.Fragment>
	);
}
