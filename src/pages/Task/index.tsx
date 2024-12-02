import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useTodoStore } from '../../store/useTodoList';

interface Task {
	id: string;
	title: string;
	description: string;
	date: string;
	priority: 'Alta' | 'Medium' | 'Baixa';
	status: 'Pendente' | 'Concluído' | 'À fazer';
}

export const PageTask = () => {
	const { id } = useParams();
	const { todoList } = useTodoStore();
	const [task, setTask] = useState<Task | null>(null);

	useEffect(() => {
		const foundTask = todoList.find((task) => task.id === id);
		if (foundTask) setTask(foundTask);
		console.log('todoList', todoList);
	}, [id, todoList]);

	if (!task) return <div>Tarefa não encontrada.</div>;

	return (
		<div>
			<h1>{task.title}</h1>
			<p>{task.description}</p>
			<p>
				<strong>Data:</strong> {task.date}
			</p>
			<p>
				<strong>Prioridade:</strong> {task.priority}
			</p>
			<p>
				<strong>Status:</strong> {task.status}
			</p>
		</div>
	);
};

