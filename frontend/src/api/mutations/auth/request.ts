import axiosInstance from "@/lib/axios-instance";
import { endpoints } from "./endpoint";
import { LoginPayload, RegisterPayload, AuthResponse } from "@/api";

export const login = async ({
	email,
	password,
}: LoginPayload): Promise<AuthResponse> => {
	const response = await axiosInstance.post<AuthResponse>(endpoints.login, {
		email,
		password,
	});

	return response.data;
};

export const register = async (
	payload: RegisterPayload
): Promise<AuthResponse> => {
	const response = await axiosInstance.post<AuthResponse>(endpoints.login, {
		payload,
	});

	return response.data;
};
