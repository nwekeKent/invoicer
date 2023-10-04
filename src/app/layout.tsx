import type { Metadata } from "next";
import "../styles/globals.scss";
import Providers from "./providers";
import { AppLayout } from "@/components/layout/AppLayout";

export const metadata: Metadata = {
	title: "Invoicer",
	description: "An invoicing app for entrepreneurial minds and customers.",
};

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
