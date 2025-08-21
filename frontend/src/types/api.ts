export type RequestResponse<T = null, key extends string = "data"> = {
	message: string;
	status: string;
} & Record<key, T>;
