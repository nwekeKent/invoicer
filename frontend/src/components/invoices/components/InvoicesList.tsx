"use client";

import React from "react";
import Card from "@/components/shared/Card";
// import { invoices } from "@/data/mock";
import styles from "../Invoices.module.scss";
import { StatusPill } from "@/components/shared/StatusPill";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useInvoice } from "@/context/InvoiceContext";

interface ItemList {
	price: number;
	total: number;
}

interface Item {
	status: "Pending" | "Paid";
	id: string;
	dueDate: string;
	itemList: ItemList[];
	clientName: string;
}

const sumTotal = (items: { total: number }[]) => {
	return items.reduce((acc, item) => acc + item.total, 0);
};

const InvoicesList = () => {
	const { invoices, invoiceFilter } = useInvoice();

	function filterByStatus(arr: Item[]) {
		if (invoiceFilter === "All") {
			return arr;
		}
		return arr.filter(item => item.status === invoiceFilter);
	}

	const router = useRouter();
	return (
		<div className={styles.invoices__list}>
			{filterByStatus(invoices).map(invoice => {
				const { id, clientName, dueDate, status, itemList } = invoice;
				return (
					<Card
						containerClass={styles.single__invoice}
						key={id}
						handleClick={() => router.push(`/invoice-details?id=${id}`)}
					>
						<div className={styles.single__invoice_top}>
							<p className="bold-black-text">
								<span>#</span>
								{id}
							</p>
							<div>
								{" "}
								<p className="small-faded-purple-text">Due {dueDate}</p>
								<p className="bold-black-text">$ {sumTotal(itemList)}</p>
							</div>
						</div>
						<div className={styles.single__invoice_bottom}>
							<p className="alt-small-faded-purple">{clientName}</p>
							<p className="bold-black-text">$ {sumTotal(itemList)}</p>
							<StatusPill status={status} />

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
