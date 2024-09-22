"use client";

import React, { useState, useEffect } from "react";
import styles from "../Invoices.module.scss";
import Header from "./invoice-details/Header";
import DetailsCard from "./invoice-details/DetailsCard";
import { Toast } from "@/components/shared/Toast";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import Loader from "@/components/shared/Loader";

interface MyComponentProps {
	setEditInvoice: React.Dispatch<React.SetStateAction<boolean>>;
	setDeleteInvoice: React.Dispatch<React.SetStateAction<boolean>>;
	setEditAction: React.Dispatch<React.SetStateAction<boolean>>;
	editAction: boolean;
}

interface InvoiceProps {
	status?: "Pending" | "Paid" | undefined;
	id?: string;
}

const InvoiceDetails = ({
	setEditInvoice,
	setDeleteInvoice,
	editAction,
	setEditAction,
}: MyComponentProps) => {
	const [invoice, setInvoice] = useState<InvoiceProps>({});
	const [submitting, setSubmitting] = useState(false);
	const [isFetching, setisFetching] = useState(true);
	const router = useRouter();
	const idParams = useSearchParams();
	const id = idParams.get("id");

	useEffect(() => {
		const fetchInvoice = async () => {
			const token = localStorage.getItem("token");

			try {
				const response = await axios.get(
					`https://invoicer-backend-gii7vioyp-nwekekents-projects.vercel.app/invoices/${id}`,
					{
						headers: {
							authorization: `Bearer ${token}`,
						},
					}
				);
				setInvoice(response.data.data);
				setisFetching(false);
			} catch (err: any) {
				if (err.status === 401) {
					Toast.fire({
						icon: "error",
						title: "Session Expired, Please Login",
					});
					router.push("/auth/login");
				} else if (err.status === 404) {
					setInvoice({});
					setisFetching(false);
				} else {
					Toast.fire({
						icon: "error",
						title: err.response.data.error,
					});
				}
			}
		};
		fetchInvoice();
	}, [id, router, editAction]);

	const markAsPaid = async () => {
		const token = localStorage.getItem("token");

		setSubmitting(true);
		try {
			const res = await axios.patch(
				`https://invoicer-backend-gii7vioyp-nwekekents-projects.vercel.app/invoices/${id}/status`,
				{ status: "Paid" },
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
			setEditAction && setEditAction(prev => !prev);
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

	if (isFetching) return <Loader />;

	return (
		<section className={styles.invoice__details}>
			<Header
				invoiceStatus={invoice.status}
				setEditInvoice={setEditInvoice}
				setDeleteInvoice={setDeleteInvoice}
				submitting={submitting}
				markAsPaid={markAsPaid}
			/>
			<DetailsCard invoice={invoice} />

			<div className={styles.header__cta}>
				<button className="button__edit" onClick={() => setEditInvoice(true)}>
					Edit
				</button>
				<button
					className="button__delete"
					onClick={() => setDeleteInvoice(true)}
				>
					Delete
				</button>

				{invoice.status !== "Paid" && (
					<button className="button__primary" onClick={markAsPaid}>
						{submitting ? "Updating" : "Mark as Paid"}
					</button>
				)}
			</div>
		</section>
	);
};

export default InvoiceDetails;
