import Model from './model'

export default class Task extends Model {
  constructor(name, column, project){
    super()
    const { prop } = this
    prop('id', 'rw')
    prop('column', 'rw', { default: column })
    prop('project', 'rw', { default: project })
    prop('name', 'rw', { default: name })
    prop('mark', 'rw', { default: [] })
    prop('description', 'rw')
  }

  static fromJSON(json, column, project){
    const task = new Task('', column, project)
    task.extractData(json)
    return task
  }
}