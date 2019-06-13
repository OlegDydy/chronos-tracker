import React, { Component } from 'react';
import Modal from 'react-modal';
import TaskModal from './modals/task_modal';
import { connect } from 'react-redux';

class Task extends Component {
  state = {modalShown: false}

  showModal = value => {
    this.setState({
      modalShown: value
    });
  }

  render() {
    const { taskId, tasks } = this.props;
    const { modalShown } = this.state;
    const { showModal } = this;
    const task = tasks[taskId];
    return (
      <>
        <div className="board__card" key={ task.id } onClick={() => showModal(true)}>
          <div className="priority-marks"></div>
          {task.name}
        </div>
        <Modal
          isOpen={modalShown} 
          onRequestClose={() => showModal(false)}
          overlayClassName="modal-overlay"
          className="modal"
          shouldCloseOnOverlayClick
          shouldCloseOnEsc
        >
          <TaskModal taskId={taskId} closeModal={() => showModal(false)} />
        </Modal>
      </>
    );
  }
}

const mapStateToProps = store => ({
  tasks: store.tasks
})

export default connect(mapStateToProps)(Task);
