import React, { Component } from 'react';
import Modal from 'react-modal';
import TaskModal from './modals/task_modal';
import { connect } from 'react-redux';
import mouse from '../utils/mouse';


class Task extends Component {
  state = {
    modalShown: false,
    dragged: false,
    X: 0,
    Y: 0
  }

  showModal = value => {
    this.setState({
      modalShown: value
    });
  }

  dragStart = e => {
    const { taskId, tasks, hideSelf } = this.props;
    hideSelf();
    const task = tasks[taskId];
    e.dataTransfer.setData('application/json',`{"type":"task","id":${taskId},"columnId":${task.columnId}}`);
    e.dataTransfer.effectAllowed = 'move';
  }
  
  dragEnd = e => {
    
  }

  dragMove = e => {
    
  }

  render() {
    const { taskId, tasks, style } = this.props;
    const { modalShown } = this.state;
    const { showModal, dragStart, dragMove, dragEnd } = this;
    const task = tasks[taskId];
    return (
      <>
        <div
          className="board__card"
          style={style}
          key={ task.id }
          onClick={() => showModal(true)}
          draggable
          onDragStart={dragStart}
          onDragEnd={dragEnd}
          onDrag={dragMove}
        >
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
