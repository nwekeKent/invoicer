"use client";

import React from "react";
import styles from "../../Invoices.module.scss";
import * as Yup from "yup";
import { Formik, Form, Field, FieldArray } from "formik";
import Input from "@/components/shared/Input";
import Image from "next/image";

const FormSchema = Yup.object().shape({
	streetAddress: Yup.string().required("required"),
	city: Yup.string().required("required"),
	postCode: Yup.string().required("required "),
	country: Yup.string().required("required"),
	ClientName: Yup.string().required("required"),
	clientEmail: Yup.string().email("Invalid Email").required("required"),
	clientStreetAddress: Yup.string().required("required"),
	clientCity: Yup.string().required("required"),
	clientPostCode: Yup.string().required("required"),
	clientCountry: Yup.string().required("required"),
	invoiceDate: Yup.string().required("required"),
	dueDate: Yup.string().required("required"),
	itemList: Yup.array()
		.of(
			Yup.object({
				name: Yup.string().required(""),
				quantity: Yup.number().required("").positive("").integer(""),
				price: Yup.number().required("").positive(""),
			})
		)
		.min(1, "At least one item is required"),
});

const initialValues = {
	streetAddress: "",
	city: "",
	postCode: "",
	country: "",
	clientName: "",
	clientEmail: "",
	clientStreetAddress: "",
	clientCity: "",
	clientPostCode: "",
	clientCountry: "",
	invoiceDate: "",
	dueDate: "",
	itemList: [{ name: "", quantity: "", price: "" }],
};

const EditInvoice = () => {
	const handleSubmit = (val: any) => {
		console.log("val", val);
	};

	return (
		<div className={styles.crud__div}>
			<h1 className={styles.crudTitle}>Edit Invoice</h1>
			<Formik
				initialValues={initialValues}
				onSubmit={handleSubmit}
				validationSchema={FormSchema}
			>
				{({ values }) => (
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
							placeholder="Client's Name"
							label="Client's Name"
							type="text"
							name="clientName"
							component={Input}
						/>

						<Field
							placeholder="Client's email"
							label="Client's email"
							type="text"
							name="clientEmail"
							component={Input}
						/>

						<Field
							placeholder="Street Address"
							label="Street Address"
							type="text"
							name="clientStreetAddress"
							component={Input}
						/>

						<div className="grided-input">
							<Field
								placeholder="City"
								label="city"
								type="text"
								name="clientCity"
								component={Input}
							/>

							<Field
								placeholder="post code"
								label="post code"
								type="text"
								name="clientPostCode"
								component={Input}
							/>

							<Field
								placeholder="country"
								label="country"
								type="text"
								name="clientCountry"
								component={Input}
							/>
						</div>

						<h3 className={styles.section__title}></h3>

						<div className="grided-input">
							<Field
								placeholder="Invoice Date"
								label="Invoice Date"
								type="date"
								name="invoiceDate"
								component={Input}
							/>

							<Field
								placeholder="Invoice due date"
								label="Invoice Due Date"
								type="date"
								name="dueDate"
								component={Input}
							/>
						</div>

						<Field
							placeholder="Description"
							label="Project Description"
							type="text"
							name="description"
							component={Input}
						/>

						<h3 className={styles.item__title}>Item List</h3>

						<FieldArray name="itemList">
							{({ push, remove }) => (
								<div>
									{values.itemList.map((_item, index) => {
										return (
											<div className={styles.item__div} key={index}>
												<Field
													placeholder="Item name"
													label="Item Name"
													type="text"
													name={`itemList.${index}.itemName`}
													component={Input}
												/>

												<div className={styles.item__deets}>
													<Field
														placeholder=""
														label="Qty"
														type="number"
														name={`itemList.${index}.quantity`}
														component={Input}
													/>

													<Field
														placeholder="Price"
														label="Price"
														type="text"
														name="{`itemList.${index}.price`}"
														component={Input}
													/>

													<div className="input-container">
														<label htmlFor="">Total</label>
														<div className={styles.price}>200.00</div>
													</div>

													<Image
														src={"/assets/svg/invoices/delete.svg"}
														width={12}
														height={16}
														alt="trash-can"
														onClick={() => remove(index)}
													/>
												</div>
											</div>
										);
									})}

									<button
										className="button__add-new-item"
										type="button"
										onClick={() => push({ name: "", quantity: "", price: "" })}
									>
										+ Add New Item
									</button>
								</div>
							)}
						</FieldArray>
					</Form>
				)}
			</Formik>
		</div>
	);
};

export default EditInvoice;
