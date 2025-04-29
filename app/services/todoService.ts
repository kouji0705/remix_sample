import { db } from "~/lib/db.server";

export async function getTodos() {
	return db.todo.findMany({
		orderBy: { createdAt: "desc" },
	});
}

export async function addTodo(title: string) {
	return db.todo.create({
		data: {
			title,
			completed: false,
		},
	});
}

export async function toggleTodo(id: number) {
	const todo = await db.todo.findUnique({ where: { id } });
	if (!todo) return null;

	return db.todo.update({
		where: { id },
		data: { completed: !todo.completed },
	});
}

export async function deleteTodo(id: number) {
	return db.todo.delete({
		where: { id },
	});
}
