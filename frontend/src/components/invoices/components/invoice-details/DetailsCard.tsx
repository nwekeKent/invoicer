import React from "react";
import styles from "../../Invoices.module.scss";
import Card from "@/components/shared/Card";
import { invoices } from "@/data/mock";

const DetailsCard = () => {
	return (
		<Card containerClass={styles.invoice__details__card}>
			<div className={styles.details__card_top}>
				<div>
					<p className="bold-black-text">
						<span>#</span>
						{invoices[0].id}
					</p>
					<p className="small-para-grey">Graphic Design</p>
				</div>

				<div style={{ textAlign: "right" }}>
					<p className="small-para-grey">Graphic Design</p>
					<p className="small-para-grey">Graphic Design</p>
					<p className="small-para-grey">Graphic Design</p>
					<p className="small-para-grey">Graphic Design</p>
				</div>
			</div>
			<div className={styles.details__card_bottom}>
				<div className="flex flex-col bg-slate-500">
					<div>
						<p className="small-para-grey">Graphic Design</p>
						<h1 className="bold-black-text mt-[13px]">{invoices[0].dueDate}</h1>
					</div>

					<div className="mt-[31px]">
						<p className="small-para-grey">Graphic Design</p>
						<h1 className="bold-black-text mt-[13px]">{invoices[0].dueDate}</h1>
					</div>
				</div>
			</div>
		</Card>
	);
};

export default DetailsCard;
