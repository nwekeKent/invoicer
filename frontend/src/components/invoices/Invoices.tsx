import React from "react";
import styles from "./Invoices.module.scss";
import InvoicesList from "./components/InvoicesList";

const Invoices = () => {
	return (
		<section className={styles.invoice__page}>
			<InvoicesList />
		</section>
	);
};

export default Invoices;
