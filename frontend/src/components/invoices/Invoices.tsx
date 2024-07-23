import React from "react";
import InvoicesHeader from "./InvoicesHeader";
import styles from "./Invoices.module.scss";
import InvoicesList from "./components/InvoicesList";

const Invoices = () => {
	return (
		<section className={styles.invoice__page}>
			<InvoicesHeader />
			<InvoicesList />
		</section>
	);
};

export default Invoices;
