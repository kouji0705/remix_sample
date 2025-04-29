import { json, type ActionFunctionArgs } from "@remix-run/node";
import { useLoaderData, useNavigation, Form } from "@remix-run/react";
import type { MetaFunction } from "@remix-run/node";
import {
	getTodos,
	addTodo,
	toggleTodo,
	deleteTodo,
} from "~/services/todoService";

export const meta: MetaFunction = () => {
	return [
		{ title: "TODO App" },
		{ name: "description", content: "Simple TODO App with Remix" },
	];
};

// action関数（フォーム送信時に実行）
export async function action({ request }: ActionFunctionArgs) {
	const formData = await request.formData();
	const intent = formData.get("intent");

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
			const toggleId = formData.get("id");
			if (typeof toggleId === "string") {
				await toggleTodo(Number.parseInt(toggleId));
			}
			break;
		}
		case "delete": {
			const deleteId = formData.get("id");
			if (typeof deleteId === "string") {
				await deleteTodo(Number.parseInt(deleteId));
			}
			break;
		}
	}

	return json({ ok: true });
}

// loader（サーバーサイド）
export async function loader() {
	const todos = await getTodos();
	return json({ todos });
}

// コンポーネント（クライアントサイド）
export default function Index() {
	const { todos } = useLoaderData<typeof loader>();
	const navigation = useNavigation();
	const isLoading = navigation.state === "loading";

	return (
		<div className="max-w-2xl mx-auto p-4">
			<h1 className="text-2xl font-bold mb-4">TODO App</h1>

			{/* ローディング表示 */}
			{isLoading ? (
				<div className="text-center text-gray-500 my-4">Loading...</div>
			) : (
				<>
					{/* TODO追加フォーム */}
					<Form method="post" className="mb-4">
						<div className="flex gap-2">
							<input
								type="text"
								name="title"
								placeholder="新しいTODOを入力"
								className="flex-1 p-2 border rounded"
							/>
							<button
								type="submit"
								name="intent"
								value="add"
								className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
							>
								追加
							</button>
						</div>
					</Form>

					{/* TODOリスト */}
					<ul className="space-y-2">
						{todos.map((todo) => (
							<li
								key={todo.id}
								className="flex items-center justify-between p-3 bg-white border rounded shadow-sm"
							>
								<div className="flex items-center gap-2">
									<Form method="post">
										<input type="hidden" name="id" value={todo.id} />
										<button
											type="submit"
											name="intent"
											value="toggle"
											className="flex items-center gap-2"
										>
											<input
												type="checkbox"
												checked={todo.completed}
												className="h-4 w-4"
												readOnly
											/>
											<span
												className={
													todo.completed ? "line-through text-gray-500" : ""
												}
											>
												{todo.title}
											</span>
										</button>
									</Form>
								</div>
								<Form method="post">
									<input type="hidden" name="id" value={todo.id} />
									<button
										type="submit"
										name="intent"
										value="delete"
										className="text-red-500 hover:text-red-700"
									>
										削除
									</button>
								</Form>
							</li>
						))}
					</ul>
				</>
			)}
		</div>
	);
}
