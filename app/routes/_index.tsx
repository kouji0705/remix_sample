import { json, type ActionFunctionArgs } from "@remix-run/node";
import { useLoaderData, useNavigation } from "@remix-run/react";
import type { MetaFunction } from "@remix-run/node";
import { addTodo, deleteTodo, getTodos, toggleTodo } from "~/services/todoService";
import { TodoForm } from "~/components/todo/TodoForm";
import { TodoList } from "~/components/todo/TodoList";
import type { Todo as PrismaTodo } from "@prisma/client";

export type Todo = Omit<PrismaTodo, "createdAt" | "updatedAt"> & {
	createdAt: string;
	updatedAt: string;
};

export const meta: MetaFunction = () => {
	return [
		{ title: "TODO App" },
		{ name: "description", content: "Simple TODO App with Remix" },
	];
};

// データを取得（サーバーサイド）
export async function loader() {
	const todos = await getTodos();
	return json({ todos });
}

// データを更新（サーバーサイド）
export async function action({ request }: ActionFunctionArgs) {
	const formData = await request.formData();
	const intent = formData.get("intent");

	try {
		switch (intent) {
			case "add": {
				const title = formData.get("title");
				if (typeof title !== "string" || !title) {
					return json({ error: "Title is required" }, { status: 400 });
				}
				await addTodo(title);
				break;
			}
			case "toggle": {
				const id = formData.get("id");
				if (typeof id === "string") {
					await toggleTodo(Number.parseInt(id));
				}
				break;
			}
			case "delete": {
				const id = formData.get("id");
				if (typeof id === "string") {
					await deleteTodo(Number.parseInt(id));
				}
				break;
			}
			default: {
				return json({ error: "Invalid intent" }, { status: 400 });
			}
		}
		return json({ ok: true });
	} catch (error) {
		console.error("Database error:", error);
		return json({ error: "データベースエラーが発生しました" }, { status: 500 });
	}
}

export default function Index() {
	const { todos } = useLoaderData<typeof loader>();
	const navigation = useNavigation();
	const isLoading = navigation.state === "loading";

	return (
		<div className="max-w-2xl mx-auto p-4">
			<h1 className="text-2xl font-bold mb-4">TODO App</h1>

			{isLoading ? (
				<div className="text-center text-gray-500 my-4">Loading...</div>
			) : (
				<>
					<TodoForm />
					<TodoList todos={todos} />
				</>
			)}
		</div>
	);
}
