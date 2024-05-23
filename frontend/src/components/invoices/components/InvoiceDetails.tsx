"use client";

import React from "react";
import Card from "@/app/shared/Card";
import { invoices } from "@/data/mock";
import styles from "../Invoices.module.scss";
import { StatusPill } from "@/app/shared/StatusPill";
import Image from "next/image";

const InvoiceDetails = () => {
	return (
		<section className={styles.invoice__details}>
			<div className={styles.action__details}>
				<Image
					src={"/assets/svg/invoices/arrow-left.svg"}
					width={9}
					height={11}
					alt="plus-svg"
				/>
				<p className="alt-bold-purple">Go back</p>
			</div>

			<Card containerClass={styles.actions__card}>
				<div className={styles.actions__card__left}>
					<p className={styles.statusp}>Status</p>
					<StatusPill status={"pending"} />
				</div>
				<div className={styles.actions__card__right}>
					<button className="button__edit">Edit</button>
					<button className="button__delete">Delete</button>
					<button className="button__primary">Mark as Paid</button>
				</div>
			</Card>

			<Card containerClass={styles.invoice__details__card}>hh</Card>
		</section>
	);
};

export default InvoiceDetails;
