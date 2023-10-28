import Image from "next/image";
import React from "react";

type CheckboxProps = {
	label: string;
	handleChange?: () => void;
};

export default function Checkbox({ label, handleChange }: CheckboxProps) {
	return (
		<div className="custom-checkbox">
			<div>
				<input type="checkbox" name="check-box" onChange={handleChange} />
				<span className="checkmark">
					<Image
						src={"assets/svg/invoices/check.svg"}
						width={10}
						height={9}
						alt="check-mark"
						className="checkmark-svg"
					/>
				</span>
			</div>

			<label htmlFor="check-box">{label}</label>
		</div>
	);
}