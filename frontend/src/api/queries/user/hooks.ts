import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { getUser } from "./request";
import { UserData } from "./response";
import { userQueryKeys } from "./keys";

export const useUser = (
	id: string | undefined
): UseQueryResult<UserData, Error> => {
	return useQuery({
		queryKey: [userQueryKeys.GET_USER],
		queryFn: getUser,
		// The `enabled` option prevents the query from running if `id` is null or undefined
		enabled: !!id,
		select: response => response.data.user,
	});
};
