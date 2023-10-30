interface Invoice {
	id: string;
	dueDate: string;
	amount: number;
	invoiceStatus: "pending" | "paid";
	name: string;
}

const invoices: Invoice[] = [
	{
		id: "#RT3080",
		dueDate: " 19 Aug 2021",
		amount: 2000,
		invoiceStatus: "pending",
		name: "Jensen Huang",
	},

	{
		id: "#XM9141",
		dueDate: " 20 Aug 2021",
		amount: 500.34,
		invoiceStatus: "paid",
		name: "John Morrison",
	},
];
