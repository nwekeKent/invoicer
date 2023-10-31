"use client";

import React from "react";
import Card from "@/app/shared/Card";
import { invoices } from "@/data/mock";
import styles from "../Invoices.module.scss";
import { StatusPill } from "@/app/shared/StatusPill";
import Image from "next/image";
import { useMediaQuery } from "react-responsive";

const InvoicesList = () => {
	const isMobile = useMediaQuery({
		query: "(max-width: 650px)",
	});
	return (
		<div className={styles.invoices__list}>
			{invoices.map(invoice => {
				const { id, name, dueDate, invoiceStatus, amount } = invoice;
				return (
					<Card containerClass={styles.single__invoice} key={id}>
						<div className={styles.single__invoice_top}>
							<p className="bold-black-text">
								<span>#</span>
								{id}
							</p>
							<div>
								{" "}
								<p className="small-faded-purple-text">Due {dueDate}</p>
								<p className="bold-black-text">$ {amount}</p>
							</div>
						</div>
						<div className={styles.single__invoice_bottom}>
							<p className="alt-small-faded-purple">{name}</p>
							<p className="bold-black-text">$ {amount}</p>
							<StatusPill status={invoiceStatus} />

							<Image
								src={"/assets/svg/invoices/arrow-right.svg"}
								alt="arrow-right"
								height={7}
								width={10}
							/>
						</div>
					</Card>
				);
			})}
		</div>
	);
};

export default InvoicesList;
