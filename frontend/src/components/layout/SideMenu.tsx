"use client";

import React from "react";
import Image from "next/image";
import styles from "./Layout.module.scss";
import ThemeSwitch from "./ThemeSwitch";

export default function SideMenu() {
	return (
		<aside className={styles.app__sidebar}>
			<div className={styles.logo__image}>
				{" "}
				<Image src="/assets/svg/logo-rectangle.svg" alt="" fill={true} />
			</div>

			<div className={styles.app__sidebar_actions}>
				<ThemeSwitch />

				<div className={styles.sidebar__avatar}>
					<Image
						src="/assets/svg/avatar.svg"
						alt="avatar-image"
						width={20}
						height={20}
					/>
				</div>
			</div>
		</aside>
	);
}
