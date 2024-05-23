import React from "react";
import styles from "./Layout.module.scss";
import SideMenu from "./SideMenu";

export const AppLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<main className={styles.app__layout}>
			<SideMenu />
			<main className={styles.app__mainbody}>
				{" "}
				<div className={styles.mainbody__container}>{children}</div>{" "}
			</main>
		</main>
	);
};
