import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTodoStore } from '../../store/useTodoList';
import { debounce } from '../../utils/debounce';
import { TableTask } from '../../components/TableTasks';
import { BulletFilter } from '../../components/BulletFilters';
import { Button, Input, Modal, Select } from '../../ui';
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
	priority: z.enum(['Alta', 'Medium', 'Baixa']),
	status: z.enum(['Pendente', 'Concluído', 'À fazer']),
});

type Task = z.infer<typeof taskSchema>;

const STATUS = [
	{ label: 'Todos', value: '' },
	{ label: 'Pendente', value: 'Pendente' },
	{ label: 'À fazer', value: 'À fazer' },
	{ label: 'Concluído', value: 'Concluído' },
];

const PRIORITIES = [
	{ label: 'Todos', value: '' },
	{ label: 'Alta', value: 'Alta' },
	{ label: 'Baixa', value: 'Baixa' },
	{ label: 'Média', value: 'Medium' },
];

const PageToDOList = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [searchTerm, setSearchTerm] = useState('');
	const [statusFilter, setStatusFilter] = useState<
		'Pendente' | 'Concluído' | 'À fazer' | ''
	>('');
	const [priorityFilter, setPriorityFilter] = useState<
		'Alta' | 'Medium' | 'Baixa' | ''
	>('');
	const [dateFilter, setDateFilter] = useState<string | ''>('');
	const [editingTask, setEditingTask] = useState<Task | null>(null);
	const todoStore = useTodoStore();
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<Task>({
		resolver: zodResolver(taskSchema),
	});

	const resetFormAndCloseModal = (state: boolean) => {
		reset({
			title: '',
			description: '',
			date: '',
			priority: 'Alta',
			status: 'Pendente',
		});
		setIsOpen(state);
	};

	const actions = {
		remove: (id: string) => todoStore.removeTask(id),
		add: (data: Omit<Task, 'id'>) => {
			const newTask: Task = { ...data, id: uuidv4() };

			todoStore.addTask(newTask);

			setTimeout(() => {
				resetFormAndCloseModal(false);
			}, 300);
		},
		edit: (task: Task) => {
			setEditingTask(task);
			setIsOpen(true);

			reset(task);
		},
	};

	const handleEditTask = (task: Task) => {
		todoStore.editTask(task);
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

	const handleFormSubmit = (data: Omit<Task, 'id'>) => {
		console.log();
		if (editingTask) {
			handleEditTask({ ...data, id: editingTask.id });
		} else {
			actions.add(data);
		}
	};

	const handleClick = () => {
		setEditingTask(null);
		resetFormAndCloseModal(true);
	};

	const handleClose = () => {
		resetFormAndCloseModal(false);
	};

	const filterTasks = () => {
		return todoStore.todoList.filter((task) => {
			const matchesSearchTerm =
				task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
				task.description.toLowerCase().includes(searchTerm.toLowerCase());

			const matchesStatus = statusFilter ? task.status === statusFilter : true;
			const matchesPriority = priorityFilter
				? task.priority === priorityFilter
				: true;

			const matchesDate = dateFilter ? task.date === dateFilter : true;

			return matchesSearchTerm && matchesStatus && matchesPriority && matchesDate;
		});
	};

	const handleSearchTask = debounce(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			const value = event.target.value;
			setSearchTerm(value);
			console.log('search', value);
		},
		500,
		false
	);

	const handleStatusFilter = (value: string) => {
		console.log('handleStatusFilter');
		setStatusFilter(value as 'Pendente' | 'Concluído' | 'À fazer' | '');
	};

	const handlePriorityFilter = (value: string) => {
		console.log('handlePriorityFilter');
		setPriorityFilter(value as 'Alta' | 'Medium' | 'Baixa' | '');
	};

	return (
		<div className={`page ${style.pageToDoList}`}>
			<div className='container'>
				<h1 className='title'>TODO LIST</h1>
				<div className={style.top}>
					<Modal isOpen={isOpen} onClose={handleClose} onClick={handleClick}>
						<form
							className={style.form}
							onSubmit={handleSubmit(handleFormSubmit)}
							data-testid='form-task'
						>
							<Input
								label='Título'
								placeholder='Digite...'
								type='text'
								register={register('title')}
								data-testid='title'
							>
								{errors.title && <span>{errors.title.message}</span>}
							</Input>

							<Input
								label='Descrição'
								placeholder='Digite...'
								type='text'
								register={register('description')}
								data-testid='description'
							>
								{errors.description && (
									<span>{errors.description.message}</span>
								)}
							</Input>

							<Input
								label='Data'
								placeholder='Digite...'
								type='date'
								register={register('date')}
								data-testid='date'
							>
								{errors.date && <span>{errors.date.message}</span>}
							</Input>

							<Select
								register={register('status')}
								label='Status'
								options={STATUS.filter((item) => item.label !== 'Todos')}
								data-testid='status'
							>
								{errors.status && <span>{errors.status.message}</span>}
							</Select>

							<Select
								register={register('priority')}
								label='Prioridade'
								options={PRIORITIES.filter(
									(item) => item.label !== 'Todos'
								)}
								data-testid='priority'
							>
								{errors.priority && (
									<span>{errors.priority.message}</span>
								)}
							</Select>

							<Button type='submit' data-testid='submit'>
								{editingTask ? 'Salvar Alterações' : 'Adicionar Tarefa'}
							</Button>
						</form>
					</Modal>

					<div className={style.filters}>
						<Input
							label='Pesquisar'
							type='text'
							placeholder='Pesquisar tarefa'
							onChange={handleSearchTask}
							data-testid='search'
						/>

						<BulletFilter.root>
							<BulletFilter.title>Status</BulletFilter.title>
							<BulletFilter.bullets
								bullets={STATUS}
								nameFilter={statusFilter}
								onclick={handleStatusFilter}
							/>
							<BulletFilter.title>Prioridade</BulletFilter.title>
							<BulletFilter.bullets
								bullets={PRIORITIES}
								nameFilter={priorityFilter}
								onclick={handlePriorityFilter}
							/>
						</BulletFilter.root>

						<Input
							label='Data'
							type='date'
							onChange={(e) => setDateFilter(e.target.value)}
							data-testid='filter-date'
						/>
					</div>
				</div>

				<div className={style.tableWrapper}>
					<TableTask
						onEdit={actions.edit}
						onRemove={actions.remove}
						searchTerm={filterTasks()}
					/>
				</div>
			</div>
		</div>
	);
};

export default PageToDOList;

