import React from "react";
import { connect } from "react-redux";
import ContentEditable from "react-contenteditable";
import Column from "./Column";
import { createColumn } from "../actions/column";
import Cross from "./icons/times";

class Board extends React.Component {
  state = {
    newColumnName: '',
    editing: false
  }

  componentDidMount(){
    document.addEventListener('keydown', this.handleEscape);
  }

  componentWillUnmount(){
    document.removeEventListener('keydown', this.handleEscape);
  }

  handleEscape = e =>{
    if (e.key === 'Escape')
      this.showEditing(false);
  }

  componentDidUpdate(){
    if (this.state.editing)
      this.refs.entry.focus();
  }

  handleChange = e => {
    this.setState({
      newColumnName: e.target.value
    })
  }

  showEditing = (value) => {
    if (value){
      this.setState({
        editing: true
      })
    }
    else {
      this.setState({
        editing: false,
        newColumnName: ''
      })
    }
  }

  render () {
    const { projectId, user, projects, createColumn } = this.props;
    const { newColumnName, editing } = this.state;
    const { handleChange, showEditing } = this;

    const project = projects[projectId];
    if (!project) return null;
    return (
      <>
        <div className="board__title">
          <span className="board_action">{project.name}</span>
          {/*
            project.owner == user.id
            ? <span className="board_action">New Task</span>
            : null
          */}
          {
            project.isCustom
            ? <span className="board_action">Chat</span>
            : null
          }
        </div>
        <div className="board__body">
          { project.columns.map( columnId => (<Column key={columnId} columnId={columnId} />)) }
          <div
            className={'column column_new' + (editing ? ' editing' : '')}
            onClick={editing ? null : () => showEditing(true)}
          >
            {
              editing
                ? (
                  <>
                    <input
                      className="column__new-entry"
                      value={newColumnName}
                      ref="entry"
                      placeholder="Название Колонки"
                      onChange={handleChange}
                    />
                    <button className="secondary" onClick={() => createColumn(projectId, newColumnName, () => showEditing(false))}>Добавить</button>
                    <Cross className="column__close" onClick={() => showEditing(false)} />
                  </>
                ) //on blur
                : (<span className="column__new-label">+ Новая Колонка</span>)
            }
          </div>
        </div>
      </>
    )
  }
}

const mapStateToProps = store => ({
  projects: store.projects,
  user: store.user
});

const mapDispatchToProps = dispatch => {
  return {
    createColumn: (project, name, resetFocus) => dispatch(createColumn(project, name, resetFocus))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Board)
