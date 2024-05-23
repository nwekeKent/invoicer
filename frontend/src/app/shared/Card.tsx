import React from "react";

type CardProps = {
	containerClass: string;
	children: React.ReactNode;
};

const Card = ({ containerClass, children }: CardProps) => {
	return <div className={`card--component ${containerClass}`}>{children}</div>;
};

export default Card;
