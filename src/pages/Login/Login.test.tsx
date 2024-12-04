import { MemoryRouter, useNavigate } from 'react-router-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PageLogin } from './index';
import useAuthControl from '../../store/userAuthControl';
// ====================================================== //
// ===================== UNIT TESTS ===================== //
// ====================================================== //
// Corrigir o mock do useAuthControl
jest.mock('react-router-dom', () => ({
	...jest.requireActual('react-router-dom'),
	useNavigate: jest.fn(),
}));
jest.mock('../../store/userAuthControl', () => ({
	__esModule: true,
	default: jest.fn(() => ({
		isAuthenticated: false,
		user: null,
		users: [{ name: 'test', email: 'test@test.com' }],
		login: jest.fn().mockReturnValue(null), // mock da função login
	})),
}));

describe('Login Page - Unit tests', () => {
	const mockNavigate = jest.fn();

	beforeEach(() => {
		// Mock para o useNavigate
		(useNavigate as jest.Mock).mockImplementation(() => mockNavigate);
		(useAuthControl as unknown as jest.Mock).mockReturnValue({
			isAuthenticated: true,
			user: { name: 'test', email: 'test@test.com' },
			users: [{ name: 'test', email: 'test@test.com' }],
			login: jest.fn(), // mock do login
		});
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	test('navigates to /to-do-list if user is authenticated', () => {
		render(
			<MemoryRouter>
				<PageLogin />
			</MemoryRouter>
		);

		// O navigate deveria ser chamado com '/to-do-list' se o usuário estiver autenticado
		expect(mockNavigate).toHaveBeenCalledWith('/to-do-list');
	});

	test('does not navigate if user is not authenticated', () => {
		// Mock para o hook useAuthControl (isAuthenticated = false)
		(useAuthControl as unknown as jest.Mock).mockReturnValue({
			isAuthenticated: false,
		});

		render(
			<MemoryRouter>
				<PageLogin />
			</MemoryRouter>
		);

		// O navigate não deve ser chamado se o usuário não estiver autenticado
		expect(mockNavigate).not.toHaveBeenCalled();
	});
});

// ====================================================== //
// ================== INTEGRTION TESTS ================== //
// ====================================================== //

describe('Login Page - Integration Tests', () => {
	const mockNavigate = jest.fn();

	beforeEach(() => {
		(useNavigate as jest.Mock).mockReturnValue(mockNavigate);
		(useAuthControl as unknown as jest.Mock).mockReturnValue({
			isAuthenticated: false,
			user: null,
			users: [{ name: 'test', email: 'test@test.com' }],
			login: jest.fn().mockReturnValue(null), // mock da função login
		});
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	test('renders FormLogin component', () => {
		render(
			<MemoryRouter>
				<PageLogin />
			</MemoryRouter>
		);

		// Verificar se o formulário de login é renderizado
		const loginForm = screen.getByTestId('form-login');
		expect(loginForm);
	});

	test('form submits correctly', async () => {
		render(
			<MemoryRouter>
				<PageLogin />
			</MemoryRouter>
		);
		const usernameInput = screen.getByTestId('email');
		const passwordInput = screen.getByTestId('password');
		const submitButton = screen.getByRole('button', { name: /Entrar/i });

		// Simulando um preenchimento de formulário
		await userEvent.type(usernameInput, 'test@test.com');
		await userEvent.type(passwordInput, 'password123');
		// await userEvent.click(submitButton);
		await fireEvent.click(submitButton);

		expect(useAuthControl().login).toHaveBeenCalledWith(
			'test@test.com',
			'password123'
		);

		expect(mockNavigate).toHaveBeenCalledWith('/to-do-list');
	});

	test('redirects to /to-do-list when authenticated', () => {
		// Mock para o hook useAuthControl (isAuthenticated = true)
		(useAuthControl as unknown as jest.Mock).mockReturnValue({
			isAuthenticated: true,
			user: { name: 'test', email: 'test@test.com' },
			users: [{ name: 'test', email: 'test@test.com' }],
			login: jest.fn(), // mock do login
		});

		render(
			<MemoryRouter>
				<PageLogin />
			</MemoryRouter>
		);

		expect(mockNavigate).toHaveBeenCalledWith('/to-do-list');
	});
});

