import React from "react"
import PropTypes from "prop-types"
class Board extends React.Component {
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

  renderColumns(columns){
    return columns.map( column => {
      return (
        <div className="board__column" key={ column.id }>
          <div className="board__column__title">{ column.name }</div>
          <div className="board__column__list">
            { this.renderCards(column.tasks) }
          </div>
          <div className="board__new-task">+ Новая Задача</div>
        </div>
      )
    })
  }

  render () {
    const { board, user } = this.props;
    
    if (!board) return null;
    return (
      <React.Fragment>
        <div className="board__title">
          <span className="board_action">{board.name}</span>
          {
            board.owner.id == user.id
            ? <span className="board_action">Новая задача</span>
            : null
          }
          {
            board.is_custom
            ? <span className="board_action">Чат с администрацией</span>
            : null
          }
        </div>
        <div className="board__body">
          { this.renderColumns(board.columns) }
        </div>
      </React.Fragment>
    )
  }
}

Board.propTypes = {
  board: PropTypes.shape({
    name: PropTypes.string,
    columns: PropTypes.arrayOf(PropTypes.shape(
      {
        name: PropTypes.string
      }
    ))
  })
};
export default Board
