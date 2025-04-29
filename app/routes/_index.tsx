import { json } from "@remix-run/node";
import { useLoaderData, useNavigation } from "@remix-run/react";
import type { MetaFunction } from "@remix-run/node";

// 型定義
type Todo = {
	id: number;
	title: string;
	completed: boolean;
};

// loaderでモックAPIレスポンスを返す（サーバーサイドで実行）
export async function loader() {
	// APIレスポンスを模倣
	await new Promise((resolve) => setTimeout(resolve, 500)); // 擬似的な遅延

	// モックデータ（APIレスポンスの模倣）
	const mockTodos: Todo[] = [
		{ id: 1, title: "Remixを学ぶ", completed: false },
		{ id: 2, title: "TODOアプリを作る", completed: true },
		{ id: 3, title: "コードを理解する", completed: false },
	];

	return json({ todos: mockTodos });
}

export const meta: MetaFunction = () => {
	return [
		{ title: "New Remix App" },
		{ name: "description", content: "Welcome to Remix!" },
	];
};

// コンポーネント（クライアントサイドで実行）
export default function Index() {
	// loaderのデータを取得
	const { todos } = useLoaderData<typeof loader>();
	// ローディング状態の取得
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
					<div className="mb-4">
						<input
							type="text"
							placeholder="新しいTODOを入力"
							className="w-full p-2 border rounded"
						/>
					</div>

					{/* TODOリスト */}
					<ul className="space-y-2">
						{todos.map((todo) => (
							<li
								key={todo.id}
								className="flex items-center justify-between p-3 bg-white border rounded shadow-sm"
							>
								<div className="flex items-center gap-2">
									<input
										type="checkbox"
										checked={todo.completed}
										onChange={() => {}} // 後で実装
										className="h-4 w-4"
									/>
									<span
										className={
											todo.completed ? "line-through text-gray-500" : ""
										}
									>
										{todo.title}
									</span>
								</div>
								<button
									type="button"
									className="text-red-500 hover:text-red-700"
								>
									削除
								</button>
							</li>
						))}
					</ul>
				</>
			)}
		</div>
	);
}
