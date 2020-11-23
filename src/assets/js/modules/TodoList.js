import Todo from './Todo';
import template from './templates/todoList';

export default class TodoList {
  constructor (data) {
    this.el    = document.querySelector(data.el);
    this.todos = [];
    this.loadData(data.todos);
    this.template = template;
    this.render();
  }
  loadData(data) {
    for (const item of data) {
      this.todos.push(new Todo(item));
    }
  }
  render () {
    this.el.innerHTML = this.template;
  }
}
