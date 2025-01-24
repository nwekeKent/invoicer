"use client";

import DeleteInvoice from "@/components/invoices/components/invoice-crud/DeleteInvoice";
import { InvoiceCrud } from "@/components/invoices/components/invoice-crud/InvoiceCrud";
import InvoiceDetails from "@/components/invoices/components/InvoiceDetails";
import Modal from "@/components/shared/Modal";
import React from "react";
import { AnimatePresence } from "framer-motion";
import { useInvoice } from "@/context/InvoiceContext";

export default function Home() {
	const { isEditInvoiceOpen, isDeleteModalOpen } = useInvoice();

	return (
		<React.Fragment>
			<InvoiceDetails />
			{isEditInvoiceOpen && <InvoiceCrud />}
			<AnimatePresence>
				{isDeleteModalOpen && (
					<Modal>
						<DeleteInvoice />
					</Modal>
				)}
			</AnimatePresence>
		</React.Fragment>
	);
}
