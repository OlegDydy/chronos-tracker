import React, { Component } from 'react'
import Modal from 'react-modal';
import { connect } from 'react-redux';
import { showTaskModal } from '../actions/ui';
import Task from './Task';
import TaskModal from './modals/task_modal';

Modal.setAppElement('#App')

class Column extends Component {
  render() {
    const { columns, columnId, showModal, modalShown } = this.props;
    const column = columns[columnId];
    if (!column) return null;
    return (
      <div className="board__column">
        <div className="board__column__title">{ column.name }</div>
        <div className="board__column__list">
          { column.tasks.map( taskId => <Task key={taskId} taskId={taskId} />) }
        </div>
        <div className="board__new-task" onClick={() => showModal(true)}>+ Новая Задача</div>
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
    showModal: task => dispatch(showTaskModal(task))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Column);
