"use client";

import React from "react";
import Image from "next/image";
import SVG from "react-inlinesvg";
import styles from "./Layout.module.scss";
import ThemeSwitch from "./ThemeSwitch";

export default function SideMenu() {
	return (
		<aside className={styles.app__sidebar}>
			<img src="/assets/svg/logo-rectangle.svg" alt="" />

			<div className={styles.app__sidebar_actions}>
				<ThemeSwitch />

				<div className={styles.sidebar__avatar}>
					<SVG src="/assets/svg/avatar.svg" />
				</div>
			</div>
		</aside>
	);
}
