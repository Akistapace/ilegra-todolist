export const truncate = (text: string, maxLength: number = 30) => {
	if (text.length > maxLength) {
		return text.slice(0, maxLength) + '...';
	}
	return text;
};

