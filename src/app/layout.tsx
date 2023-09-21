import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Create Next App",
	description: "An invoicing app for entrepreneurial minds and customers.",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body>{children}</body>
		</html>
	);
}
