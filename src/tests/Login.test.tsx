import { render, screen, fireEvent, act } from '@testing-library/react';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import PageLogin from '../pages/Login/index';
import useAuthControl from '../store/userAuthControl';
import userEvent from '@testing-library/user-event';

jest.mock('react-router-dom', () => ({
	...jest.requireActual('react-router-dom'),
	useNavigate: jest.fn(),
}));

jest.mock('../store/userAuthControl');

const mockNavigate = jest.fn();
const mockedUseStore = useAuthControl as jest.MockedFunction<typeof useAuthControl>;

beforeEach(() => {
	(useNavigate as jest.Mock).mockReturnValue(mockNavigate);
	mockedUseStore.mockReturnValue({
		isAuthenticated: false,
		user: null,
		users: [],
		login: jest.fn(),
	});
});

afterEach(() => {
	jest.clearAllMocks();
});

describe('Login Page - Unit Tests', () => {
	it('does not navigate to /to-do-list if user is not authenticated', () => {
		render(
			<MemoryRouter>
				<PageLogin />
			</MemoryRouter>
		);

		expect(mockedUseStore().isAuthenticated).toBe(false);
		expect(mockNavigate).not.toHaveBeenCalled();
	});

	it('navigates to /to-do-list if user is authenticated', () => {
		mockedUseStore.mockReturnValueOnce({
			isAuthenticated: true,
			user: {
				name: 'Teste Teste 2',
				email: 'test@test.com',
				password: 'password123',
			},
			users: [
				{
					name: 'Teste Teste 2',
					email: 'test@test.com',
					password: 'password123',
				},
			],
			login: jest.fn(),
		});

		render(
			<MemoryRouter>
				<PageLogin />
			</MemoryRouter>
		);

		expect(mockNavigate).toHaveBeenCalledWith('/to-do-list');
	});
});

describe('Login Page - Integration Tests', () => {
	it('should renders FormLogin', () => {
		render(
			<MemoryRouter>
				<PageLogin />
			</MemoryRouter>
		);

		const loginForm = screen.getByTestId('form-login');
		expect(loginForm);
	});

	it('should submit form correctly', async () => {
		render(
			<MemoryRouter>
				<PageLogin />
			</MemoryRouter>
		);

		const emailInput = screen.getByTestId('email');
		const passwordInput = screen.getByTestId('password');
		const submitButton = screen.getByRole('button', { name: /Entrar/i });

		await act(async () => {
			await userEvent.type(emailInput, 'test@test.com');
			await userEvent.type(passwordInput, 'password123');
			fireEvent.click(submitButton);
		});

		expect(mockedUseStore().login).toHaveBeenCalledWith(
			'test@test.com',
			'password123'
		);
		expect(mockNavigate).toHaveBeenCalledWith('/to-do-list');
	});
});

