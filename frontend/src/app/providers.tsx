"use client";

import { ReactNode } from "react";
import { ThemeProvider } from "next-themes";
import { QueryProvider } from "@/providers/react-query-provider";

type ProvidersProps = {
	children: ReactNode;
};

const Providers = ({ children }: ProvidersProps) => (
	<ThemeProvider enableSystem={false} enableColorScheme={false}>
		<QueryProvider>{children}</QueryProvider>
	</ThemeProvider>
);

export default Providers;
