"use client";

import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import SVG from "react-inlinesvg";

const ThemeSwitch = () => {
	const [mounted, setMounted] = useState(false);
	const { theme, setTheme } = useTheme();

	// useEffect only runs on the client, so now we can safely show the UI
	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		return null;
	}

	return (
		mounted && (
			<React.Fragment>
				{theme === "dark" ? (
					<SVG src={"/assets/svg/sun.svg"} onClick={() => setTheme("light")} />
				) : (
					<SVG src={"/assets/svg/moon.svg"} onClick={() => setTheme("dark")} />
				)}
			</React.Fragment>
		)
	);
};

export default ThemeSwitch;
