import { render, screen, fireEvent, act } from '@testing-library/react';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import PageRegister from '../pages/Register/index';
import useAuthControl from '../store/userAuthControl';

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
		register: jest.fn(),
	});
});

afterEach(() => {
	jest.clearAllMocks();
});

// ====================================================== //
// ===================== UNIT TESTS ===================== //
// ====================================================== //
describe('Register Page - Unit Tests', () => {
	it('shows error when name, email, password is empty', async () => {
		render(
			<MemoryRouter>
				<PageRegister />
			</MemoryRouter>
		);

		const submitButton = screen.getByRole('button', { name: /Entrar/i });

		await act(async () => {
			fireEvent.click(submitButton);
		});

		expect(screen.getByText(/Nome é obrigatório/));
		expect(screen.getByText(/Formato de email inválido/));
		expect(screen.getByText(/É necessário no mínimo 6 caracteres/));
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
				<PageRegister />
			</MemoryRouter>
		);

		expect(mockNavigate).toHaveBeenCalledWith('/to-do-list');
	});
});

// ====================================================== //
// ================== INTEGRATION TESTS ================= //
// ====================================================== //
describe('Register Page - Integration Tests', () => {
	it('should submit form correctly', async () => {
		render(
			<MemoryRouter>
				<PageRegister />
			</MemoryRouter>
		);

		const nameInput = screen.getByTestId('name');
		const emailInput = screen.getByTestId('email');
		const passwordInput = screen.getByTestId('password');
		const submitButton = screen.getByRole('button', { name: /Entrar/i });

		await act(async () => {
			await userEvent.type(nameInput, 'Teste teste');
			await userEvent.type(emailInput, 'test@test.com');
			await userEvent.type(passwordInput, 'password123');
			fireEvent.click(submitButton);
		});

		expect(mockedUseStore().register).toHaveBeenCalledWith({
			name: 'Teste Teste',
			email: 'test@test.com',
			password: 'password123',
		});

		expect(mockNavigate).toHaveBeenCalledWith('/login');
	});
});

