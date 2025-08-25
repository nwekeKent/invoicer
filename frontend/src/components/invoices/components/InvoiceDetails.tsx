"use client";

import styles from "../Invoices.module.scss";
import Header from "./invoice-details/Header";
import DetailsCard from "./invoice-details/DetailsCard";

import { useSearchParams } from "next/navigation";
import Loader from "@/components/shared/Loader";
import { useInvoice, usePaidInvoice, PaidInvoicePayload } from "@/api";
import { useModalManager } from "@/hooks";

const InvoiceDetails = () => {
	const idParams = useSearchParams();
	const id = idParams.get("id");
	const { openModal } = useModalManager();

	const { data: invoice, isLoading } = useInvoice(id!);
	const { mutate: markAsPaid, isPending: submitting } = usePaidInvoice(id!);

	const handleMarkAsPaid = () => {
		const data = {
			status: "Paid",
		} as PaidInvoicePayload;

		markAsPaid(data); // The hook handles toast and invalidation
	};

	if (isLoading) return <Loader />;

	return (
		<section className={styles.invoice__details}>
			<Header invoiceStatus={invoice?.status} invoiceId={id} />
			<DetailsCard invoice={invoice!} />

			<div className={styles.header__cta}>
				<button onClick={() => openModal("edit-invoice")}>Edit</button>
				<button onClick={() => openModal("delete-invoice")}>Delete</button>

				{invoice?.status !== "Paid" && (
					<button
						className="button__primary"
						onClick={handleMarkAsPaid}
						disabled={submitting}
					>
						{submitting ? "Updating" : "Mark as Paid"}
					</button>
				)}
			</div>
		</section>
	);
};

export default InvoiceDetails;
