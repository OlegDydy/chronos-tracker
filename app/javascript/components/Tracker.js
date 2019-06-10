import React, { Component } from 'react';
import NavBar from "./NavBar";
import LeftPanel from "./LeftPanel";
import Board from "./Board";

class Tracker extends Component {
  render() {
    const { boards, user } = this.props;
    const board = boards.find( board => board.id === this.state.board);
    return (
      <>
        <NavBar user={user} tab={this.state.tab} />
        <div className="panels">
          <LeftPanel
            user={user}
            boards={boards}
            selectedIndex={ this.state.board }
            setBoard={ this.setBoard }
          />
          <div id="content" className="content">
            <Board user={user} board={board}  />
          </div>
        </div>
      </>
    );
  }
}
 
export default Tracker;