import axiosInstance from "@/lib/axios-instance";
import { UserResponse } from "./response";
import { endpoints } from "./endpoints";

export const getUser = async (): Promise<UserResponse> => {
	const response = await axiosInstance.get(`${endpoints.user}`);
	return response.data;
};
