import { useMutation } from "@tanstack/react-query";
import {
	LoginPayload,
	RegisterPayload,
	login,
	register,
	AuthResponse,
} from "@/api";

export const useLogin = () => {
	return useMutation<AuthResponse, Error, LoginPayload>({
		mutationFn: payload => login(payload),
	});
};

export const useRegister = () => {
	return useMutation<AuthResponse, Error, RegisterPayload>({
		mutationFn: payload => register(payload),
	});
};
