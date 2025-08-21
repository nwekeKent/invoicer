import { RequestResponse } from "@/types"; // Assuming your generic type is here

export type UserData = {
	id: string;
	name: string;
	email: string;
	companyName: string;
};

export type User = {
	user: UserData;
};

export type UserResponse = RequestResponse<User>;
