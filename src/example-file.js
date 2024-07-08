class Todo {
  constructor() {
    this.tasks = [];
  }

  addTask(task) {
    this.tasks.push({ task: task, completed: false });
  }

  completeTask(index) {
    if (index >= 0 && index < this.tasks.length) {
      this.tasks[index].completed = true;
    } else {
      console.log("Invalid task index");
    }
  }

  viewTasks() {
    return this.tasks;
  }
}

// Example usage:
const myTodo = new Todo();
myTodo.addTask("Buy groceries");
myTodo.addTask("Walk the dog");

console.log(myTodo.viewTasks());
// Output: [ { task: 'Buy groceries', completed: false }, { task: 'Walk the dog', completed: false } ]

myTodo.completeTask(0);

console.log(myTodo.viewTasks());
// Output: [ { task: 'Buy groceries', completed: true }, { task: 'Walk the dog', completed: false } ]
