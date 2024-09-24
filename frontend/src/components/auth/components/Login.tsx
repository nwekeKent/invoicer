"use client";

import React from "react";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import Input from "@/components/shared/Input";
import style from "../Auth.module.scss";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Toast } from "@/components/shared/Toast";
import Link from "next/link";

const FormSchema = Yup.object().shape({
	email: Yup.string().email("Invalid email").required("required"),
	password: Yup.string().required("required"),
});

const initialValues = {
	email: "",
	password: "",
};

const formatMsg = (str: string) => {
	let newStr = "";

	if (str) {
		const formatStr = str.split("/");
		newStr = formatStr[1]?.replace(/-/g, " ");
	}

	return newStr;
};

export const Login = () => {
	const router = useRouter();

	const handleSubmit = async (
		val: typeof initialValues,
		{ setSubmitting }: any
	) => {
		setSubmitting(true);
		try {
			const response = await axios.post(
				"https://invoicer-ayj4ll2cs-nwekekents-projects.vercel.app/users/login",
				val
			);
			localStorage.setItem("token", response.data.token);
			localStorage.setItem("user", JSON.stringify(response.data.user));
			Toast.fire({
				icon: "success",
				title: "Login Successful!",
			});

			router.push("/invoices");
		} catch (err: any) {
			Toast.fire({
				icon: "error",
				title: formatMsg(err.response.data.error.code),
			});
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<div>
			<h3>Login to your account.</h3>
			<small className="small-para-grey">
				Sign in to your account and create invoices for free
			</small>
			<h2></h2>
			<Formik
				initialValues={initialValues}
				onSubmit={handleSubmit}
				validationSchema={FormSchema}
			>
				{({ isSubmitting }) => (
					<Form>
						<Field
							placeholder="Email Address"
							label="Email"
							type="text"
							name="email"
							component={Input}
						/>
						<Field
							placeholder="Password"
							label="Password"
							type="password"
							name="password"
							component={Input}
						/>
						<h2></h2>
						<button
							className="button__add-new-item"
							type="submit"
							disabled={isSubmitting}
						>
							{isSubmitting ? "Signing in..." : "Sign In"}
						</button>

						<p className={style.auth__para}>
							{`Don't have an account?`}{" "}
							<span>
								<Link href="/auth/register">Create account.</Link>
							</span>
						</p>
					</Form>
				)}
			</Formik>
		</div>
	);
};
