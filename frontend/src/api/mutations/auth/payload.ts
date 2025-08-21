export type LoginPayload = {
	email: string;
	password: string;
};

export type RegisterPayload = {
	email: string;
	password: string;
	name: string;
	companyName: string;
	streetAddress: string;
	city: string;
	postCode: string;
	country: string;
};
