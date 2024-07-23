import React from "react";

type PillProps = {
	status: "pending" | "paid";
};

export const StatusPill = ({ status }: PillProps) => {
	const dynamicClass =
		status === "pending" ? "status-pill" : "status-pill paid";

	return (
		<div className={dynamicClass}>
			<div className="status-ball"></div>
			<p>{status}</p>
		</div>
	);
};
