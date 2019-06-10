import Model from './model'
import Column from './column'

export default class Project extends Model {
  constructor(){
    super()
    const { prop } = this
    prop('id', 'rw');
    prop('name', 'rw', { default: 'New Project' });
    prop('columns', 'rw', { default: [], extractor: this.convertColumns });
    prop('description', 'rw');
  }

  convertColumns = columns => {
    this.__data__.columns = columns.map(col => Column.fromJSON(col))
  }

  static fromJSON(json){
    const proj = new Project()
    proj.extractData(json, this.id)
    return proj
  }

  addColumn(name) {
    const col = new Column(name, this.id);
    if (this.__emitEvent('columnsChanged', col) !== false){
      this.__data__.columns.push(col)
      this.__emitEvent('changed', null)
    }
  }
}
