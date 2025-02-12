import type { Metadata } from "next";
import "../styles/globals.scss";
import Providers from "./providers";
import { AppLayout } from "@/components/layout/AppLayout";
import axios from "axios";
import { Bitter } from "@next/font/google";
import { InvoiceProvider } from "@/context/InvoiceContext";

export const metadata: Metadata = {
	title: "Invoicer",
	description: "An invoicing app for entrepreneurial minds and customers.",
};

const bitter = Bitter({
	weight: ["400", "500", "700"],
	subsets: ["latin"],
});

axios.defaults.baseURL = "https://invoicer-mhga.onrender.com";
axios.defaults.timeout = 60000;

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" suppressHydrationWarning={true}>
			<body suppressHydrationWarning className={bitter.className}>
				<Providers>
					<InvoiceProvider>
						<AppLayout>{children}</AppLayout>
					</InvoiceProvider>
				</Providers>
			</body>
		</html>
	);
}
