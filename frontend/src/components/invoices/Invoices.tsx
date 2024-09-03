import React from "react";
import styles from "./Invoices.module.scss";
import InvoicesList from "./components/InvoicesList";

interface MyComponentProps {
	invoices: any;
}

const Invoices = ({ invoices }: MyComponentProps) => {
	return (
		<section className={styles.invoice__page}>
			<InvoicesList invoices={invoices} />
		</section>
	);
};

export default Invoices;
