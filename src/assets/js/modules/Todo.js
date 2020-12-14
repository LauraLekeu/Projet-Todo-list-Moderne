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

  _destroy () {
    this.el.remove();
    this.parent.removeOneById(this.id);
  }

  _edit () {
    this.el.querySelector('.editable').innerHTML = `<input type="text" class="validate" value="${this.content}"/>
                                                    `;
    this._activerBtns();
  }

  _validate () {
    this.content = this.el.querySelector('.validate').value;
    this.el.querySelector('.editable').innerHTML = this.content;
    this._activerBtns();
  }

/**
 * Activation des élément s interactifs du todo
 * @return {[type]} [description]
 */
  _activerBtns () {
    // Activation des .toggle
    this.el.querySelector('.toggle').onclick = () => {
      this._toggleCompleted();
    }
    // Activation des .toggle
    this.el.querySelector('.destroy').onclick = () => {
      this._destroy();
    }
    // Activation des .editable
    this.el.querySelector('.editable').ondblclick = () => {
      this._edit();
    }
    // Activation des .validate
    if(this.el.querySelector('.validate')) {
      this.el.querySelector('.validate').onkeyup = (e) => {
        if(e.keyCode === 13) {
          this._validate();
        }
      }
    }

  }

}
