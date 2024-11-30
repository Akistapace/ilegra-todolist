import { create } from 'zustand';

interface AuthState {
	isAuthenticated: boolean;
	user: {
		name: string;
		password: string;
		email: string;
	} | null;
	login: () => void;
	logout: () => void;
}

const useAuthControl = create<AuthState>((set) => ({
	isAuthenticated: false,
	user: null,
	login: () =>
		set({
			isAuthenticated: true,
			user: {
				name: 'Fernando',
				password: '1234',
				email: 'fernando.teste@gmail.com',
			},
		}),
	logout: () =>
		set({
			isAuthenticated: false,
			user: null,
		}),
}));

export default useAuthControl;

