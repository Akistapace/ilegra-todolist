import { render, screen, renderHook } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { PageTask } from '.';
import { useTodoStore } from '../../jest/__mocks__/useTodoList';

describe('PageTask Tests', () => {
	// it('deve exibir "Tarefa não encontrada" quando a tarefa não existir', () => {
	// 	const { result } = renderHook(() => useTodoStore());
	// 	console.log('result', result);

	// 	render(
	// 		<BrowserRouter>
	// 			<PageTask />
	// 		</BrowserRouter>
	// 	);

	// 	expect(screen.getByText('Tarefa não encontrada.'));
	// });

	it('deve exibir os detalhes da tarefa quando encontrada', () => {
		const { result } = renderHook(() => useTodoStore());
		const mockTask = {
			title: 'Task 1',
			description: 'Description 1',
			date: '2024-12-01',
			priority: 'Alta' as 'Alta' | 'Medium' | 'Baixa',
			status: 'Pendente' as 'Pendente' | 'Concluído' | 'À fazer',
		};

		result.current.addTask(mockTask);

		render(
			<BrowserRouter>
				<PageTask />
			</BrowserRouter>
		);

		expect(screen.getByText(mockTask.title));
		expect(screen.getByText(mockTask.description));
		expect(screen.getByText(`Data: ${mockTask.date}`));
		expect(screen.getByText(`Prioridade: ${mockTask.priority}`));
		expect(screen.getByText(`Status: ${mockTask.status}`));
	});
});

