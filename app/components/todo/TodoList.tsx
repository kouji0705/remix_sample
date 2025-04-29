import type { Todo } from "~/routes/_index";
import { TodoItem } from "./TodoItem";

type Props = {
	todos: Todo[];
};

export function TodoList({ todos }: Props) {
	return (
		<ul className="space-y-2">
			{todos.map((todo) => (
				<TodoItem key={todo.id} todo={todo} />
			))}
		</ul>
	);
}
