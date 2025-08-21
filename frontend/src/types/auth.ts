export type User = {
	id: string;
	name: string;
	email: string;
	companyName?: string;
};

export type UserData = {
	id: string;
	name: string;
	email: string;
	companyName?: string;
	streetAddress?: string;
	city?: string;
	postCode?: string;
	country?: string;
};
