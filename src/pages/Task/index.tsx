import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useTodoStore } from '../../store/useTodoList';
import style from './style.module.css';
interface Task {
	id: string;
	title: string;
	description: string;
	date: string;
	priority: 'Alta' | 'Medium' | 'Baixa';
	status: 'Pendente' | 'Concluído' | 'À fazer';
}

const PageTask = () => {
	const { id } = useParams();
	const { todoList } = useTodoStore();
	const [task, setTask] = useState<Task | null>(null);

	useEffect(() => {
		const foundTask = todoList.find((task) => task.id === id);
		if (foundTask) setTask(foundTask);
	}, [id, todoList]);

	if (!task) return <div>Tarefa não encontrada.</div>;

	return (
		<div className={`page ${style.pageTask}`}>
			<h1 className='title'>Task</h1>
			<div className='container'>
				<h2 className='title'>{task.title}</h2>
				<p className={style.paragraph}>
					<strong>Descrição:</strong> {task.description}
				</p>
				<p className={style.paragraph}>
					<strong>Data:</strong> {task.date}
				</p>
				<p className={style.paragraph}>
					<strong>Prioridade:</strong> {task.priority}
				</p>
				<p className={style.paragraph}>
					<strong>Status:</strong> {task.status}
				</p>
			</div>
		</div>
	);
};

export default PageTask;

