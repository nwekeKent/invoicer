import React from "react";
import styles from "../Invoices.module.scss";
import Image from "next/image";

const EmptyInvoice = () => {
	return (
		<div className={styles.invoices__empty}>
			<Image
				src="/assets/svg/invoices/empty-dark.svg"
				alt="invoices-enpty-state"
				width={242}
				height={200}
			/>{" "}
			<h1>There is nothing here</h1>
			<small className="small-para-grey">
				{" "}
				Create an invoice by clicking the <span>New Invoice</span> button and
				get started
			</small>
		</div>
	);
};

export default EmptyInvoice;
