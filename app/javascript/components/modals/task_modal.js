import React, { Component } from 'react';
import ContentEditable from 'react-contenteditable';
import Archive from '../icons/archive';
import { connect } from 'react-redux';
import { createTask, archiveTask, updateTask } from '../../actions/task';
import { stopTrack, startTrack } from "../../actions/user";

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

function markdown(str){
  const ul_li = /(?:^|\n|>)\* (.*)/g;
  const ol_li = /(?:^|\n|>)\d+\.? (.*)/g;

  const bold = /\*(.*?)\*/g;
  const italic = /_(.*?)_/g;
  const ul = new RegExp(`(:?${ul_li.source})+\n?`,'g');
  const ol = new RegExp(`(:?${ol_li.source})+\n?`,'g');
  const inlineSource = new RegExp(`\`((?:\\\`|[^\\0])*?)\``,'g');
  const source = new RegExp(`((?:^|\\n)\x20{4}.*)+`,'g');
  const header = /(?:^|\n|>)(#+) (.*)/g;
  const header1 = /(.*)\n={3,}(?:\n|$|(?=<))/g;
  const header2 = /(.*)\n-{3,}(?:\n|$|(?=<))/g;
  const quote = /&lt; (.*)/g;
  const link = /\[(.*?)\]\(([^\s]+?)(?: +"(.*?)")?\)/g;
  const autodetect = /((\w+:\/\/)[-\w:@;?&=\/%\+\.\*!'\(\),\$_\{\}\^~\[\]`#|]+)/g;

  const result = str
    .replace(header, (_, level, text) => (_[0] === '>' ? '>' : '') + `<h${level.length} class="header-${level.length}">${text}</h${level.length}>`)
    .replace(header1, '<h1 class="header-1">$1</h1>')
    .replace(header2, '<h2 class="header-2">$1</h2>')
    .replace(bold, '<strong class="bold">$1</strong>')
    .replace(italic, '<i class="italic">$1</i>')
    .replace(ul, match => {
      let close = match[0] === '>' ? '>' : '';
      return close + '<ul class="marked-list marked-list--style-1">' + match.replace(ul_li, '<li>$1</li>') + "</ul>"
    })
    .replace(ol, match => {
      let close = match[0] === '>' ? '>' : '';
      return close + '<ol class="marked-list marked-list--style-1">' + match.replace(ol_li, '<li>$1</li>') + "</ol>"
    })
    .replace(inlineSource, (_, source) => `<span class="source-code source-code--inline">${source.replace(/\\`/g, '`')}</span>`)
    .replace(source, match => `<pre class="source-code">${match.replace(/(?:\n|^)\x20{4}/g, '\n').substr(1)}</pre>`)
    .replace(quote, '<h1>$1</h1>')
    .replace(link, (_, text, url, title)=> {
      if (typeof title == 'string')
        return `<a class="link link--with-title" href="${encodeURI(url.trim())}" title="${title.replace(/"/g, '&quot;')}">${text}</a>`
      return `<a class="link" href="${encodeURI(url.trim())}">${text}</a>`
    })
    .replace(autodetect, '<a class="link" href"$&">$&</a>')
    .replace(/\n/g, '<br>');
  return result;
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
    const { updateTask } = this.props;
    
    if (!this.state.isNew){
      switch (this.state.edit) {
      case 'title':
        updateTask({
          id: this.state.task,
          name: this.state.name
        });
        break;
      case 'description':
        updateTask({
          id: this.state.task,
          description: this.state.description
        });
        break;
      }
    }
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
    const { columns, user, projects, closeModal, taskId, startTrack, stopTrack } = this.props;
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
    const clearDescription = markdown(clearHTML(description));
    const disabled = name.length == 0;

    let timerButton = null;
    if (!isNew){
      if (user.track &&  user.track.taskId === taskId){
        timerButton = (
          <button className="card-modal__tool long" onClick={() => stopTrack(user.track.id)} >
            <i className="fas fa-pause" /> Завершить Учет
          </button>
        );
      }
      else {
        timerButton = (
          <button className="card-modal__tool long" onClick={() => startTrack(taskId)}>
            <i className="fas fa-play" /> Начать Учет
          </button>
        )
      }
    }

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
          <p className="tiny">Колонка: <u>{columns[column].name}</u></p>
        </div>
        <div className="card-modal__left">
          <h2>Отметки:</h2>
          <div className="card-modal__markers" >
            <div className="priority-desc priority0">
              <i className="fas fa-plus" />
            </div>
          </div>
          <h2>Описание:&nbsp;
            <button className="card-modal__tool" onClick={editDescription}>
              Править
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
          {isNew ? (<button onClick={handleSubmit} className="card-modal__tool">Создать</button>) : showComments()}
        </div>
        <div className="card-modal__right">
          <h2>Инструменты:</h2>
          {
            isNew ? null
            : (<button className="card-modal__tool long" onClick={archive}><Archive /> Архивировать</button>)
          }
          {
            user.id === projects[project].owner ? (
              <>
                <button className="card-modal__tool long"><i className="far fa-clock" /> Крайний срок</button>
                <button className="card-modal__tool long"><i className="fas fa-plus" /> Разделить</button>
              </>
            )
            : null
          }
          { user.type === 'Worker' ? timerButton : null }
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
    archive: (columnId, taskId, callback) => dispatch(archiveTask(columnId, taskId, callback)),
    updateTask: task => dispatch(updateTask(task)),
    stopTrack: trackId => dispatch(stopTrack(trackId)),
    startTrack: taskId => dispatch(startTrack(taskId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskModal)
