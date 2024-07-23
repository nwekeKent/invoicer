"use client";

import React from "react";
import { Field, getIn } from "formik";
import { InputHTMLAttributes } from "react";
import { FieldInputProps } from "formik";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	label?: string;
	field: FieldInputProps<any>;
}

const Input = ({ field, ...props }: InputProps) => {
	return (
		<Field>
			{({ form }: any) => {
				const error = getIn(form.errors, field.name);
				const touch = getIn(form.touched, field.name);
				return (
					<div className="input-container">
						<div className="label-container">
							<label>{props.label}</label>

							{touch && error ? (
								<label htmlFor="" className="error-input-message">
									{error}
								</label>
							) : null}
						</div>
						<input
							{...field}
							{...props}
							className={touch && error ? "isError" : ""}
						/>
					</div>
				);
			}}
		</Field>
	);
};

export default Input;
