import React from "react";
import InvoicesHeader from "./InvoicesHeader";
import EmptyInvoice from "./EmptyInvoice";
import styles from "./Invoices.module.scss";

const Invoices = () => {
	return (
		<section className={styles.invoice__page}>
			<InvoicesHeader />
			<EmptyInvoice />
		</section>
	);
};

export default Invoices;
