import { Link } from 'react-router-dom';
import { utils } from '../../utils';
import { Table } from '../../ui';
import style from './style.module.css';
import { Icons } from '../../ui/Icons';

interface Task {
	id: string;
	title: string;
	description: string;
	date: string;
	priority: 'Alta' | 'Medium' | 'Baixa';
	status: 'Pendente' | 'Concluído' | 'À fazer';
}

interface Props {
	searchTerm: Task[];
	onEdit: (task: Task) => void;
	onRemove: (id: string) => void;
}

export const TableTask = ({ searchTerm, onEdit, onRemove }: Props) => {
	console.log('searchTerm', searchTerm);
	return (
		<Table.root>
			<Table.head>
				<Table.row>
					<Table.cell type='th'>Título</Table.cell>
					<Table.cell type='th'>Descrição</Table.cell>
					<Table.cell type='th'>Data</Table.cell>
					<Table.cell type='th'>Prioridade</Table.cell>
					<Table.cell type='th'>Status</Table.cell>
					<Table.cell type='th'>Ações</Table.cell>
				</Table.row>
			</Table.head>
			<Table.body>
				{searchTerm?.map((task) => (
					<Table.row key={task.id}>
						<Table.cell>{utils.truncate(task.title)}</Table.cell>
						<Table.cell>{utils.truncate(task.description)}</Table.cell>
						<Table.cell>{utils.formatDate(task.date)}</Table.cell>
						<Table.cell>{task.priority}</Table.cell>
						<Table.cell>{task.status}</Table.cell>
						<Table.cell>
							<div className={style.actions}>
								<span onClick={() => onEdit(task)}>
									<Icons.edit />
								</span>
								<span onClick={() => onRemove(task.id)}>
									<Icons.remove />
								</span>
								<Link to={`/task/${task.id}`} className={style.button}>
									<Icons.link />
								</Link>
							</div>
						</Table.cell>
					</Table.row>
				))}
			</Table.body>
		</Table.root>
	);
};

