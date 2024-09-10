"use client";

import React from "react";
import styles from "./Invoices.module.scss";
import Image from "next/image";
import InvoiceFilter from "./components/InvoiceFilter";
import { useMediaQuery } from "react-responsive";

interface MyComponentProps {
	invoiceLength: number;
	setNewInvoice: React.Dispatch<React.SetStateAction<boolean>>;
	setInvoiceFilter: React.Dispatch<React.SetStateAction<string>>;
	invoiceFilter: string;
}

const InvoicesHeader = ({
	invoiceLength,
	setNewInvoice,
	setInvoiceFilter,
	invoiceFilter,
}: MyComponentProps) => {
	const isMobile = useMediaQuery({
		query: "(max-width: 650px)",
	});

	return (
		<header className={styles.invoices__header}>
			<div className={styles.invoices__header__left}>
				<h3>Invoices</h3>
				<small className="small-para-grey">
					{isMobile
						? `${invoiceLength} Invoices`
						: `There are ${invoiceLength} total invoices`}
				</small>
			</div>
			<div className={styles.invoices__header__right}>
				<InvoiceFilter
					setInvoiceFilter={setInvoiceFilter}
					invoiceFilter={invoiceFilter}
				/>

				<button
					className="button__add-new"
					type="button"
					onClick={() => setNewInvoice(true)}
				>
					<Image
						src={"/assets/svg/invoices/plus-sign.svg"}
						width={32}
						height={32}
						alt="plus-svg"
					/>
					{isMobile ? "New" : "New Invoice"}
				</button>
			</div>
		</header>
	);
};

export default InvoicesHeader;
