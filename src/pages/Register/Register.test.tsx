import { render, screen, fireEvent, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import useAuthControl from '../../store/userAuthControl';
import { PageRegister } from './index';

jest.mock('../../store/userAuthControl', () => ({
	__esModule: true,
	default: jest.fn(),
}));

describe('Register Page - Integration Tests', () => {
	const mockRegisterUser = jest.fn();
	const mockNavigate = jest.fn();

	beforeEach(() => {
		jest.clearAllMocks();

		// Mock do Zustand
		(useAuthControl as unknown as jest.Mock).mockReturnValue({
			registerUser: mockRegisterUser,
			isAuthenticated: false,
		});

		jest.mock('react-router-dom', () => ({
			...jest.requireActual('react-router-dom'),
			useNavigate: () => mockNavigate,
		}));
	});

	it('form submits correctly', async () => {
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
			fireEvent.change(nameInput, { target: { value: 'Teste teste' } });
			fireEvent.change(emailInput, { target: { value: 'test@test.com' } });
			fireEvent.change(passwordInput, { target: { value: 'password123' } });
			fireEvent.click(submitButton);
		});

		// Verificar se a função registerUser foi chamada com os dados corretos
		expect(mockRegisterUser).toHaveBeenCalledWith({
			name: 'Teste teste',
			email: 'test@test.com',
			password: 'password123',
		});

		// Verificar se a navegação foi chamada
		expect(mockNavigate).toHaveBeenCalledWith('/login');
	});
});

