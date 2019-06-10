import Model from './model'
import Task from './task'

export default class Column extends Model {
  constructor(name, project){
    super()
    this.prop('id','rw');
    this.prop('project','rw', { default: project });
    this.prop('name','rw', { default: name });
    this.prop('tasks', 'rw', { default: [], extractor: this.getTasks })
  }

  getTasks = tasks => {
    this.__data__.tasks = tasks.map( task => new Task.fromJSON(task))
  }

  newTask(name){
    const task = new Task(name, this.id)
    if (this.__emitEvent('tasksChanged', task) !== false){
      this.__data__.tasks.push(task)
      this.__emitEvent('changed', null)
    }
  }

  static fromJSON(json, project){
    const col = new Column('', project)
    col.extractData(json)
    return col
  }
}