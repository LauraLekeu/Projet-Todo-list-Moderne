import Todo from './Todo';

export default class TodoList {
  constructor (data) {
    this.el    = document.querySelector(data.el);
    this.todos = [];
    this.loadData(data.todos);
    
  }
  loadData(data) {
    for (const item of data) {
      this.todos.push(new Todo(item));
    }
  }
}
