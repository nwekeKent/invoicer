"use client";

import React from "react";
import styles from "./Layout.module.scss";
import SideMenu from "./SideMenu";
import { usePathname } from "next/navigation";

export const AppLayout = ({ children }: { children: React.ReactNode }) => {
	const pathname = usePathname();

	return pathname.includes("auth") || pathname === "/" ? (
		<React.Fragment>{children}</React.Fragment>
	) : (
		<main className={styles.app__layout}>
			<SideMenu />
			<main className={styles.app__mainbody}>
				{" "}
				<div className={styles.mainbody__container}>{children}</div>{" "}
			</main>
		</main>
	);
};
