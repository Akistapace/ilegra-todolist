import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter as Router, MemoryRouter, Route, Routes } from 'react-router-dom';
import PageTask from '../pages/Task/index';
import { useTodoStore } from '../store/useTodoList';
import useAuthControl from '../store/userAuthControl';

jest.mock('../store/useTodoList', () => ({
	useTodoStore: jest.fn(),
}));
jest.mock('../store/userAuthControl');

const mockedUseTodoStore = useTodoStore as jest.MockedFunction<typeof useTodoStore>;

const mockedUseStore = useAuthControl as jest.MockedFunction<typeof useAuthControl>;
describe('Page Task', () => {
	beforeEach(() => {
		mockedUseTodoStore.mockReturnValue({
			todoList: [
				{
					id: '1',
					title: 'Tarefa 1',
					description: 'Descrição 1',
					date: '2024-12-01',
					priority: 'Alta',
					status: 'Pendente',
				},
				{
					id: '2',
					title: 'Tarefa 2',
					description: 'Descrição 2',
					date: '2024-12-02',
					priority: 'Baixa',
					status: 'Concluído',
				},
			],
			addTask: jest.fn(),
			removeTask: jest.fn(),
			editTask: jest.fn(),
		});
		mockedUseStore.mockReturnValue({
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
		});
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it('should show the task details when navigating to /task/:id', async () => {
		render(
			<MemoryRouter initialEntries={['/task/1']}>
				<Routes>
					<Route path='/task/:id' element={<PageTask />} />
				</Routes>
			</MemoryRouter>
		);

		await waitFor(() => {
			expect(screen.getByText('Task'));
			expect(screen.getByText('Descrição 1'));
			expect(screen.getByText('2024-12-01'));
			expect(screen.getByText('Alta'));
			expect(screen.getByText('Pendente'));
		});
	});

	it('should has "Tarefa não encontrada" when task not found', async () => {
		mockedUseTodoStore.mockReturnValue({
			todoList: [],
		});

		render(
			<Router>
				<PageTask />
			</Router>
		);

		await waitFor(() => {
			expect(screen.getByText(/Tarefa não encontrada./));
		});
	});
});

