"use client";

import DeleteInvoice from "@/components/invoices/components/invoice-crud/DeleteInvoice";
import { InvoiceCrud } from "@/components/invoices/components/invoice-crud/InvoiceCrud";
import InvoiceDetails from "@/components/invoices/components/InvoiceDetails";
import Modal from "@/components/shared/Modal";
import React, { useState } from "react";

export default function Home() {
	const [editInvoice, setEditInvoice] = useState(false);
	const [deleteInvoice, setDeleteInvoice] = useState(false);
	const [editAction, setEditAction] = useState(false);

	return (
		<React.Fragment>
			<InvoiceDetails
				setEditInvoice={setEditInvoice}
				setDeleteInvoice={setDeleteInvoice}
				editAction={editAction}
				setEditAction={setEditAction}
			/>
			{editInvoice && (
				<InvoiceCrud
					setEditAction={setEditAction}
					setEditInvoice={setEditInvoice}
				/>
			)}
			{deleteInvoice && (
				<Modal>
					<DeleteInvoice setDeleteInvoice={setDeleteInvoice} />
				</Modal>
			)}
		</React.Fragment>
	);
}
