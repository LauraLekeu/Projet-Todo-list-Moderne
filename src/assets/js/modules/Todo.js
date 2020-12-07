import template from './templates/todo';

export default class Todo {
  constructor (data) {
    this.parent = data.parent;
    this.el;
    this.id = data.todo.id;
    this.content = data.todo.content;
    this.completed = data.todo.completed;
    this.template = this._replaceAllParams(template);
  }

  _replaceAllParams(data) { // Retirer les espace autour des {{}} dans le template
    return data.replace(/\{\{\s*(\w+)\s*\}\}/g, '{{$1}}')
  }

  _replaceInTemplate() {
    // Remplacement dans le template
    for (const prop in this) {
      this.template = this.template.replaceAll('{{' +  prop + '}}', this[prop]);
    }
    this.template = this.template.replaceAll('{{completedClass}}', (this.completed) ? 'completed' :  '' );
    this.template = this.template.replaceAll('{{completedCheked}}', (this.completed) ? 'checked="checked"' :  '' );
  }

  render () {
    this._replaceInTemplate();
    this.el = document.createElement('div');
    // Retourner le template <li>
    this.el.innerHTML = this.template;
    // Activation des éléments interactifs de la todo
    this._activerBtns();
    return this.el;
  }

  _toggleCompleted () {
    this.completed = ! this.completed;
    this.el.querySelector('li').classList.toggle('completed');
    // Lancer le parent setNotCompleted
    this.parent.setNotCompletedNumber();
  }

/**
 * Activation des éléments interactifs du todo
 * @return {[type]} [description]
 */
  _activerBtns () {
    // Activation des .toggle
    this.el.querySelector('.toggle').onclick = () => {
      this._toggleCompleted();
    }

  }

}
