import React from "react";

type CardProps = {
	containerClass: string;
	children: React.ReactNode;
	handleClick?: () => void;
};

const Card = ({ containerClass, children, handleClick }: CardProps) => {
	return (
		<div className={`card--component ${containerClass}`} onClick={handleClick}>
			{children}
		</div>
	);
};

export default Card;
