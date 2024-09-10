"use client";

import React, { useState, useEffect } from "react";
import styles from "../../Invoices.module.scss";
import * as Yup from "yup";
import { Formik, Form, Field, FieldArray } from "formik";
import Input from "@/components/shared/Input";
import Image from "next/image";
import axios from "axios";
import { Toast } from "@/components/shared/Toast";
import { useRouter, useSearchParams } from "next/navigation";

const FormSchema = Yup.object().shape({
	streetAddress: Yup.string().required("required"),
	city: Yup.string().required("required"),
	postCode: Yup.string().required("required "),
	country: Yup.string().required("required"),
	clientName: Yup.string().required("required"),
	clientEmail: Yup.string().email("Invalid Email").required("required"),
	clientStreetAddress: Yup.string().required("required"),
	clientCity: Yup.string().required("required"),
	clientPostCode: Yup.string().required("required"),
	clientCountry: Yup.string().required("required"),
	invoiceDate: Yup.string().required("required"),
	dueDate: Yup.string().required("required"),
	projectDescription: Yup.string().required("required"),
	itemList: Yup.array()
		.of(
			Yup.object({
				itemName: Yup.string().required(""),
				quantity: Yup.number().required("").positive("").integer(""),
				price: Yup.number().required("").positive(""),
			})
		)
		.min(1, "At least one item is required"),
});

interface InvoiceProps {
	id?: string;
	[key: string]: any;
}

type ChildFormProps = {
	editInvoice: (values: any) => void; // onSubmit function passed from the parent
	editSubmitRef: React.MutableRefObject<(() => void) | null>; // Ref to expose submitForm method to parent
};

const EditInvoice = ({ editInvoice, editSubmitRef }: ChildFormProps) => {
	const [invoice, setInvoice] = useState<InvoiceProps>({});
	const [isFetching, setisFetching] = useState(true);
	const router = useRouter();
	const idParams = useSearchParams();
	const id = idParams.get("id");

	const initialValues = {
		streetAddress: invoice.billFrom?.streetAddress,
		city: invoice.billFrom?.city,
		postCode: invoice.billFrom?.postCode,
		country: invoice.billFrom?.country,
		clientName: invoice?.clientName,
		clientEmail: invoice?.clientEmail,
		clientStreetAddress: invoice?.billTo?.streetAddress,
		clientCity: invoice.billTo?.city,
		clientPostCode: invoice.billTo?.postCode,
		clientCountry: invoice.billTo?.country,
		invoiceDate: invoice?.invoiceDate,
		dueDate: invoice?.dueDate,
		projectDescription: invoice?.projectDescription,
		itemList: invoice?.itemList,
	};

	useEffect(() => {
		const fetchInvoice = async () => {
			const token = localStorage.getItem("token");

			try {
				const response = await axios.get(
					`http://localhost:8080/invoices/${id}`,
					{
						headers: {
							authorization: `Bearer ${token}`,
						},
					}
				);
				setInvoice(response.data.data);
				setisFetching(false);
			} catch (err: any) {
				if (err.status === 401) {
					Toast.fire({
						icon: "error",
						title: "Session Expired, Please Login",
					});
					router.push("/auth/login");
				} else if (err.status === 404) {
					setInvoice({});
					setisFetching(false);
				} else {
					Toast.fire({
						icon: "error",
						title: err.response.data.error,
					});
				}
			}
		};
		fetchInvoice();
	}, [id, router]);

	if (isFetching)
		return (
			<div className="invoice-loader">
				<Image
					src={"/assets/svg/logo-rectangle.svg"}
					alt="app-logo"
					height={40}
					width={40}
				/>
			</div>
		);

	return (
		<div className={styles.crud__div}>
			<h1 className={styles.crudTitle}>Edit Invoice</h1>
			<Formik
				initialValues={initialValues}
				onSubmit={values => {
					console.log("values", values);
					editInvoice(values);
				}}
				validationSchema={FormSchema}
				enableReinitialize
			>
				{({ values, submitForm }) => {
					editSubmitRef.current = submitForm;
					return (
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
								name="projectDescription"
								component={Input}
							/>

							<h3 className={styles.item__title}>Item List</h3>

							<FieldArray name="itemList">
								{({ push, remove }) => (
									<div>
										{values.itemList.map((_item: any, index: number) => {
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
															name={`itemList.${index}.price`}
															component={Input}
														/>

														<div className="input-container">
															<label htmlFor="">Total</label>
															<div className={styles.price}>
																$
																{Number(values.itemList[index].quantity) *
																	Number(values.itemList[index].price)}
															</div>
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
											onClick={() =>
												push({ name: "", quantity: "", price: "" })
											}
										>
											+ Add New Item
										</button>
									</div>
								)}
							</FieldArray>
						</Form>
					);
				}}
			</Formik>
		</div>
	);
};

export default EditInvoice;
