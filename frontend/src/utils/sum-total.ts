export const sumTotal = (items: { total: number }[]) => {
	return items.reduce((acc, item) => acc + item.total, 0);
};
