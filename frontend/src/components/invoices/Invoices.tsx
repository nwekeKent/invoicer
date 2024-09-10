import React from "react";
import styles from "./Invoices.module.scss";
import InvoicesList from "./components/InvoicesList";

interface MyComponentProps {
	invoices: any;
	invoiceFilter: string;
}

const Invoices = ({ invoices, invoiceFilter }: MyComponentProps) => {
	return (
		<section className={styles.invoice__page}>
			<InvoicesList invoices={invoices} invoiceFilter={invoiceFilter} />
		</section>
	);
};

export default Invoices;
