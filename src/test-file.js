// todo-app.js

class TodoApp {
  constructor() {
    this.tasks = [];
    this.currentId = 1;
  }

  addTask(description) {
    const newTask = {
      id: this.currentId++,
      description: description,
      completed: false,
    };
    this.tasks.push(newTask);
    return newTask;
  }

  removeTask(id) {
    const index = this.tasks.findIndex((task) => task.id === id);
    if (index !== -1) {
      return this.tasks.splice(index, 1)[0];
    } else {
      throw new Error("Task not found");
    }
  }

  updateTask(id, newDescription) {
    const task = this.tasks.find((task) => task.id === id);
    if (task) {
      task.description = newDescription;
      return task;
    } else {
      throw new Error("Task not found");
    }
  }

  markTaskCompleted(id) {
    const task = this.tasks.find((task) => task.id === id);
    if (task) {
      task.completed = true;
      return task;
    } else {
      throw new Error("Task not found");
    }
  }

  getTasks(filter = "all") {
    if (filter === "all") {
      return this.tasks;
    } else if (filter === "completed") {
      return this.tasks.filter((task) => task.completed);
    } else if (filter === "pending") {
      return this.tasks.filter((task) => !task.completed);
    } else {
      throw new Error("Invalid filter");
    }
  }
}

// Example usage
const todoApp = new TodoApp();
todoApp.addTask("Buy groceries");
todoApp.addTask("Walk the dog");
console.log(todoApp.getTasks()); // Get all tasks
todoApp.markTaskCompleted(1);
console.log(todoApp.getTasks("completed")); // Get completed tasks
todoApp.updateTask(2, "Walk the dog in the park");
console.log(todoApp.getTasks("pending")); // Get pending tasks
todoApp.removeTask(1);
console.log(todoApp.getTasks()); // Get all tasks

module.exports = TodoApp;
