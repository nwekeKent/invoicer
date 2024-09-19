"use client";

import React from "react";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import Input from "@/components/shared/Input";
import style from "../Auth.module.scss";
import axios from "axios";
import { Toast } from "@/components/shared/Toast";
import Link from "next/link";

const FormSchema = Yup.object().shape({
	email: Yup.string().email("Invalid email").required("required"),
	password: Yup.string().required("required").min(8, "min 8 digits"),
	name: Yup.string().required("required"),
	companyName: Yup.string(),
});

const initialValues = {
	email: "",
	password: "",
	companyName: "",
	name: "",
};

const handleSubmit = async (
	val: typeof initialValues,
	{ setSubmitting }: any
) => {
	setSubmitting(true);
	try {
		await axios.post("http://localhost:8080/users/register", val);

		Toast.fire({
			icon: "success",
			title: "Account created successful!",
		});
	} catch (err: any) {
		Toast.fire({
			icon: "error",
			title: err.response.data.error,
		});
	} finally {
		setSubmitting(false);
	}
};

export const Register = () => {
	return (
		<div>
			<h3>Create an account</h3>
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
							placeholder="Name"
							label="Name"
							type="text"
							name="name"
							component={Input}
						/>
						<Field
							placeholder="Email Address"
							label="Email"
							type="text"
							name="email"
							component={Input}
						/>
						<Field
							placeholder="Company Name"
							label="Company Name(optional)"
							type="text"
							name="companyName"
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
							{isSubmitting ? "Creating account..." : "Create Account"}
						</button>

						<p className={style.auth__para}>
							Already have an account?{" "}
							<span>
								<Link href="/auth/login">Sign in.</Link>
							</span>
						</p>
					</Form>
				)}
			</Formik>
		</div>
	);
};
