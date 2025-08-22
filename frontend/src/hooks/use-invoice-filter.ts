// hooks/useInvoiceFilter.ts
import { useSearchParams, useRouter } from "next/navigation";
import { useCallback } from "react";

export function useInvoiceFilter() {
	const searchParams = useSearchParams();
	const router = useRouter();

	const filter = searchParams.get("filter") || "All";

	const setFilter = useCallback(
		(newFilter: string) => {
			// Convert to array first, then to URLSearchParams
			const paramsArray = Array.from(searchParams.entries());
			const params = new URLSearchParams(paramsArray);

			if (newFilter === "All") {
				params.delete("filter");
			} else {
				params.set("filter", newFilter);
			}

			const newUrl = params.toString() ? `?${params.toString()}` : "";
			router.replace(newUrl, { scroll: false });
		},
		[searchParams, router]
	);

	return { filter, setFilter };
}
