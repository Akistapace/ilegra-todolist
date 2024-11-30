import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '../../ui/Button';
import { Input } from '../../ui/Input';
import z from 'zod';
import style from './style.module.css';

const taskSchema = z.object({
	title: z.string().min(1, 'Título é obrigatório'),
	description: z.string().min(1, 'É necessário definir uma descrição'),
	date: z.string().min(1, 'É necessário definir a data '),
	priority: z.string().min(1, 'É necessário definir a prioridade'),
	status: z.string().min(1, 'É necessário definir um status'),
});

type formData = z.infer<typeof taskSchema>;

function ToDOList() {
	const [openCreate, setOpenCreate] = useState(false);
	// const [task, setTask] = useState('');
	const [todoList, setTodoList] = useState<formData[]>([]);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<formData>({
		resolver: zodResolver(taskSchema),
	});

	const handleCreateTask = (data: formData) => {
		console.log('data', data);
		setTodoList((state) => [...state, data]);
	};

	const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault(); // Impede o comportamento padrão
		handleSubmit(handleCreateTask)();
	};
	const handleClick = () => {
		setOpenCreate((state) => !state);
	};

	// console.log('todoList', todoList);

	return (
		<div className={`container ${style.pageRegister}`}>
			TODO LIST
			<Button type='button' onClick={handleClick}>
				Criar Tarefa
			</Button>
			{openCreate && (
				<div>
					<form onSubmit={handleFormSubmit}>
						<Input
							placeholder='Título'
							type='text'
							register={register('title')}
						>
							{errors.title && <span>{errors.title.message}</span>}
						</Input>
						<Input
							placeholder='Descrição'
							type='text'
							register={register('description')}
						>
							{errors.description && (
								<span>{errors.description.message}</span>
							)}
						</Input>
						<Input
							placeholder='Data de Nascimento'
							type='text'
							register={register('date')}
						></Input>
						<Input
							placeholder='Prioridade'
							type='text'
							register={register('priority')}
						>
							{errors.priority && <span>{errors.priority.message}</span>}
						</Input>
						<Input
							placeholder='Status'
							type='text'
							register={register('status')}
						>
							{errors.status && <span>{errors.status.message}</span>}
						</Input>
						<Button type='submit'>Add Task</Button>
					</form>
				</div>
			)}
			<div className='list'>
				<ul>
					{todoList.map((item, index) => (
						<li key={index}>
							<strong>{item.title}</strong> - {item.description} -{' '}
							{item.date} - {item.priority} - {item.status}
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}

export default ToDOList;

