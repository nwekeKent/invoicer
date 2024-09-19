import React from "react";
import Card from "./Card";
import { motion } from "framer-motion";

type ModalProps = {
	children: React.ReactNode;
};

const Modal = ({ children }: ModalProps) => {
	return (
		<div className="modal-wrapper">
			<motion.div
				initial={{ y: -500 }}
				animate={{ y: 0 }}
				exit={{ y: -600 }}
				transition={{
					duration: 0.2,
					type: "spring",
					stiffness: 200,
					ease: "easeInOut",
				}}
			>
				<Card containerClass="modal__card">{children}</Card>
			</motion.div>
		</div>
	);
};

export default Modal;
