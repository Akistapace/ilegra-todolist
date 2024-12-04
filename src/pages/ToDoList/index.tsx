import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTodoStore } from '../../store/useTodoList';
import { debounce } from '../../utils/debounce';
import { TableTask } from '../../components/TableTasks';
import { Button, Input, InputFile, Modal, Select } from '../../ui';
import { v4 as uuidv4 } from 'uuid';
import z from 'zod';
import style from './style.module.css';
import { Icons } from '../../ui/Icons';

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
	attachment: z
		.array(z.instanceof(File)) // Aceita um array de arquivos
		.nullable()
		.optional()
		.refine(
			(files) => !files || files.every((file) => file.type.startsWith('image/')),
			'Todos os arquivos devem ser imagens'
		)
		.refine(
			(files) => !files || files.every((file) => file.size <= 5 * 1024 * 1024),
			'Cada arquivo deve ter no máximo 5MB'
		),
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
	const [searchTerm, setSearchTerm] = useState('');
	const [statusFilter, setStatusFilter] = useState<string | ''>('');
	const [priorityFilter, setPriorityFilter] = useState<string | ''>('');
	const [dateFilter, setDateFilter] = useState<string | ''>('');
	const [editingTask, setEditingTask] = useState<Task | null>(null);
	const { todoList, addTask, editTask, removeTask } = useTodoStore();
	const {
		register,
		handleSubmit,
		reset,
		setValue,
		formState: { errors },
	} = useForm<Task>({
		resolver: zodResolver(taskSchema),
	});

	const actions = {
		remove: (id: string) => removeTask(id),
		add: (data: Omit<Task, 'id'>) => {
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
		},
		edit: (task: Task) => {
			setEditingTask(task);
			setIsOpen(true);
			reset(task);
		},
	};

	const handleEditTask = (task: Task) => {
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

	const handleFormSubmit = (data: Omit<Task, 'id'>) => {
		if (editingTask) {
			handleEditTask({ ...data, id: editingTask.id });
		} else {
			actions.add(data);
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

	const filterTasks = () => {
		return todoList.filter((task) => {
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
		},
		500,
		false
	);

	return (
		<div className={`page ${style.pageToDoList}`}>
			<div className='container'>
				<h1 className='title'>TODO LIST</h1>
				<div className={style.top}>
					<Button type='button' variant='small' onClick={handleClick}>
						<Icons.add />
						Criar Tarefa
					</Button>
					<div className='search'>
						<Input
							type='text'
							placeholder='Pesquisar tarefa'
							onChange={handleSearchTask}
						/>
					</div>
					<div className={style.filters}>
						<Select
							label='Status'
							options={STATUS}
							onChange={(e) => setStatusFilter(e.target.value)}
						/>
						<Select
							label='Prioridade'
							options={PRIORITIES}
							onChange={(e) => setPriorityFilter(e.target.value)}
						/>
						<Input
							label='Data'
							type='date'
							onChange={(e) => setDateFilter(e.target.value)}
						/>
					</div>
				</div>

				<Modal isOpen={isOpen} onClose={handleClose}>
					<form
						className={style.form}
						onSubmit={handleSubmit(handleFormSubmit)}
					>
						<Input
							label='Título'
							placeholder='Digite...'
							type='text'
							register={register('title')}
						>
							{errors.title && <span>{errors.title.message}</span>}
						</Input>

						<Input
							label='Descrição'
							placeholder='Digite...'
							type='text'
							register={register('description')}
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
						>
							{errors.date && <span>{errors.date.message}</span>}
						</Input>

						<Select
							register={register('status')}
							label='Status'
							options={STATUS}
						>
							{errors.status && <span>{errors.status.message}</span>}
						</Select>

						<Select
							register={register('priority')}
							label='Prioridade'
							options={PRIORITIES}
						>
							{errors.priority && <span>{errors.priority.message}</span>}
						</Select>

						<InputFile setValue={setValue} register={register('attachment')}>
							{errors.attachment && (
								<span>{errors.attachment.message}</span>
							)}
						</InputFile>

						<Button type='submit'>
							{editingTask ? 'Salvar Alterações' : 'Adicionar Tarefa'}
						</Button>
					</form>
				</Modal>

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

