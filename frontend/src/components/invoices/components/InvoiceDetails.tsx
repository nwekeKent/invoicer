"use client";

import React from "react";
import styles from "../Invoices.module.scss";
import Header from "./invoice-details/Header";
import DetailsCard from "./invoice-details/DetailsCard";

const InvoiceDetails = () => {
	return (
		<section className={styles.invoice__details}>
			<Header />
			<DetailsCard />

			<div className={styles.header__cta}>
				<button className="button__edit">Edit</button>
				<button className="button__delete">Delete</button>

				<button className="button__primary">Mark as Paid</button>
			</div>
		</section>
	);
};

export default InvoiceDetails;
