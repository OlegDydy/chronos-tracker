import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Modal from 'react-modal';
import { request } from '../utils/request'

Modal.setAppElement('#App')

class Form extends Component {
  state = { taskName: 'New Task' }

  handleSubmit = event => {
    event.preventDefault();
    const { column, project } = this.props
    const data = {
      task: {
        project_id: project,
        column_id: column,
        name: this.state.taskName
      }
    }
    request('POST', '/tasks', data).then(
      data => {
        console.log(data)
      },
      err => {
        alert(JSON.stringify(err))
      }
    )
  }

  handleNameChange = event => {
    this.setState({
      taskName: event.target.value
    })
  }

  render() {
    const { taskName } = this.state
    const { handleNameChange, handleSubmit } = this
    return  (
      <form method="POST" remote="true" onSubmit={handleSubmit}>
        <input name="name" placeholder="Task name" value={taskName} onChange={handleNameChange} />
        <input type="submit" value="Create"/>
      </form>
    )
  }
}

class Column extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalShown: false
    }
  }

  renderCards(cards) {
    return cards.map( card => {
      return (
        <div className="board__card" key={ card.id }>
          <div className="priority-marks"></div>
          {card.name}
        </div>
      )
    })
  }

  showModal = () => {
    this.setState({
      modalShown: true
    })
  }

  closeModal = () => {
    this.setState({
      modalShown: false
    })
  }

  render() {
    const { data, project } = this.props;
    const { modalShown } = this.state;
    return (
      <div className="board__column">
        <div className="board__column__title">{ data.name }</div>
        <div className="board__column__list">
          { this.renderCards(data.tasks) }
        </div>
        <div className="board__new-task" onClick={this.showModal}>+ Новая Задача</div>
          <Modal
            isOpen={modalShown} 
            onRequestClose={this.closeModal}
          >
            <Form column={data.id} project={project} />
          </Modal>
      </div>
    );
  }
}
 
export default Column;
