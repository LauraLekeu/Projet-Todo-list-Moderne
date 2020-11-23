import todos from './data';
import TodoList from './modules/TodoList';

// Initialiser une application
new TodoList({
  el: '#app',
  todos
});
