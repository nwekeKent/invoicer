"use client";

import React from "react";
import styles from "../../Invoices.module.scss";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import Input from "@/components/shared/Input";

const FormSchema = Yup.object().shape({
	streetAddress: Yup.string().required("This is a required field"),
	city: Yup.string().required("This is a required field"),
	postCode: Yup.string().required("This is a required field"),
	country: Yup.string().required("This is a required field"),
});

const initialValues = {
	streetAddress: "",
	city: "",
	postCode: "",
	country: "",
};

const NewInvoice = () => {
	const handleSubmit = val => {};

	return (
		<div>
			<h1 className={styles.crudTitle}>New Invoice</h1>
			<Formik
				initialValues={initialValues}
				onSubmit={handleSubmit}
				validationSchema={FormSchema}
			>
				<Form>
					<h3 className={styles.section__title}>Bill From</h3>
					<Field
						placeholder="Street Address"
						label="Street Address"
						type="text"
						name="streetAddress"
						component={Input}
					/>

					<div className="grided-input">
						<Field
							placeholder="City"
							label="city"
							type="text"
							name="city"
							component={Input}
						/>

						<Field
							placeholder="post code"
							label="post code"
							type="text"
							name="postCode"
							component={Input}
						/>

						<Field
							placeholder="country"
							label="country"
							type="text"
							name="country"
							component={Input}
						/>
					</div>

					<h3 className={styles.section__title}>Bill To</h3>
					<Field
						placeholder="Street Address"
						label="Street Address"
						type="text"
						name="streetAddress"
						component={Input}
					/>

					<div className="grided-input">
						<Field
							placeholder="City"
							label="city"
							type="text"
							name="city"
							component={Input}
						/>

						<Field
							placeholder="post code"
							label="post code"
							type="text"
							name="postCode"
							component={Input}
						/>

						<Field
							placeholder="country"
							label="country"
							type="text"
							name="country"
							component={Input}
						/>
					</div>
				</Form>
			</Formik>
		</div>
	);
};

export default NewInvoice;
