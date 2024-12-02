import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTodoStore } from '../../store/useTodoList';
import { Button } from '../../ui/Button';
import { Input } from '../../ui/Input';
import { Select } from '../../ui/Select';
import { Modal } from '../../ui/Modal';
import { utils } from '../../utils';
import { v4 as uuidv4 } from 'uuid';
import z from 'zod';
import style from './style.module.css';

const taskSchema = z.object({
	id: z
		.string()
		.uuid()
		.default(() => uuidv4()),
	title: z.string().min(1, 'Título é obrigatório'),
	description: z.string().min(1, 'É necessário definir uma descrição'),
	date: z
		.string()
		.regex(
			/^\d{4}-\d{2}-\d{2}$/,
			'O formato da data deve ser YYYY-MM-DD (ex.: 2024-01-01)'
		),
	priority: z.enum(['Alta', 'Medium', 'Baixa'], {
		errorMap: () => ({ message: 'A prioridade deve ser Alta, Média ou Baixa' }),
	}),
	status: z.enum(['Pendente', 'Concluído', 'À fazer'], {
		errorMap: () => ({ message: 'O status deve ser Pendentee ou Concluído' }),
	}),
});

type Task = z.infer<typeof taskSchema>;

const STATUS = [
	{ label: 'Pendente', value: 'Pendente' },
	{ label: 'À fazer', value: 'À fazer' },
	{ label: 'Concluido', value: 'Concluído' },
];

const PRIORITIES = [
	{ label: 'Alta', value: 'Alta' },
	{ label: 'Baixa', value: 'Baixa' },
	{ label: 'Média', value: 'Medium' },
];

export const PageToDOList = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [editingTask, setEditingTask] = useState<Task | null>(null);
	const { todoList, addTask, editTask, removeTask } = useTodoStore();

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<Task>({
		resolver: zodResolver(taskSchema),
	});

	const handleCreateTask = (data: Omit<Task, 'id'>) => {
		const newTask: Task = { ...data, id: uuidv4() };

		addTask(newTask);

		setTimeout(() => {
			reset({
				title: '',
				description: '',
				date: '',
				priority: 'Alta',
				status: 'Pendente',
			});
			setIsOpen(false);
		}, 300);
	};

	const handleEditTask = (data: Task) => {
		const task = todoList?.find((task) => task.id === data.id);
		editTask(task);

		setTimeout(() => {
			reset({
				title: '',
				description: '',
				date: '',
				priority: 'Alta',
				status: 'Pendente',
			});
			setEditingTask(null);
			setIsOpen(false);
		}, 300);
	};

	const handleRemove = (id: string) => {
		removeTask(id);
	};

	const openEditForm = (task: Task) => {
		setEditingTask(task);
		setIsOpen(true);
		reset(task);
	};

	const handleFormSubmit = (data: Omit<Task, 'id'>) => {
		if (editingTask) {
			handleEditTask({ ...data, id: editingTask.id });
		} else {
			handleCreateTask(data);
		}
	};

	const handleClick = () => {
		setEditingTask(null);
		setIsOpen(true);
		reset({
			title: '',
			description: '',
			date: '',
			priority: 'Alta',
			status: 'Pendente',
		});
	};

	const handleClose = () => {
		setIsOpen(false);
		reset({
			title: '',
			description: '',
			date: '',
			priority: 'Alta',
			status: 'Pendente',
		});
	};

	return (
		<div className={`container ${style.pageToDoList}`}>
			<h1>TODO LIST</h1>
			<div className='top'>
				<div className='search'>
					<input type='text' placeholder='Pesquisar tarefa' />
				</div>

				<Button type='button' onClick={handleClick}>
					Criar Tarefa
				</Button>
			</div>

			<Modal isOpen={isOpen} onClose={handleClose}>
				<form className={style.form} onSubmit={handleSubmit(handleFormSubmit)}>
					<Input
						placeholder='Título'
						type='text'
						register={register('title')}
					/>
					{errors.title && <span>{errors.title.message}</span>}

					<Input
						placeholder='Descrição'
						type='text'
						register={register('description')}
					/>
					{errors.description && <span>{errors.description.message}</span>}

					<Input placeholder='Data' type='date' register={register('date')} />
					{errors.date && <span>{errors.date.message}</span>}

					<Select register={register('status')} label='Status' options={STATUS}>
						{errors.status && <span>{errors.status.message}</span>}
					</Select>

					<Select
						register={register('priority')}
						label='Prioridade'
						options={PRIORITIES}
					>
						{errors.priority && <span>{errors.priority.message}</span>}
					</Select>

					<Button type='submit'>
						{editingTask ? 'Salvar Alterações' : 'Adicionar Tarefa'}
					</Button>
				</form>
			</Modal>

			<div className='content'>
				<table className={style.table}>
					<thead className={style.head}>
						<tr className={style.tr}>
							<th className={style.th}>Título</th>
							<th className={style.th}>Descrição</th>
							<th className={style.th}>Data</th>
							<th className={style.th}>Prioridade</th>
							<th className={style.th}>Status</th>
							<th className={style.th}>Ações</th>
						</tr>
					</thead>
					<tbody>
						{todoList.map((task) => (
							<tr key={task.id} className={style.tr}>
								<td className={style.td}>{utils.truncate(task.title)}</td>
								<td className={style.td}>
									{utils.truncate(task.description)}
								</td>
								<td className={style.td}>{task.date}</td>
								<td className={style.td}>{task.priority}</td>
								<td className={style.td}>{task.status}</td>
								<td className={style.td}>
									<button
										className={style.button}
										onClick={() => openEditForm(task)}
									>
										Editar
									</button>
									<button
										className={style.button}
										onClick={() => handleRemove(task.id)}
									>
										Remover
									</button>
									<Link
										to={`/task/${task.id}`}
										className={style.button}
									>
										Ver página
									</Link>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

