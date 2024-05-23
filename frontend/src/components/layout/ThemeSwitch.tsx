"use client";

import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import Image from "next/image";

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
					<Image
						src={"/assets/svg/sun.svg"}
						className="cursor"
						alt="moon-icon"
						onClick={() => setTheme("light")}
						width={11}
						height={11}
					/>
				) : (
					<Image
						src={"/assets/svg/moon.svg"}
						className="cursor"
						onClick={() => setTheme("dark")}
						alt="moon-icon"
						width={20}
						height={20}
					/>
				)}
			</React.Fragment>
		)
	);
};

export default ThemeSwitch;
