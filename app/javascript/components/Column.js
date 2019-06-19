import React, { Component } from 'react'
import Modal from 'react-modal';
import Trash from "./icons/trash";
import { connect } from 'react-redux';
import { showTaskModal } from '../actions/ui';
import { deleteColumn } from "../actions/column";
import Task from './Task';
import TaskModal from './modals/task_modal';

Modal.setAppElement('#App')

class Column extends Component {
  render() {
    const { columns, columnId, showModal, modalShown, deleteColumn } = this.props;
    const column = columns[columnId];
    if (!column) return null;
    return (
      <div className="column">
        <div className="column__title">
          { column.name }
          <Trash className="column__delete" onClick={() => deleteColumn(columnId, column)} />
        </div>
        <div className="column__list">
          { column.tasks.map( taskId => <Task key={taskId} taskId={taskId} />) }
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
    deleteColumn: (columnId, column) => dispatch(deleteColumn(columnId, column))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Column);
