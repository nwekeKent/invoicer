import React from "react";
import Card from "./Card";

type ModalProps = {
	children: React.ReactNode;
};

const Modal = ({ children }: ModalProps) => {
	return (
		<div className="modal-wrapper">
			<Card containerClass="modal__card">{children}</Card>
		</div>
	);
};

export default Modal;
