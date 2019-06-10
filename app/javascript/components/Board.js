import React from "react"
import PropTypes from "prop-types"
import Column from "./Column";
class Board extends React.Component {

  componentDidUpdate(prevProps, prevState) {
    console.log('updated')
  }

  render () {
    const { board, user } = this.props;
    
    if (!board) return null;
    return (
      <>
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
          { board.columns.map( column => (<Column key={column.id} data={column} project={board.id} />)) }
        </div>
      </>
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
