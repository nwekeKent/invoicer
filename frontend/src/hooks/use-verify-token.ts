// hooks/useVerifyTokenRedirect.ts
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Toast } from "@/components/shared/Toast";

export function useVerifyTokenRedirect() {
	const router = useRouter();

	useEffect(() => {
		const verifyToken = async () => {
			const token = localStorage.getItem("token");
			const apiUrl = process.env.NEXT_PUBLIC_API_URL;

			if (!token) {
				router.push("/auth/register");
				return;
			}

			try {
				const res = await axios.post(`${apiUrl}/auth/verify-token`, { token });

				if (res.status === 200) {
					router.push("/invoices");
				}
			} catch {
				router.push("/auth/login");
			}
		};

		verifyToken();
	}, [router]);
}
