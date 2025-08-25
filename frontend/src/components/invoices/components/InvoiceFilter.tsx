"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Checkbox from "@/components/shared/Checkbox";
import styles from "../Invoices.module.scss";
import { useMediaQuery } from "react-responsive";
import { useInvoiceFilter } from "@/hooks";

const InvoiceFilter = () => {
	const { filter, setFilter } = useInvoiceFilter();
	const [filterActive, setFilterActive] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null); // for detecting outside click

	const isMobile = useMediaQuery({
		query: "(max-width: 650px)",
	});

	const handleToggle = () => {
		setFilterActive(prev => !prev);
	};

	// Close dropdown when clicking outside
	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node)
			) {
				setFilterActive(false);
			}
		}

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	return (
		<div className={styles.invoices__filter} ref={dropdownRef}>
			<div className={styles.filter__text} onClick={handleToggle}>
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
					<Checkbox
						label="All"
						handleChange={() => setFilter("All")}
						checked={filter === "All"}
					/>
					<Checkbox
						label="Pending"
						handleChange={() => setFilter("Pending")}
						checked={filter === "Pending"}
					/>
					<Checkbox
						label="Paid"
						handleChange={() => setFilter("Paid")}
						checked={filter === "Paid"}
					/>
				</div>
			)}
		</div>
	);
};

export default InvoiceFilter;
