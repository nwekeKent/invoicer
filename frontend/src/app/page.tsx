"use client";

import React, { useEffect } from "react";
import axios from "axios";
import Loader from "@/components/shared/Loader";
import { useRouter } from "next/navigation";

export default function Home() {
	const router = useRouter();
	useEffect(() => {
		const verifyToken = async () => {
			const token = localStorage.getItem("token");

			const apiUrl = process.env.NEXT_PUBLIC_API_URL;

			if (token) {
				try {
					const res = await axios.post(`${apiUrl}/auth/verify-token`, {
						token: token,
					});
					if (res.status === 200) {
						router.push("/invoices");
					}
				} catch {
					router.push("/auth/login");
				}
			} else {
				router.push("/auth/register");
			}
		};
		verifyToken();
	}, [router]);

	return <Loader />;
}
