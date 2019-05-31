import React from "react"
import PropTypes from "prop-types"

import NavBar from "./NavBar";
import LeftPanel from "./LeftPanel";
import Board from "./Board";

function getRouteId(route){
  const match = route.match(/(\/[^\/]*)(?:\/(\d+))?/)
  const data = match[2] ? +match[2] : null
  switch(match[1]){
    case '/boards': return {id: 0, data}
    case '/statistics': return {id: 1, data}
    case '/vacations': return {id: 2, data}
  }
}

class Application extends React.Component {
  constructor(props){
    super(props);
    const route = getRouteId(location.pathname)
    this.state = {
      tab: route.id,
      board: props.boardId || route.data || 0
    }

    window.onpopstate = this.handleBack;
    window.onstate
  }

  handleBack = e => {
    const route = getRouteId(location.pathname);
    this.setState({
      tab: route.id,
      board: route.data || 0
    })
  }

  setBoard = (board) => {
    this.setState({ board });
    history.pushState(null, '', `/boards/${board}`);
  }
  
  render () {
    const { boards, user } = this.props;

    const board = boards.find( board => board.id === this.state.board);
    return (
      <React.Fragment>
        <NavBar user={user} tab={this.state.tab} />
        <div className="panels">
          <LeftPanel
            user={user}
            boards={boards}
            selectedIndex={ this.state.board }
            setBoard={ this.setBoard }
          />
          <div id="content" className="content">
            <Board user={user} board={board} />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Application
