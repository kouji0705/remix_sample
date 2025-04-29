import { json, type ActionFunctionArgs } from "@remix-run/node";
import { useLoaderData, useNavigation } from "@remix-run/react";
import type { MetaFunction } from "@remix-run/node";
import { getTodos } from "~/services/todoService";
import { TodoForm } from "~/components/todo/TodoForm";
import { TodoList } from "~/components/todo/TodoList";
import {
	handleAddTodo,
	handleToggleTodo,
	handleDeleteTodo,
} from "~/actions/todoActions";

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

	switch (intent) {
		case "add":
			return handleAddTodo(formData);
		case "toggle":
			return handleToggleTodo(formData);
		case "delete":
			return handleDeleteTodo(formData);
		default:
			return json({ error: "Invalid intent" }, { status: 400 });
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
