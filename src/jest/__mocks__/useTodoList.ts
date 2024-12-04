import { create } from 'zustand';

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

export const useTodoStore = create<TodoStore>()((set) => ({
	todoList: [],
	addTask: (task) =>
		set((state) => ({
			todoList: [...state.todoList, { ...task, id: 'mock-id' }],
		})),
	editTask: (task) =>
		set((state) => ({
			todoList: state.todoList.map((t) =>
				t.id === task.id ? { ...t, ...task } : t
			),
		})),
	removeTask: (id) =>
		set((state) => ({
			todoList: state.todoList.filter((task) => task.id !== id),
		})),
}));

