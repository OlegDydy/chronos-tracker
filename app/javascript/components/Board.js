import React from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux";
import Column from "./Column";
class Board extends React.Component {

  componentDidUpdate(prevProps, prevState) {
    console.log('updated')
  }

  render () {
    const { projectId, user, projects } = this.props;
    const project = projects[projectId];
    if (!project) return null;
    return (
      <>
        <div className="board__title">
          <span className="board_action">{project.name}</span>
          {
            project.owner == user.id
            ? <span className="board_action">Новая задача</span>
            : null
          }
          {
            project.isCustom
            ? <span className="board_action">Чат с администрацией</span>
            : null
          }
        </div>
        <div className="board__body">
          { project.columns.map( columnId => (<Column key={columnId} columnId={columnId} />)) }
        </div>
      </>
    )
  }
}

const mapStateToProps = store => ({
  projects: store.projects
})

export default connect(mapStateToProps)(Board)
