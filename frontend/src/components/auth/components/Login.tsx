"use client";

import React from "react";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import Input from "@/components/shared/Input";
import style from "../Auth.module.scss";
import Link from "next/link";
import { useLogin } from "@/api";

const FormSchema = Yup.object().shape({
	email: Yup.string().email("Invalid email").required("required"),
	password: Yup.string().required("required"),
});

const initialValues = {
	email: "",
	password: "",
};

export const Login = () => {
	const { mutate: login, isPending: submitting } = useLogin();

	const handleSubmit = async (val: typeof initialValues) => {
		login(val);
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
				{() => (
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
							disabled={submitting}
						>
							{submitting ? "Signing in..." : "Sign In"}
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
