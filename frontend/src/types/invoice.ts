export type Address = {
	streetAddress: string;
	city: string;
	postCode: string;
	country: string;
};

export type InvoiceItem = {
	itemName: string;
	quantity: number;
	price: number;
	total: number;
};

export type InvoiceData = {
	id: string;
	userId: string;
	status: "paid" | "pending";
	clientName: string;
	clientEmail: string;
	billFrom: Address;
	billTo: Address;
	invoiceDate: string;
	dueDate: string;
	projectDescription: string;
	itemList: InvoiceItem[];
};
