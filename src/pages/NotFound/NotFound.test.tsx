import { MemoryRouter, useNavigate } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { PageNotFound } from '.';

jest.mock('react-router-dom', () => ({
	...jest.requireActual('react-router-dom'),
	useNavigate: jest.fn(),
}));

describe('', () => {
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

	it('renders the PageNotFound component when type an url not defined in routes ', () => {
		mockNavigate('/teste');
		expect(screen.getByText('Página não encontrada'));
	});
});

