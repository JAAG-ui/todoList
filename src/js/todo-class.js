export class Todo {
  // el método estatico se crea para convertir la lista de objetos devueltos por el JSON en instancias de Todo, caso contrario no se podrían utilizar metodos dentro del Todo
  static fromJson({ tarea, id, completado, creado }) {
    const tempTodo = new Todo(tarea);
    tempTodo.id = id;
    tempTodo.completado = completado;
    tempTodo.creado = creado;
    return tempTodo;
  }

  constructor(tarea) {
    this.tarea = tarea;
    this.id = new Date().getTime(); // Me calcula un tiempo como un conjunto de numeros 12854785
    this.completado = false;
    this.creado = new Date();
  }
}
