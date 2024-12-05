import { MemoryRouter, useNavigate } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import PageNotFound from '../pages/NotFound/index';

jest.mock('react-router-dom', () => ({
	...jest.requireActual('react-router-dom'),
	useNavigate: jest.fn(),
}));

describe('Register Page', () => {
	const mockNavigate = jest.fn();
	beforeEach(() => {
		(useNavigate as jest.Mock).mockReturnValue(mockNavigate);
	});
	afterEach(() => {
		jest.clearAllMocks();
	});

	render(
		<MemoryRouter>
			<PageNotFound />
		</MemoryRouter>
	);

	it('should renders the PageNotFound when type an url not defined in routes ', () => {
		mockNavigate('/teste');
		expect(screen.getByText('Página não encontrada'));
	});
});

