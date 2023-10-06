"use client";

import React, { useState } from "react";
import styles from "../Invoices.module.scss";
import Image from "next/image";

const InvoiceFilter = () => {
	const [filterActive, setFilterActive] = useState(false);

	const handleToggle = () => {
		setFilterActive(prev => !prev);
	};
	return (
		<div className={styles.invoices__filter}>
			<div className={styles.filter__text} onClick={handleToggle}>
				{" "}
				Filter by status{" "}
				<span>
					<Image
						src={"/assets/svg/invoices/arrow-down.svg"}
						width={10}
						height={7}
						alt="plus-svg"
					/>
				</span>
			</div>

			{filterActive && <div className={styles.filter__div}></div>}
		</div>
	);
};

export default InvoiceFilter;
