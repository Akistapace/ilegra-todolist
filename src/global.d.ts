declare global {
	type User = {
		password: string;
		username: string;
		email: string;
	};

	type Task = {
		id: Key | null | undefined;
		title: string;
		description: string;
		date: string;
		priority: string;
		status: string;
		attachment: File | null;
	};
}

