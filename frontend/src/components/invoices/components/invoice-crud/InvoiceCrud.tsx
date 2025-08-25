"use client";

import React, { useState, useRef } from "react";
import styles from "../../Invoices.module.scss";
import NewInvoice from "./NewInvoice";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import EditInvoice from "./EditInvoice";
import axios from "axios";
import { Toast } from "@/components/shared/Toast";
import InvoicePdf from "../InvoicePdf";
import { pdf } from "@react-pdf/renderer";
import { motion } from "framer-motion";
import { useModalManager } from "@/hooks";

interface User {
	uid: string;
}

export const InvoiceCrud = () => {
	const { openModal, closeModal } = useModalManager();

	const pathname = usePathname();
	const router = useRouter();
	const idParams = useSearchParams();
	const invoiceId = idParams.get("id");
	const [submitting, setSubmitting] = useState(false);

	const formikSubmitRef = useRef<(() => void) | null>(null);
	const editSubmitRef = useRef<(() => void) | null>(null);

	const handleClose = () => {
		closeModal();
	};

	const createInvoice = async (val: any) => {
		const token = localStorage.getItem("token");
		const userString = localStorage.getItem("user");
		const user: User | null = userString ? JSON.parse(userString) : null;
		const id = user ? user.uid : "";
		setSubmitting(true);
		try {
			const res = await axios.post(
				`https://invoicer-mhga.onrender.com/${id}/invoices`,
				val,
				{
					headers: {
						authorization: `Bearer ${token}`,
					},
				}
			);

			Toast.fire({
				icon: "success",
				title: res.data.message,
			});
			const doc = <InvoicePdf invoice={{ ...val, id: res.data.data.id }} />;
			const pdfBlob = await pdf(doc).toBlob();

			// Create a link to download the PDF
			const url = URL.createObjectURL(pdfBlob);
			const a = document.createElement("a");
			a.href = url;
			a.download = `invoice ${res.data.data.id}.pdf`;
			a.click();
			closeModal();
		} catch (err: any) {
			if (err.status === 401) {
				Toast.fire({
					icon: "error",
					title: "Session Expired, Please Login",
				});
				router.push("/auth/login");
			} else {
				Toast.fire({
					icon: "error",
					title: err.response.data.error,
				});
			}
		} finally {
			setSubmitting(false);
		}
	};

	const editInvoice = async (val: any) => {
		const token = localStorage.getItem("token");
		const userString = localStorage.getItem("user");
		const user: User | null = userString ? JSON.parse(userString) : null;
		const id = user ? user.uid : "";
		setSubmitting(true);
		try {
			const res = await axios.put(
				`https://invoicer-mhga.onrender.com/${id}/invoices/${invoiceId}`,
				val,
				{
					headers: {
						authorization: `Bearer ${token}`,
					},
				}
			);

			Toast.fire({
				icon: "success",
				title: res.data.message,
			});
			const doc = <InvoicePdf invoice={{ ...val, id: invoiceId }} />;
			const pdfBlob = await pdf(doc).toBlob();

			// Create a link to download the PDF
			const url = URL.createObjectURL(pdfBlob);
			const a = document.createElement("a");
			a.href = url;
			a.download = `invoice ${invoiceId}.pdf`;
			a.click();
			closeModal();
		} catch (err: any) {
			if (err.status === 401) {
				Toast.fire({
					icon: "error",
					title: "Session Expired, Please Login",
				});
				router.push("/auth/login");
			} else {
				Toast.fire({
					icon: "error",
					title: err.response.data.error,
				});
			}
		} finally {
			setSubmitting(false);
		}
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
						disabled={submitting}
					>
						{submitting ? "Saving" : "Save"}
					</button>
				</div>
			</motion.div>
		</motion.div>
	);
};
