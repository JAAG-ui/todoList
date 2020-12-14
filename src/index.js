import "./styles.css";
import { Todo, TodoList, crearTodoHtml } from "./js/index.js";

export const todoList = new TodoList();

todoList.todos.forEach((todo) => crearTodoHtml(todo));
