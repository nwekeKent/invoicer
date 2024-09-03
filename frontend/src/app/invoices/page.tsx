"use client";

import Invoices from "@/components/invoices/Invoices";
import EmptyInvoice from "@/components/invoices/components/EmptyInvoice";
import { InvoiceCrud } from "@/components/invoices/components/invoice-crud/InvoiceCrud";
import Modal from "@/components/shared/Modal";
import { invoices } from "@/data/mock";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import { Toast } from "@/components/shared/Toast";
import { useRouter } from "next/navigation";
import InvoicesHeader from "@/components/invoices/InvoicesHeader";

export default function InvoicesPage() {
	const router = useRouter();
	const [invoices, setInvoices] = useState([]);
	const [isFetching, setisFetching] = useState(true);

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
					`http://localhost:8080/${id}/invoices`,
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
	}, []);

	if (isFetching)
		return (
			<div className="invoice-loader">
				<Image
					src={"/assets/svg/logo-rectangle.svg"}
					alt="app-logo"
					height={40}
					width={40}
				/>
			</div>
		);

	return (
		<React.Fragment>
			<InvoicesHeader invoiceLength={invoices.length} />
			{invoices.length > 0 ? (
				<Invoices invoices={invoices} />
			) : (
				<EmptyInvoice />
			)}
			{/* <InvoiceCrud /> */}
			{/* <Modal>
				<p>testing</p>
			</Modal> */}
		</React.Fragment>
	);
}