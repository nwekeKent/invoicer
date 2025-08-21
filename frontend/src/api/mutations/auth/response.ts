import { RequestResponse, User } from "@/types";

export type AuthData = {
	token: string;
	user: User;
};

export type AuthResponse = RequestResponse<AuthData>;
