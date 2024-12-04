import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type User = {
	name: string;
	password: string;
	email: string;
};

interface AuthState {
	isAuthenticated: boolean;
	user: User | null;
	users: User[];
	login: (email: string, password: string) => string | null;
	logout: () => void;
	register: (user: User) => void;
}

const useAuthControl = create(
	persist<AuthState>(
		(set) => ({
			isAuthenticated: false,
			user: null,
			users: [],
			login(email, password) {
				const state = useAuthControl.getState();
				const user = state.users.find(
					(user) => user.email === email && user.password === password
				);

				if (user) {
					set({ isAuthenticated: true, user });
					return '';
				} else {
					return 'Usuário não cadastrado';
				}
			},
			logout: () => set({ isAuthenticated: false, user: null }),
			register: (newUser) => {
				set((state) => ({
					users: [...state.users, newUser],
				}));
			},
		}),
		{
			name: 'auth-storage',
		}
	)
);

export default useAuthControl;

