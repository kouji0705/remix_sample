import type { Todo } from "~/models/todo";

// モックデータをメモリ上で管理
let mockTodos: Todo[] = [
	{ id: 1, title: "Remixを学ぶ", completed: false },
	{ id: 2, title: "TODOアプリを作る", completed: true },
	{ id: 3, title: "コードを理解する", completed: false },
];

export async function getTodos() {
	// APIレスポンスを模倣
	await new Promise((resolve) => setTimeout(resolve, 500));
	return mockTodos;
}

export async function addTodo(title: string) {
	const newTodo: Todo = {
		id: mockTodos.length + 1,
		title,
		completed: false,
	};
	mockTodos = [...mockTodos, newTodo];
	return newTodo;
}

export async function toggleTodo(id: number) {
	mockTodos = mockTodos.map((todo) =>
		todo.id === id ? { ...todo, completed: !todo.completed } : todo,
	);
	return mockTodos.find((todo) => todo.id === id);
}

export async function deleteTodo(id: number) {
	mockTodos = mockTodos.filter((todo) => todo.id !== id);
}
