import Invoices from "@/components/invoices/Invoices";
import EmptyInvoice from "@/components/invoices/components/EmptyInvoice";
import { invoices } from "@/data/mock";
import React from "react";

export default function Home() {
	const totalInvoice = invoices.length;

	return (
		<React.Fragment>
			{totalInvoice > 0 ? <Invoices /> : <EmptyInvoice />}
		</React.Fragment>
	);
}
