"use client";

import React, { useState } from "react";
import styles from "../Invoices.module.scss";
import Image from "next/image";
import Checkbox from "@/components/shared/Checkbox";
import { useMediaQuery } from "react-responsive";

const InvoiceFilter = () => {
	const [filterActive, setFilterActive] = useState(false);

	const isMobile = useMediaQuery({
		query: "(max-width: 650px)",
	});

	const handleToggle = () => {
		setFilterActive(prev => !prev);
	};
	return (
		<div className={styles.invoices__filter}>
			<div className={styles.filter__text} onClick={handleToggle}>
				{" "}
				{isMobile ? "Filter" : "Filter by status"}
				<span>
					<Image
						src={"/assets/svg/invoices/arrow-down.svg"}
						width={10}
						height={7}
						alt="plus-svg"
						className={filterActive ? styles.image__rotate : ""}
					/>
				</span>
			</div>

			{filterActive && (
				<div className={styles.filter__div}>
					<Checkbox label="Draft" />
					<Checkbox label="Pending" />
					<Checkbox label="Paid" />
				</div>
			)}
		</div>
	);
};

export default InvoiceFilter;
