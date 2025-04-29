import type { Todo } from "~/models/todo";

// モックデータ
const mockTodos: Todo[] = [
	{ id: 1, title: "Remixを学ぶ", completed: false },
	{ id: 2, title: "TODOアプリを作る", completed: true },
	{ id: 3, title: "コードを理解する", completed: false },
];

export async function getTodos() {
	// APIレスポンスを模倣
	await new Promise((resolve) => setTimeout(resolve, 500));
	return mockTodos;
}
