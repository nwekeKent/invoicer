import React from "react";
import styles from "../../Invoices.module.scss";
import Card from "@/components/shared/Card";
import { invoices } from "@/data/mock";

const mockItems = [
	{
		itemName: "Banner Design",
		qty: 1,
		price: 156,
	},
	{
		itemName: "Banner Design",
		qty: 1,
		price: 156,
	},
];

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
				<div className={styles.invoiceDate}>
					<div>
						<p className="small-para-grey">Graphic Design</p>
						<h1 className="bold-black-text">{invoices[0].dueDate}</h1>
					</div>

					<div>
						<p className="small-para-grey">Graphic Design</p>
						<h1 className="bold-black-text ">{invoices[0].dueDate}</h1>
					</div>
				</div>

				<div className={styles.billTo}>
					<p className="small-para-grey">Bill To</p>
					<h1 className="bold-black-text ">Alex Grim</h1>
					<p className="small-para-grey">Graphic Design</p>
					<p className="small-para-grey">Graphic Design</p>
					<p className="small-para-grey">Graphic Design</p>
					<p className="small-para-grey">Graphic Design</p>
				</div>

				<div>
					<p className="small-para-grey">Sent To</p>
					<h1 className="bold-black-text ">alexgrim@mail.com</h1>
				</div>
			</div>

			<div className={styles.invoiceBreakdown}>
				<div>
					<div className={styles.breakdown__header}>
						<p className="small-para-grey">Item Name</p>

						<div className={styles.breakdown__pricing}>
							<p className="small-para-grey">QTY.</p>
							<p className="small-para-grey">Price</p>
							<p className="small-para-grey">Total</p>
						</div>
					</div>

					{mockItems.map((item, index) => {
						return (
							<React.Fragment key={index}>
								<div className={styles.breakdown__list}>
									<h1 className="bold-black-text ">{item.itemName}</h1>

									<div className={styles.breakdown__pricing}>
										<h1 className="bold-black-text ">{item.qty}</h1>
										<h1 className="bold-black-text ">${item.price}</h1>
										<h1 className="bold-black-text ">$100</h1>
									</div>
								</div>

								<div className={styles.breakdown__list__m}>
									<div>
										{" "}
										<h1 className="bold-black-text ">{item.itemName}</h1>
										<h1 className="bold-black-text ">
											{item.qty} x ${item.price}
										</h1>
									</div>

									<h1 className="bold-black-text ">$100</h1>
								</div>
							</React.Fragment>
						);
					})}
				</div>

				<div>
					<small>Amount Due</small>
					<h3>$556.00</h3>
				</div>
			</div>
		</Card>
	);
};

export default DetailsCard;
