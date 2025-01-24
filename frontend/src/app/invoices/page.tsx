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
import { useInvoice } from "@/context/InvoiceContext";

export default function InvoicesPage() {
	const router = useRouter();
	const { invoices, setInvoices, isNewInvoiceOpen, crudAction } = useInvoice();
	const [isFetching, setIsFetching] = useState(true);

	useEffect(() => {
		const fetchInvoices = async () => {
			const token = localStorage.getItem("token");
			const userString = localStorage.getItem("user");
			const user = userString ? JSON.parse(userString) : null;
			const id = user?.uid ?? "";

			try {
				const response = await axios.get(
					`https://invoicer-mhga.onrender.com/${id}/invoices`,
					{
						headers: {
							authorization: `Bearer ${token}`,
						},
					}
				);
				setInvoices(response.data.data);
				setIsFetching(false);
			} catch (err: any) {
				if (err.status === 401) {
					Toast.fire({
						icon: "error",
						title: "Session Expired, Please Login",
					});
					router.push("/auth/login");
				} else if (err.status === 404) {
					setInvoices([]);
					setIsFetching(false);
				} else {
					Toast.fire({
						icon: "error",
						title: err.response.data.error,
					});
				}
			}
		};
		fetchInvoices();
	}, [router, crudAction, setInvoices]);

	if (isFetching) return <Loader />;

	return (
		<React.Fragment>
			<InvoicesHeader invoiceLength={invoices.length} />
			{invoices.length > 0 ? <Invoices /> : <EmptyInvoice />}
			<AnimatePresence>{isNewInvoiceOpen && <InvoiceCrud />}</AnimatePresence>
		</React.Fragment>
	);
}
