import Invoices from "@/components/invoices/Invoices";
import EmptyInvoice from "@/components/invoices/components/EmptyInvoice";
import { InvoiceCrud } from "@/components/invoices/components/invoice-crud/InvoiceCrud";
import Modal from "@/components/shared/Modal";
import { invoices } from "@/data/mock";
import React from "react";

export default function Home() {
	const totalInvoice = invoices.length;

	return (
		<React.Fragment>
			{totalInvoice > 0 ? <Invoices /> : <EmptyInvoice />}
			<InvoiceCrud />
			{/* <Modal>
				<p>testing</p>
			</Modal> */}
		</React.Fragment>
	);
}
