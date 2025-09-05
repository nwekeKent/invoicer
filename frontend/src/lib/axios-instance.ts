import axios, { AxiosError } from "axios";

// Define a custom error type to include our flag
export interface AuthAxiosError extends AxiosError {
	isAuthError?: boolean;
}

const axiosInstance = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL,
	headers: {
		"Content-Type": "application/json",
	},
});

const PUBLIC_ENDPOINTS = ["/auth/login", "/auth/signup"];

// Request interceptor
axiosInstance.interceptors.request.use(
	config => {
		const isPublic = PUBLIC_ENDPOINTS.some(path => config.url?.includes(path));

		if (!isPublic) {
			const token =
				typeof window !== "undefined" ? localStorage.getItem("token") : null;
			if (token && config.headers) {
				config.headers.Authorization = `Bearer ${token}`;
			}
		}

		return config;
	},
	error => Promise.reject(error)
);

// Response interceptor
axiosInstance.interceptors.response.use(
	response => response,
	(error: AuthAxiosError) => {
		// Check if it's a 401 Unauthorized error
		if (error.response?.status === 401) {
			if (typeof window !== "undefined") {
				import("@/components/shared/Toast").then(({ Toast }) => {
					Toast.fire({
						icon: "error",
						title: "Session expired. Please log in again.",
					});
				});
				window.location.href = "/auth/login";
			}

			error.isAuthError = true;
		}

		// Return the modified error so the UI layer can inspect it
		return Promise.reject(error);
	}
);

export default axiosInstance;
