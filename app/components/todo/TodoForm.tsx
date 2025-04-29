import { Form } from "@remix-run/react";

export function TodoForm() {
	return (
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
	);
}
