import React from "react";

type PillProps = {
	status: "Pending" | "Paid" | undefined;
};

export const StatusPill = ({ status }: PillProps) => {
	const dynamicClass =
		status === "Pending" ? "status-pill" : "status-pill paid";

	return (
		<div className={dynamicClass}>
			<div className="status-ball"></div>
			<p>{status}</p>
		</div>
	);
};
