import InvoiceDetails from "@/components/invoices/components/InvoiceDetails";
import { invoices } from "@/data/mock";
import React from "react";

export default function Home() {
	const totalInvoice = invoices.length;

	return (
		<React.Fragment>
			<InvoiceDetails />
		</React.Fragment>
	);
}
