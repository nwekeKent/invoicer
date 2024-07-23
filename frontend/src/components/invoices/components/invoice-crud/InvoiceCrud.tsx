import React from "react";
import styles from "../../Invoices.module.scss";
import NewInvoice from "./NewInvoice";

export const InvoiceCrud = () => {
	return (
		<div className={styles.invoice__crud}>
			<div className={styles.crud__card}>
				<NewInvoice />
			</div>
		</div>
	);
};
