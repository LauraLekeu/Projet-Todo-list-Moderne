import template from './templates/todo';

export default class Todo {
  constructor (todo) {
    this.id = todo.id;
    this.content = todo.content;
    this.completed = todo.completed;
    this.template = this.replaceAllParams(template);
  }
  replaceAllParams(data) { // Retirer les espace autour des {{}} dans le template
    return data.replace(/\{\{\s*(\w+)\s*\}\}/g, '{{$1}}')
  }
  render () {
    // Remplacement dans le template
    for (const prop in this) {
      this.template = this.template.replace('{{' +  prop.trim() + '}}', this[prop.trim()]);
    }
    this.template = this.template.replaceAll('{{completedClass}}', (this.completed) ? 'completed' :  '' );
    this.template = this.template.replaceAll('{{completedCheked}}', (this.completed) ? 'checked="checked"' :  '' );
    // Retourner le template <li>
    return this.template;
  }
}
