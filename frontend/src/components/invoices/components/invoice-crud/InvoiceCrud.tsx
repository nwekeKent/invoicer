import React from "react";
import styles from "../../Invoices.module.scss";
import NewInvoice from "./NewInvoice";

export const InvoiceCrud = () => {
	return (
		<div className={styles.invoice__crud}>
			<div className={styles.crud__card}>
				<NewInvoice />

				<div className={styles.crud__cta}>
					<button className="button__edit">Cancel</button>
					<button className="button__primary">Save & Send</button>
				</div>
			</div>
		</div>
	);
};
