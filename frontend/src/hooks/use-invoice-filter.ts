"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export function useInvoiceFilter() {
	const router = useRouter();
	const searchParams = useSearchParams();

	const filter = searchParams.get("filter") || "All";

	const setFilter = useCallback(
		(newFilter: string) => {
			const current = new URLSearchParams(window.location.search); // Use window.location

			if (newFilter === "All") {
				current.delete("filter");
			} else {
				current.set("filter", newFilter);
			}

			// Construct new URL
			const queryString = current.toString();
			const newUrl = queryString ? `?${queryString}` : "/invoices";

			router.replace(newUrl, { scroll: false });
		},
		[router]
	);

	return { filter, setFilter };
}
