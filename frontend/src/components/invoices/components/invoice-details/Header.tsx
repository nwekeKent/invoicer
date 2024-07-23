import React from "react";
import styles from "../../Invoices.module.scss";
import { StatusPill } from "@/components/shared/StatusPill";
import Image from "next/image";
import Card from "@/components/shared/Card";
import { invoices } from "@/data/mock";

const Header = () => {
	return (
		<div>
			{" "}
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
					<p className={styles.statusp}>status</p>
					<StatusPill status={invoices[0].invoiceStatus} />
				</div>
				<div className={styles.actions__card__right}>
					<button className="button__edit">Edit</button>
					<button className="button__delete">Delete</button>
					{invoices[0].invoiceStatus !== "paid" && (
						<button className="button__primary">Mark as Paid</button>
					)}
				</div>
			</Card>
		</div>
	);
};

export default Header;
