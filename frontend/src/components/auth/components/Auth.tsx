"use client";
import React from "react";
import styles from "../Auth.module.scss";
import Image from "next/image";
import { Login } from "./Login";
import { Register } from "./Register";
import { usePathname } from "next/navigation";
import Link from "next/link";

const Auth = () => {
	const pathname = usePathname();

	return (
		<div className={styles.auth__wrapper}>
			<section className={styles.auth__form}>
				<div className={styles.form__logo}>
					<Image
						src={"/assets/svg/logo-rectangle.svg"}
						alt="app-logo"
						height={40}
						width={40}
					/>
				</div>
				<div className={styles.auth__form__area}>
					{pathname === "/auth/login" ? <Login /> : <Register />}
				</div>
			</section>
			<section className={styles.auth__deco}>
				<div>
					<button className="button__edit" type="button">
						<Link
							href={
								pathname === "/auth/login" ? "/auth/register" : "/auth/login"
							}
						>
							{pathname === "/auth/login" ? "Sign up" : "Login"}
						</Link>
					</button>
				</div>
			</section>
		</div>
	);
};

export default Auth;
