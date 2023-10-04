"use client";

import { ReactNode } from "react";
import { ThemeProvider } from "next-themes";

type ProvidersProps = {
	children: ReactNode;
};

const Providers = ({ children }: ProvidersProps) => (
	<ThemeProvider enableSystem={true}>{children}</ThemeProvider>
);

export default Providers;
