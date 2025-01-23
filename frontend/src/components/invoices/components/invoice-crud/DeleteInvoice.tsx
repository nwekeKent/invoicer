"use client";

import React, { useState } from "react";
import axios from "axios";
import { Toast } from "@/components/shared/Toast";
import { useRouter, useSearchParams } from "next/navigation";
import { useInvoice } from "@/context/InvoiceContext";

const DeleteInvoice = () => {
	const router = useRouter();
	const idParams = useSearchParams();
	const invoiceId = idParams.get("id");
	const [submitting, setSubmitting] = useState(false);
	const { setIsDeleteModalOpen, setCrudAction, crudAction } = useInvoice();

	const handleCancel = () => setIsDeleteModalOpen(false);
	const handleDelete = async () => {
		const token = localStorage.getItem("token");
		setSubmitting(true);
		try {
			const res = await axios.delete(
				`https://invoicer-mhga.onrender.com/invoices/${invoiceId}/delete`,
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
			router.push("/invoices");
			setCrudAction(!crudAction);
			setIsDeleteModalOpen(false);
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
		<div>
			<h1 className="bold-black-text">Confirm Deletion</h1>
			<p className="small-faded-purple-text ">
				Are you sure you want to delete invoice #{invoiceId}? This action cannot
				be undone.
			</p>

			<div className="delete__cta">
				<button className="button__edit" onClick={handleCancel}>
					Cancel
				</button>
				<button className="button__delete" onClick={handleDelete}>
					{submitting ? "Deleting..." : "Delete"}
				</button>
			</div>
		</div>
	);
};

export default DeleteInvoice;
