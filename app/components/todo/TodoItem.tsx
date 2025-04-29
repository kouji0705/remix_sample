import { Form } from "@remix-run/react";
import type { Todo } from "~/routes/_index";

type Props = {
	todo: Todo;
};

export function TodoItem({ todo }: Props) {
	return (
		<li className="flex items-center justify-between p-3 bg-white border rounded shadow-sm">
			<Form method="post" className="flex items-center gap-2">
				<input type="hidden" name="id" value={todo.id} />
				<input type="hidden" name="intent" value="toggle" />
				<input
					type="checkbox"
					checked={todo.completed}
					onChange={(e) => e.currentTarget.form?.submit()}
					className="h-4 w-4"
				/>
				<span className={todo.completed ? "line-through text-gray-500" : ""}>
					{todo.title}
				</span>
			</Form>

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
	);
}
