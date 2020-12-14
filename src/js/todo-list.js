import { Todo } from "./todo-class.js";
import { todoList } from "../index";

export class TodoList {
  constructor() {
    this.cargarLS();
  }
  nuevoTodo(todo) {
    this.todos.push(todo);
    this.guardarLS();
  }
  eliminarTodo(id) {
    this.todos = this.todos.filter((todo) => todo.id != id); // filtra el id del todo a eliminar y regresa un nuevo arreglo que reemplaza el todos original
    this.guardarLS();
  }
  marcarTodo(id) {
    for (const todo of this.todos) {
      if (todo.id == id) {
        todo.completado = !todo.completado;
        this.guardarLS();
        break;
      }
    }
  }
  eliminarTodos() {
    this.todos = this.todos.filter((todo) => !todo.completado);
    this.guardarLS();
  }
  guardarLS() {
    localStorage.setItem("todo", JSON.stringify(this.todos));
  }
  cargarLS() {
    this.todos = localStorage.getItem("todo") ? JSON.parse(localStorage.getItem("todo")) : [];
    this.todos = this.todos.map((obj) => Todo.fromJson(obj));
  }
}

const ulHtml = document.querySelector(".todo-list");
const inputHtml = document.querySelector(".new-todo");
const btnEliminarTodos = document.querySelector(".clear-completed");
const ulFiltros = document.querySelector(".filters");
const filtrosSelect = document.querySelectorAll(".filtro");

inputHtml.addEventListener("keyup", (event) => {
  if (event.keyCode === 13 && inputHtml.value.length > 0) {
    const nuevoTodo = new Todo(inputHtml.value);
    crearTodoHtml(nuevoTodo);
    todoList.nuevoTodo(nuevoTodo);
    inputHtml.value = "";
  }
});

ulHtml.addEventListener("click", (event) => {
  const elemento = event.target.localName;
  const liSelect = event.target.parentElement.parentElement;
  const IdTodo = liSelect.getAttribute("data-id");
  if (elemento.includes("input")) {
    todoList.marcarTodo(IdTodo);
    liSelect.classList.toggle("completed");
  } else if (elemento.includes("button")) {
    todoList.eliminarTodo(IdTodo);
    ulHtml.removeChild(liSelect);
  }
});

btnEliminarTodos.addEventListener("click", (event) => {
  todoList.eliminarTodos();
  for (let i = ulHtml.children.length - 1; i >= 0; i--) {
    const completado = ulHtml.children[i];
    if (completado.classList.contains("completed")) {
      ulHtml.removeChild(completado);
    }
  }
});

ulFiltros.addEventListener("click", (event) => {
  const filtro = event.target.text;
  if (!filtro) {
    return;
  }
  filtrosSelect.forEach((elem) => elem.classList.remove("selected"));
  event.target.classList.add("selected");
  for (const elemento of ulHtml.children) {
    elemento.classList.remove("hidden");
    const completado = elemento.classList.contains("completed");
    switch (filtro) {
      case "Pendientes":
        if (completado) {
          elemento.classList.add("hidden");
        }
        break;
      case "Completados":
        if (!completado) {
          elemento.classList.add("hidden");
        }
        break;
    }
  }
});

export const crearTodoHtml = (todo) => {
  const htmlTodo = `
    <li class="${todo.completado ? "completed" : ""}" data-id="${todo.id}">
			<div class="view">
				<input class="toggle" type="checkbox" ${todo.completado ? "checked" : ""}>
				<label>${todo.tarea}</label>
				<button class="destroy"></button>
			</div>
			<input class="edit" value="Create a TodoMVC template">
		</li>
  `;
  const div = document.createElement("div");
  div.innerHTML = htmlTodo;
  ulHtml.append(div.firstElementChild);
  //return div;
};
