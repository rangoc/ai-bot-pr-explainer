class TodoList {
  constructor() {
    this.todos = [];
  }

  addTodo(title) {
    if (!title) {
      throw new Error("Title is required");
    }
    const newTodo = {
      id: Date.now().toString(),
      title: title,
      completed: false,
    };
    this.todos.push(newTodo);
    return newTodo;
  }

  removeTodo(id) {
    const index = this.todos.findIndex((todo) => todo.id === id);
    if (index === -1) {
      throw new Error("Todo not found");
    }
    const removedTodo = this.todos.splice(index, 1);
    return removedTodo[0];
  }

  editTodo(id, newTitle) {
    if (!newTitle) {
      throw new Error("New title is required");
    }
    const todo = this.todos.find((todo) => todo.id === id);
    if (!todo) {
      throw new Error("Todo not found");
    }
    todo.title = newTitle;
    return todo;
  }

  toggleTodo(id) {
    const todo = this.todos.find((todo) => todo.id === id);
    if (!todo) {
      throw new Error("Todo not found");
    }
    todo.completed = !todo.completed;
    return todo;
  }

  getTodos() {
    return this.todos;
  }

  getTodoById(id) {
    const todo = this.todos.find((todo) => todo.id === id);
    if (!todo) {
      throw new Error("Todo not found");
    }
    return todo;
  }

  getCompletedTodos() {
    return this.todos.filter((todo) => todo.completed);
  }

  getIncompleteTodos() {
    return this.todos.filter((todo) => !todo.completed);
  }
}

// Usage example
const todoList = new TodoList();
try {
  const todo1 = todoList.addTodo("Learn JavaScript");
  const todo2 = todoList.addTodo("Learn React");
  console.log("Todos after adding:", todoList.getTodos());

  todoList.toggleTodo(todo1.id);
  console.log("Todos after toggling completion:", todoList.getTodos());

  todoList.editTodo(todo2.id, "Learn React and Redux");
  console.log("Todos after editing:", todoList.getTodos());

  todoList.removeTodo(todo1.id);
  console.log("Todos after removing:", todoList.getTodos());

  console.log("Completed Todos:", todoList.getCompletedTodos());
  console.log("Incomplete Todos:", todoList.getIncompleteTodos());
} catch (error) {
  console.error(error.message);
}
