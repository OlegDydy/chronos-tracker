import React, { Component } from 'react';
import Modal from 'react-modal';
import TaskModal from './modals/task_modal';
import { connect } from 'react-redux';

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
    e.dataTransfer.setData('application/json',`{"type":"task","id":${this.props.taskId}}`);
    e.dataTransfer.effectAllowed = 'move';
    const crt = e.target.cloneNode(true);
    this.crt = crt;
    crt.style.display = 'none';
    document.body.appendChild(crt);
    e.dataTransfer.setDragImage(crt, 0, 0);
  }
  
  dragEnd = e => {
    this.setState({dragged: false});
    document.body.removeChild(this.crt);
  }

  dragMove = e => {
    console.log(e.clientX, e.clientY)
    this.setState({
      X: e.pageX,
      Y: e.pageY
    });
  }

  render() {
    const { taskId, tasks } = this.props;
    const { modalShown, dragged, X, Y } = this.state;
    const { showModal, dragStart, dragMove, dragEnd } = this;
    const task = tasks[taskId];
    let style = dragged ? { position: 'fixed', left: X, top: Y } : null;
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
