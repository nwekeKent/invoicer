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

	const { token, user } = response.data?.data;

	localStorage.setItem("token", token);
	localStorage.setItem("user", JSON.stringify(user));

	return response.data;
};

export const register = async (
	payload: RegisterPayload
): Promise<AuthResponse> => {
	const response = await axiosInstance.post<AuthResponse>(endpoints.login, {
		payload,
	});

	const { token, user } = response.data?.data;

	localStorage.setItem("token", token);
	localStorage.setItem("user", JSON.stringify(user));

	return response.data;
};
