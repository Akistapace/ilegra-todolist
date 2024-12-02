import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';

interface Task {
	id: string;
	title: string;
	description: string;
	date: string;
	priority: 'Alta' | 'Medium' | 'Baixa';
	status: 'Pendente' | 'Concluído' | 'À fazer';
}

interface TodoStore {
	todoList: Task[];
	addTask: (task: Omit<Task, 'id'>) => void;
	editTask: (task: Task) => void;
	removeTask: (id: string) => void;
}

export const useTodoStore = create<TodoStore>((set) => ({
	todoList: [],
	addTask: (task) => {
		set((state) => ({
			todoList: [...state.todoList, { ...task, id: uuidv4() }],
		}));
	},
	editTask: (task) => {
		set((state) => ({
			todoList: state.todoList.map((t) => (t.id === task.id ? task : t)),
		}));
	},
	removeTask: (id) => {
		set((state) => ({
			todoList: state.todoList.filter((task) => task.id !== id),
		}));
	},
}));

