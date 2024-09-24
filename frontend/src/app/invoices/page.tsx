"use client";

import Invoices from "@/components/invoices/Invoices";
import EmptyInvoice from "@/components/invoices/components/EmptyInvoice";
import { InvoiceCrud } from "@/components/invoices/components/invoice-crud/InvoiceCrud";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Toast } from "@/components/shared/Toast";
import { useRouter } from "next/navigation";
import InvoicesHeader from "@/components/invoices/InvoicesHeader";
import Loader from "@/components/shared/Loader";
import { AnimatePresence } from "framer-motion";

export default function InvoicesPage() {
	const router = useRouter();
	const [invoices, setInvoices] = useState([]);
	const [invoiceFilter, setInvoiceFilter] = useState("All");
	const [isFetching, setisFetching] = useState(true);
	const [newInvoice, setNewInvoice] = useState(false);
	const [crudAction, setCrudAction] = useState(false);

	interface User {
		uid: string;
		// Other properties can be added here
	}

	useEffect(() => {
		const fetchInvoices = async () => {
			const token = localStorage.getItem("token");
			const userString = localStorage.getItem("user");
			const user: User | null = userString ? JSON.parse(userString) : null;
			const id = user ? user.uid : "";
			try {
				const response = await axios.get(
					`https://invoicer-fgdcs63tx-nwekekents-projects.vercel.app/${id}/invoices`,
					{
						headers: {
							authorization: `Bearer ${token}`,
						},
					}
				);
				setInvoices(response.data.data);
				setisFetching(false);
			} catch (err: any) {
				if (err.status === 401) {
					Toast.fire({
						icon: "error",
						title: "Session Expired, Please Login",
					});
					router.push("/auth/login");
				} else if (err.status === 404) {
					setInvoices([]);
					setisFetching(false);
				} else {
					Toast.fire({
						icon: "error",
						title: err.response.data.error,
					});
				}
			}
		};
		fetchInvoices();
	}, [router, crudAction]);

	if (isFetching) return <Loader />;

	return (
		<React.Fragment>
			<InvoicesHeader
				invoiceLength={invoices.length}
				setNewInvoice={setNewInvoice}
				setInvoiceFilter={setInvoiceFilter}
				invoiceFilter={invoiceFilter}
			/>
			{invoices.length > 0 ? (
				<Invoices invoices={invoices} invoiceFilter={invoiceFilter} />
			) : (
				<EmptyInvoice />
			)}
			<AnimatePresence>
				{newInvoice && (
					<InvoiceCrud
						setCrudAction={setCrudAction}
						setNewInvoice={setNewInvoice}
					/>
				)}
			</AnimatePresence>
			{/* <Modal>
				<p>testing</p>
			</Modal> */}
		</React.Fragment>
	);
}
