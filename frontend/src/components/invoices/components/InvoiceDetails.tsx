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
		</section>
	);
};

export default InvoiceDetails;
