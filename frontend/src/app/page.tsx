"use client";

import Image from "next/image";
import React, { useEffect } from "react";
import axios from "axios";
import { Toast } from "@/components/shared/Toast";
import { useRouter } from "next/navigation";

export default function Home() {
	const router = useRouter();
	useEffect(() => {
		const verifyToken = async () => {
			const token = localStorage.getItem("token");
			if (token) {
				try {
					const res = await axios.post("http://localhost:8080/check-token", {
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
	}, []);

	return (
		<div className="home-loader">
			<Image
				src={"/assets/svg/logo-rectangle.svg"}
				alt="app-logo"
				height={80}
				width={80}
			/>
		</div>
	);
}
