"use client";

import {
	DehydratedState,
	HydrationBoundary,
	MutationCache,
	QueryCache,
	QueryClient,
	QueryClientProvider,
} from "@tanstack/react-query";
import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";
import { persistQueryClient } from "@tanstack/react-query-persist-client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { AuthAxiosError } from "@/lib/axios-instance"; // Adjust path
import { Toast } from "@/components/shared/Toast"; // Adjust path

export function QueryProvider({
	children,
	dehydratedState,
}: {
	children: React.ReactNode;
	dehydratedState?: DehydratedState;
}) {
	const router = useRouter();

	const [queryClient] = useState(
		() =>
			new QueryClient({
				queryCache: new QueryCache({
					onError: error => {
						const authError = error as AuthAxiosError;
						if (authError.isAuthError) {
							Toast.fire({
								icon: "error",
								title: "Session Expired",
								text: "Please log in again.",
							});
							router.push("/auth/login");
						}
					},
				}),
				mutationCache: new MutationCache({
					onError: error => {
						const authError = error as AuthAxiosError;
						if (authError.isAuthError) {
							Toast.fire({
								icon: "error",
								title: "Session Expired",
								text: "Please log in again.",
							});
							router.push("/auth/login");
						}
					},
				}),

				defaultOptions: {
					queries: {
						staleTime: 1000 * 60 * 5, // 5 minutes
						retry: 1,
					},
				},
			})
	);

	// Your persistence logic is perfect and doesn't need to change.
	useEffect(() => {
		const enablePersistence = async () => {
			if (typeof window !== "undefined") {
				const persister = createAsyncStoragePersister({
					storage: window.localStorage,
				});

				persistQueryClient({
					queryClient,
					persister,
					maxAge: 1000 * 60 * 60 * 24, // 24 hours
				});
			}
		};

		enablePersistence();
	}, [queryClient]);

	return (
		<QueryClientProvider client={queryClient}>
			<HydrationBoundary state={dehydratedState}>{children}</HydrationBoundary>
		</QueryClientProvider>
	);
}
