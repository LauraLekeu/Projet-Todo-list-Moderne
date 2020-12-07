import Todo from './Todo';
import template from './templates/todoList';

export default class TodoList {
  constructor (data) {
    this.el = document.querySelector(data.el);
    this.listEl;
    this.notCompletedNumber;
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

  /**
   * [render description]
   * @return {[type]} [description]
   */
  render () {
    this.el.innerHTML = this.template; // A partir de mtn : le DOM existe pour le navigateur
    this.listEl = this.el.querySelector('.todo-list');
    for (const todo of this.todos) { // Rendu des todos
      this.listEl.innerHTML += todo.render(); // += : this.listEl.innerHTML = this.listEl.innerHTML.todo.render();
    }
    // Calcul du nombre de todos restantes
    this.setNotCompletedNumber();
    // Activation des éléments interactif
    this._activerBtns();

  }

  setNotCompletedNumber () {
    this.notCompletedNumber = this.todos.filter(function(todo){ // filtrer les élément qui sont false
      return todo.completed === false;
    }).length;
    this.el.querySelector('#todo-count').innerText = this.notCompletedNumber;
  }

/**
 * Ajout d'un todo
 */
  _addTodo () {
    const content = this.el.querySelector('.new-todo').value;
    const id = this.todos[this.todos.length -1].id + 1;
    const newTodo = new Todo({id , content , completed: false});
    this.todos.push(newTodo);
    this.listEl.innerHTML += newTodo.render();
    this.el.querySelector('.new-todo').value = '';
    // Re c alcul du nombre de todos restantes
    this.setNotCompletedNumber();
  }

  /**
   * Activation des éléments interactifs de la todoList
   * @return {[type]} [description]
   */
   _activerBtns () {
    // Activation de l'input newTodo
    this.el.querySelector('.new-todo').onkeyup = (e) => {
      if(e.keyCode === 13) {
        this._addTodo();
      }
    }
  }
}
