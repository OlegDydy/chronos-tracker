import React, { Component } from 'react'
import Modal from 'react-modal';
import Trash from "./icons/trash";
import { connect } from 'react-redux';
import { showTaskModal } from '../actions/ui';
import { deleteColumn } from "../actions/column";
import { updateTask } from "../actions/task";
import Task from './Task';
import TaskModal from './modals/task_modal';

Modal.setAppElement('#App')

class Column extends Component {
  state = {
    insertPlace: null
  }

  dragOver = e => {
    if(e.dataTransfer.types[0] === 'application/json'){
      const {columns, columnId} = this.props;
      const { list } = this.refs;
      e.preventDefault();
      
      let i = 0;
      for (; i < list.children.length; i++) {
        const rect = list.children[i].getBoundingClientRect();
        if (e.clientY < rect.y) break;
      }
      if (i > columns[columnId].length) i = columns[columnId].length1;
      this.setState({
        insertPlace: i
      })

      //console.log( x, y );
    }
  }

  dragLeave = e => {
    this.setState({
      insertPlace: null
    })
  }

  handleDrop = e => {
    const {columnId, columns, updateTask} = this.props;
    const descTask = JSON.parse(e.dataTransfer.getData('application/json'));
    const column = columns[descTask.columnId];
    const task = {
      id: descTask.id,
      position: this.state.insertPlace,
      column_id: columnId
    }
    updateTask(task, column.tasks.findIndex(i => i === descTask.id), descTask.columnId);
    this.setState({
      insertPlace: null
    })
    //action
  }

  renderList(column) {
    return column.tasks.map(taskId => (<Task key={taskId} taskId={taskId} />));
  }

  render() {
    const { columns, columnId, showModal, modalShown, deleteColumn } = this.props;
    const { insertPlace } = this.state;
    const { dragOver, handleDrop, dragLeave, renderList } = this;
    const column = columns[columnId];
    if (!column) return null;

    const list = renderList(column);
    if (insertPlace !== null)
      list.splice(insertPlace, 0, (
        <div key="__ghost__" className="board__card board__card_ghost" />
      ));

    return (
      <div ref="root" className="column" onDragOver={dragOver} onDragLeave={dragLeave} onDrop={handleDrop}>
        <div className="column__title">
          { column.name }
          <Trash className="column__delete" onClick={() => deleteColumn(columnId, column)} />
        </div>
        <div ref="list" className="column__list">
          { list }
        </div>
        <div className="column__new-task" onClick={() => showModal(true)}>+ New Task</div>
        <Modal
          isOpen={modalShown} 
          onRequestClose={() => showModal(false)}
          overlayClassName="modal-overlay"
          className="modal"
          shouldCloseOnOverlayClick
          shouldCloseOnEsc
        >
          <TaskModal column={columnId} project={column.projectId} closeModal={() => showModal(false)} />
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = store => ({
  columns: store.columns,
  modalShown: store.ui.taskModal
})

const mapDispatchToProps = dispatch => {
  return {
    showModal: task => dispatch(showTaskModal(task)),
    deleteColumn: (columnId, column) => dispatch(deleteColumn(columnId, column)),
    updateTask: (task, position, column) => dispatch(updateTask(task, position, column))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Column);
