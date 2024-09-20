"use client";

import React from "react";
import styles from "../../Invoices.module.scss";
import { StatusPill } from "@/components/shared/StatusPill";
import Image from "next/image";
import Card from "@/components/shared/Card";
import { useRouter } from "next/navigation";

interface InvoiceProps {
	invoiceStatus?: "Pending" | "Paid" | undefined;
	setEditInvoice: React.Dispatch<React.SetStateAction<boolean>>;
	setDeleteInvoice: React.Dispatch<React.SetStateAction<boolean>>;
	submitting: boolean;
	markAsPaid: () => void;
}

const Header = ({
	invoiceStatus,
	setEditInvoice,
	setDeleteInvoice,
	submitting,
	markAsPaid,
}: InvoiceProps) => {
	const router = useRouter();
	return (
		<div>
			{" "}
			<div className={styles.action__details} onClick={() => router.back()}>
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
					<p className={styles.statusp}>status</p>
					<StatusPill status={invoiceStatus} />
				</div>
				<div className={styles.actions__card__right}>
					<button className="button__edit" onClick={() => setEditInvoice(true)}>
						Edit
					</button>
					<button
						className="button__delete"
						onClick={() => setDeleteInvoice(true)}
					>
						Delete
					</button>
					{invoiceStatus !== "Paid" && (
						<button className="button__primary" onClick={markAsPaid}>
							{submitting ? "Updating" : "Mark as Paid"}
						</button>
					)}
				</div>
			</Card>
		</div>
	);
};

export default Header;
