"use client";

import React, { useRef } from "react";
import styles from "../../Invoices.module.scss";
import NewInvoice from "./NewInvoice";
import { usePathname, useSearchParams } from "next/navigation";
import EditInvoice from "./EditInvoice";
import { motion } from "framer-motion";
import { useModalManager } from "@/hooks";
import { useCreateInvoice, useUpdateInvoice } from "@/api";

export const InvoiceCrud = () => {
	const pathname = usePathname();
	const idParams = useSearchParams();
	const invoiceId = idParams.get("id");
	const { closeModal } = useModalManager();
	const { mutate: createInvoice, isPending: creating } = useCreateInvoice();
	const { mutate: editInvoice, isPending: updating } = useUpdateInvoice(
		invoiceId!
	);

	const formikSubmitRef = useRef<(() => void) | null>(null);
	const editSubmitRef = useRef<(() => void) | null>(null);

	const handleClose = () => {
		closeModal();
	};

	return (
		<motion.div className={styles.invoice__crud}>
			<motion.div
				className={styles.crud__card}
				initial={{ x: -500 }}
				animate={{ x: 0 }}
				exit={{ x: -700 }}
				transition={{ duration: 0.3, ease: "easeInOut" }}
			>
				{pathname === "/invoices" && (
					<NewInvoice
						createInvoice={createInvoice}
						formikSubmitRef={formikSubmitRef}
					/>
				)}
				{pathname.includes("/invoice-details") && (
					<EditInvoice
						editInvoice={editInvoice}
						editSubmitRef={editSubmitRef}
					/>
				)}

				<div className={styles.crud__cta}>
					<button className="button__edit" onClick={handleClose}>
						Cancel
					</button>
					<button
						className="button__primary"
						onClick={() => {
							pathname.includes("/invoice-details")
								? editSubmitRef.current && editSubmitRef.current()
								: formikSubmitRef.current && formikSubmitRef.current();
						}}
						disabled={creating || updating}
					>
						{creating || updating ? "Saving" : "Save"}
					</button>
				</div>
			</motion.div>
		</motion.div>
	);
};
