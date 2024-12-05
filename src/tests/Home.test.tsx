import { MemoryRouter, useNavigate } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PageHome from '../pages/Home/index';

jest.mock('react-router-dom', () => ({
	...jest.requireActual('react-router-dom'),
	useNavigate: jest.fn(),
}));

describe('Home Page - Unit tests', () => {
	it('should render 2 button buttons, login and sign in', () => {
		render(
			<MemoryRouter>
				<PageHome />
			</MemoryRouter>
		);

		expect(screen.getByText(/Login/i));
		expect(screen.getByText(/Sign in/i));
	});
});

describe('Home Page - Integration tests', () => {
	const mockNavigate = jest.fn();

	beforeEach(() => {
		(useNavigate as jest.Mock).mockReturnValue(mockNavigate);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it('navigates to /login when Login button is clicked', async () => {
		render(
			<MemoryRouter>
				<PageHome />
			</MemoryRouter>
		);

		const loginButton = screen.getByText(/Login/i);
		await userEvent.click(loginButton);

		expect(mockNavigate).toHaveBeenCalledWith('/login');
	});

	it('navigates to /register when Sign in button is clicked', async () => {
		render(
			<MemoryRouter>
				<PageHome />
			</MemoryRouter>
		);

		const signInButton = screen.getByText(/Sign in/i);
		await userEvent.click(signInButton);

		expect(mockNavigate).toHaveBeenCalledWith('/register');
	});
});

