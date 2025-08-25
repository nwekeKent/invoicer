import { useMutation } from "@tanstack/react-query";
import {
	LoginPayload,
	RegisterPayload,
	login,
	register,
	AuthResponse,
} from "@/api";
import { Toast } from "@/components/shared/Toast";
import { formatErrorMsg } from "@/utils";
import { useRouter } from "next/navigation";

export const useLogin = () => {
	const router = useRouter();
	return useMutation<AuthResponse, Error, LoginPayload>({
		mutationFn: payload => login(payload),
		onSuccess: response => {
			localStorage.setItem("token", response.data.token);
			localStorage.setItem("user", JSON.stringify(response.data.user));
			Toast.fire({
				icon: "success",
				title: response.message || "Login successful!",
			});
			router.push("/invoices");
		},
		onError: (error: Error) => {
			Toast.fire({
				icon: "error",
				title: formatErrorMsg(error.message) || "Failed to login!",
			});
		},
	});
};

export const useRegister = () => {
	const router = useRouter();
	return useMutation<AuthResponse, Error, RegisterPayload>({
		mutationFn: payload => register(payload),
		onSuccess: response => {
			localStorage.setItem("token", response.data.token);
			localStorage.setItem("user", JSON.stringify(response.data.user));
			Toast.fire({
				icon: "success",
				title: response.message || "User registered successful!",
			});

			router.push("/invoices");
		},
		onError: (error: Error) => {
			Toast.fire({
				icon: "error",
				title: formatErrorMsg(error.message) || "Failed to register user!",
			});
		},
	});
};
