import React, { Component } from 'react';
import ContentEditable from 'react-contenteditable';
import Archive from '../icons/archive';
import { connect } from 'react-redux';
import { createTask, archiveTask } from '../../actions/task';

const ruleText = `
.comment__text-edit.placeholder::before {
  position: absolute;
  content: 'Write comment…';
  color: darkgray;
  cursor: text;
}
`;
const id = document.styleSheets[0].insertRule(ruleText);
//const rule = document.styleSheets[0].cssRules[id];

function clearHTML(str){
  return str.replace(/<br>/g,'\n').replace(/<\/?\w+.*?>/g, '').trim();
}

class TaskModal extends Component {
  constructor(props) {
    super(props)
    const isNew = !('taskId' in props) || props.taskId === 0
    if (isNew){
      this.state = {
        name: '',
        description: '',
        marks: [],
        edit: 'title',
        comment: '<br>',
        isNew: true,
        task: 0,
        column: props.column || 0,
        project: props.project || 0,
      }
    }
    else {
      const task = props.tasks[props.taskId];
      this.state = {
        name: task.name,
        description: task.description,
        marks: task.marks,
        edit: null,
        comment: '<br>',
        isNew: false,
        task: props.taskId,
        column: task.columnId,
        project: task.projectId,
      }
    }
    this.description = React.createRef();
  }

  componentDidUpdate(){
    const e = this.refs[this.state.edit] || this[this.state.edit] && this[this.state.edit].current
    if (e){
      e.focus();
    }
  }

  componentDidMount(){
    const e = this.refs[this.state.edit] || this[this.state.edit] && this[this.state.edit].current
    if (e){
      e.focus();
    }
  }

  handleSubmit = event => {
    event.preventDefault();
    const { column, project } = this.props;
    const { name, description, marks } = this.state;
    const task = {
      project_id: project,
      column_id: column,
      mark: marks,
      name,
      description: clearHTML(description)
    }
    this.props.createTask(task);
  }

  handleNameChange = event => {
    this.setState({
      name: event.target.value
    })
  }

  handleDescriptionChange = event => {
    this.setState({
      description: event.target.value
    })
  }

  editTitle = () => {
    this.setState({
      edit: 'title'
    })
  }

  editDescription = () => {
    this.setState({
      edit: 'description'
    })
  }

  editComment = event => {
    this.setState({
      comment: event.target.value
    })
  }

  handleBlur = () => {
    this.setState({
      edit: null
    })
  }

  showComments = () => {
    let className = "comment__text-edit";
    if (! clearHTML(this.state.comment).length)
      className += ' placeholder';
    return (
      <>
        <h2>Write comment:</h2>
        <ContentEditable
          className={className}
          tagName="pre"
          html={this.state.comment}
          onChange={this.editComment}
        />
        <button>Add</button>
        <h2>Comments:</h2>
        <div className="card-modal__comments"></div>
      </>
    )
  }

  archive = () => {
    const { taskId, archive, closeModal } = this.props;
    archive(this.state.column, taskId, closeModal);
  }
  
  render() {
    const { columns, user, projects, closeModal } = this.props;
    const { name, description, edit, isNew, column, project } = this.state;
    const {
      handleNameChange,
      handleSubmit,
      handleDescriptionChange,
      handleBlur,
      editDescription,
      editTitle,
      showComments,
      archive
    } = this
    const clearDescription = clearHTML(description).replace(/\n/g,'<br>');
    const disabled = name.length == 0;
    return  (
      <div className="card-modal">
        <div className="card-modal__caption">
          <i className="close fas fa-times" onClick={closeModal} />
          {
            edit === 'title'
            ? (
              <input 
                name="name"
                ref="title"
                placeholder="New Task Name"
                value={name}
                onBlur={handleBlur}
                onChange={handleNameChange}
              />
            )
            : <h1 onClick={editTitle}>{name || 'Enter Task Name'}</h1>
          }
          <p className="tiny">Column: <u>{columns[column].name}</u></p>
        </div>
        <div className="card-modal__left">
          <h2>Marks:</h2>
          <div className="card-modal__markers" >
            <div className="priority-desc priority0">
              <i className="fas fa-plus" />
            </div>
          </div>
          <h2>Description:&nbsp;
            <button className="card-modal__tool" onClick={editDescription}>
              Edit
            </button>
          </h2>
          {
            edit === 'description'
            ? (
              <ContentEditable
                className="card-modal__description_edit"
                innerRef={this.description}
                html={description}
                onChange={handleDescriptionChange}
                onBlur={handleBlur}
                tagName="pre"
              />
            )
            : <div
              className={clearDescription ? null : 'card-modal__description_empty'}
              onClick={editDescription}
              dangerouslySetInnerHTML={{ __html: clearDescription ? clearDescription : 'Add description' }} />
          }
          {isNew ? (<button onClick={handleSubmit} className="card-modal__tool">Create</button>) : showComments()}
        </div>
        <div className="card-modal__right">
          <h2>Tools:</h2>
          {
            isNew ? null
            : (<button className="card-modal__tool long" onClick={archive}><Archive /> Archive</button>)
          }
          {
            user.id === projects[project].owner ? (
              <>
                <button className="card-modal__tool long"><i className="far fa-clock" /> Deadline</button>
                <button className="card-modal__tool long"><i className="fas fa-plus" /> Split</button>
              </>
            )
            : null
          }
          {
            user.type === 'worker' ? (
              <button className="card-modal__tool long" disabled={disabled}>
                <i className="fas fa-play" /> Stopwatch
              </button>
            )
            : null
          }
        </div>
      </div>
    )
  }
}

const mapStateToProps = store => ({
  columns: store.columns,
  tasks: store.tasks,
  projects: store.projects,
  user: store.user
})

const mapDispatchToProps = dispatch => {
  return {
    createTask: task => dispatch(createTask(task)),
    archive: (columnId, taskId, callback) => dispatch(archiveTask(columnId, taskId, callback))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskModal)