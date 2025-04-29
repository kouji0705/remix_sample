import { json } from "@remix-run/node";
import { addTodo, toggleTodo, deleteTodo } from "~/services/todoService";

export async function handleAddTodo(formData: FormData) {
	const title = formData.get("title");
	if (typeof title !== "string" || !title) {
		return json({ error: "Title is required" }, { status: 400 });
	}
	await addTodo(title);
	return json({ ok: true });
}

export async function handleToggleTodo(formData: FormData) {
	const id = formData.get("id");
	if (typeof id === "string") {
		await toggleTodo(Number.parseInt(id));
	}
	return json({ ok: true });
}

export async function handleDeleteTodo(formData: FormData) {
	const id = formData.get("id");
	if (typeof id === "string") {
		await deleteTodo(Number.parseInt(id));
	}
	return json({ ok: true });
}
