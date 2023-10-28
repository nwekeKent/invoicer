"use client";

import React from "react";
import styles from "./Invoices.module.scss";
import SVG from "react-inlinesvg";
import Image from "next/image";
import InvoiceFilter from "./components/InvoiceFilter";
import Checkbox from "@/app/shared/Checkbox";

const InvoicesHeader = () => {
	return (
		<header className={styles.invoices__header}>
			<div className={styles.invoices__header__left}>
				<h3>Invoices</h3>
				<small className="small-para-grey">There are 7 total invoices</small>
			</div>
			<div className={styles.invoices__header__right}>
				<InvoiceFilter />
				<button className="button__add-new" type="button">
					<Image
						src={"/assets/svg/invoices/plus-sign.svg"}
						width={32}
						height={32}
						alt="plus-svg"
					/>
					New Invoice
				</button>
			</div>
		</header>
	);
};

export default InvoicesHeader;
