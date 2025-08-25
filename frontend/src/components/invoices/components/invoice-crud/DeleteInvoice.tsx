"use client";

import { useSearchParams } from "next/navigation";
import { useModalManager } from "@/hooks";
import { useDeleteInvoice } from "@/api";

const DeleteInvoice = () => {
	const idParams = useSearchParams();
	const invoiceId = idParams.get("id");

	const { closeModal } = useModalManager();
	const { mutate: deleteInvoice, isPending: submitting } = useDeleteInvoice(
		invoiceId!
	);

	const handleDelete = async () => {
		deleteInvoice();
	};

	return (
		<div>
			<h1 className="bold-black-text">Confirm Deletion</h1>
			<p className="small-faded-purple-text ">
				Are you sure you want to delete invoice #{invoiceId}? This action cannot
				be undone.
			</p>

			<div className="delete__cta">
				<button className="button__edit" onClick={closeModal}>
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
