import type { Metadata } from "next";
import "../styles/globals.scss";
import Providers from "./providers";
import { AppLayout } from "@/components/layout/AppLayout";
import axios from "axios";

export const metadata: Metadata = {
	title: "Invoicer",
	description: "An invoicing app for entrepreneurial minds and customers.",
};

axios.defaults.baseURL = "http://localhost:8080";
axios.defaults.timeout = 60000;

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" suppressHydrationWarning={true}>
			<body suppressHydrationWarning>
				<Providers>
					<AppLayout>{children}</AppLayout>
				</Providers>
			</body>
		</html>
	);
}
