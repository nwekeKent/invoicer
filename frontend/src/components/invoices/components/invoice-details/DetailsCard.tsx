import React from "react";
import styles from "../../Invoices.module.scss";
import Card from "@/components/shared/Card";
import { InvoiceData } from "@/types";
import { sumTotal } from "@/utils";

const DetailsCard = ({ invoice }: { invoice: InvoiceData }) => {
	return (
		<Card containerClass={styles.invoice__details__card}>
			<div className={styles.details__card_top}>
				<div>
					<p className="bold-black-text">
						<span>#</span>
						{invoice?.id}
					</p>
					<p className="small-para-grey">{invoice?.projectDescription}</p>
				</div>

				<div className={styles.res__align}>
					<p className="small-para-grey">{invoice?.billFrom?.streetAddress}</p>
					<p className="small-para-grey">{invoice?.billFrom?.city}</p>
					<p className="small-para-grey">{invoice?.billFrom?.postCode}</p>
					<p className="small-para-grey">{invoice?.billFrom?.country}</p>
				</div>
			</div>
			<div className={styles.details__card_bottom}>
				<div className={styles.invoiceDate}>
					<div>
						<p className="small-para-grey">Invoice Date</p>
						<h1 className="bold-black-text">{invoice?.invoiceDate}</h1>
					</div>

					<div>
						<p className="small-para-grey">Payment Due</p>
						<h1 className="bold-black-text ">{invoice?.dueDate}</h1>
					</div>
				</div>

				<div className={styles.billTo}>
					<p className="small-para-grey">Bill To</p>
					<h1 className="bold-black-text ">{invoice?.clientName}</h1>
					<p className="small-para-grey">{invoice?.billTo?.streetAddress}</p>
					<p className="small-para-grey">{invoice?.billTo?.city}</p>
					<p className="small-para-grey">{invoice?.billTo?.postCode}</p>
					<p className="small-para-grey">{invoice?.billTo?.country}</p>
				</div>

				<div>
					<p className="small-para-grey">Sent To</p>
					<h1 className="bold-black-text ">{invoice?.clientEmail}</h1>
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

					{invoice?.itemList.map((item: any, index: number) => {
						return (
							<React.Fragment key={index}>
								<div className={styles.breakdown__list}>
									<h1 className="bold-black-text ">{item.itemName}</h1>

									<div className={styles.breakdown__pricing}>
										<h1 className="bold-black-text ">{item.quantity}</h1>
										<h1 className="bold-black-text ">${item.price}</h1>
										<h1 className="bold-black-text ">${item.total}</h1>
									</div>
								</div>

								<div className={styles.breakdown__list__m}>
									<div>
										{" "}
										<h1 className="bold-black-text ">{item.itemName}</h1>
										<h1 className="bold-black-text ">
											{item.quantity} x ${item.price}
										</h1>
									</div>

									<h1 className="bold-black-text ">${item.total}</h1>
								</div>
							</React.Fragment>
						);
					})}
				</div>

				<div>
					<small>Amount Due</small>
					<h3>${sumTotal(invoice?.itemList)}</h3>
				</div>
			</div>
		</Card>
	);
};

export default DetailsCard;
