export const formatErrorMsg = (str: string) => {
	let newStr = "";

	if (str) {
		const formatStr = str.split("/");
		newStr = formatStr[1]?.replace(/-/g, " ");
	}

	return newStr;
};
