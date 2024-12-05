import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes, useNavigate } from 'react-router-dom';
import { useTodoStore } from '../store/useTodoList';
import useAuthControl from '../store/userAuthControl';
import userEvent from '@testing-library/user-event';
import PageToDOList from '../pages/TodoList/index';
import PageTask from '../pages/Task';

jest.mock('../store/useTodoList', () => ({
	useTodoStore: jest.fn(),
}));
jest.mock('../store/userAuthControl');

jest.mock('react-router-dom', () => ({
	...jest.requireActual('react-router-dom'),
	useNavigate: jest.fn(),
}));

const mockedUseTodoStore = useTodoStore as jest.MockedFunction<typeof useTodoStore>;

const mockedUseStore = useAuthControl as jest.MockedFunction<typeof useAuthControl>;

describe('Page ToDoList - Unit Tests', () => {
	beforeEach(() => {
		mockedUseTodoStore.mockReturnValue({
			todoList: [],
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
	it('should show a message "Crie uma tarefa" when the list of task is empty', () => {
		render(
			<MemoryRouter>
				<PageToDOList />
			</MemoryRouter>
		);

		expect(screen.getByText(/Crie uma tarefa/));
	});

	it('should add a new task', async () => {
		const mockAddTask = jest.fn();
		mockedUseTodoStore.mockReturnValue({
			todoList: [],
			addTask: mockAddTask,
			removeTask: jest.fn(),
			editTask: jest.fn(),
		});

		render(
			<MemoryRouter>
				<PageToDOList />
			</MemoryRouter>
		);

		const openTaskButton = screen.getByRole('button', { name: /Criar Tarefa/i });
		fireEvent.click(openTaskButton);
		await act(async () => {
			await new Promise((resolve) => setTimeout(resolve, 1000));
		});
		const titleInput = screen.getByTestId('title');
		const descriptionInput = screen.getByTestId('description');
		const dateInput = screen.getByTestId('date');
		const statusInput = screen.getByTestId('status');
		const priorityInput = screen.getByTestId('priority');
		const addTaskButton = screen.getByRole('button', { name: /Adicionar Tarefa/i });

		await act(async () => {
			await userEvent.type(titleInput, 'Nova Tarefa');
			await userEvent.type(descriptionInput, 'Descrição da nova tarefa');
			await userEvent.type(dateInput, '2024-12-10');
			await userEvent.type(priorityInput, 'Alta');
			await userEvent.type(statusInput, 'Pendente');
			fireEvent.click(addTaskButton);
		});

		expect(mockAddTask).toHaveBeenCalledWith(
			expect.objectContaining({
				title: 'Nova Tarefa',
				description: 'Descrição da nova tarefa',
				date: '2024-12-10',
				priority: 'Alta',
				status: 'Pendente',
			})
		);
	});
});

describe('Page ToDoList - Integration Tests', () => {
	const mockNavigate = jest.fn();
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
		(useNavigate as jest.Mock).mockReturnValue(mockNavigate);
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

	it('should apply filters correctly', async () => {
		render(
			<MemoryRouter>
				<PageToDOList />
			</MemoryRouter>
		);

		const searchInput = screen.getByTestId(/search/);
		await act(async () => {
			await userEvent.type(searchInput, 'Tarefa 1');
			await new Promise((resolve) => setTimeout(resolve, 500));
		});
		expect(screen.getByText(/Tarefa 1/));
		expect(screen.queryByText(/Tarefa 2/)).toBeNull();

		const statusFilterButton = screen.getByTestId('filter-Pendente');
		await act(async () => {
			fireEvent.click(statusFilterButton);
			await new Promise((resolve) => setTimeout(resolve, 500));
		});
		expect(screen.getByText('Tarefa 1'));
		expect(screen.queryByText('Tarefa 2')).toBeNull();

		const priorityFilterButton = screen.getByTestId('filter-Alta');
		await act(async () => {
			fireEvent.click(priorityFilterButton);
			await new Promise((resolve) => setTimeout(resolve, 500));
		});
		expect(screen.getByText('Tarefa 1'));
		expect(screen.queryByText('Tarefa 2')).toBeNull();
	});

	it('should remove a task when clicking the remove button', async () => {
		const mockRemoveTask = jest.fn();

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
			removeTask: mockRemoveTask,
			editTask: jest.fn(),
		});

		render(
			<MemoryRouter>
				<PageToDOList />
			</MemoryRouter>
		);

		const removeButton = screen.getAllByTestId('remove')[0];

		await act(async () => {
			fireEvent.click(removeButton);
		});

		expect(mockRemoveTask).toHaveBeenCalledWith('1');
	});

	it('should navigate to task page when clicked in link to go', async () => {
		const user = userEvent.setup();

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
			editTask: jest.fn(),
		});

		render(
			<MemoryRouter initialEntries={['/to-do-list']}>
				<Routes>
					<Route path='/to-do-list' element={<PageToDOList />} />
					<Route path='/task/:id' element={<PageTask />} />
				</Routes>
			</MemoryRouter>
		);

		const taskLink = screen.getByTestId('task-link-1');
		expect(taskLink);

		await user.click(taskLink);

		await waitFor(() => {
			expect(screen.getByText('Task'));
			expect(screen.getByText('Descrição 1'));
			expect(screen.getByText('2024-12-01'));
			expect(screen.getByText('Alta'));
			expect(screen.getByText('Pendente'));
		});
	});

	it('should close the modal when the close button is clicked', async () => {
		render(
			<MemoryRouter>
				<PageToDOList />
			</MemoryRouter>
		);

		// Open the modal
		const openTaskButton = screen.getByRole('button', { name: /Criar Tarefa/i });
		fireEvent.click(openTaskButton);

		// Assert that the modal is open
		const modal = screen.getByTestId('modal');
		expect(modal);

		// Click the close button
		const modalClose = screen.getByTestId('close-modal'); // Assuming the close button has this name
		fireEvent.click(modalClose);

		// Wait for the modal to close
		await waitFor(() => {
			expect(screen.queryByTestId('title')).toBeNull();
		});
	});
});

