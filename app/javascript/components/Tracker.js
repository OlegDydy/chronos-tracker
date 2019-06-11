import React, { Component } from "react"
import NavBar from "./NavBar";
import LeftPanel from "./LeftPanel";
import Board from "./Board";

class Tracker extends Component {
  constructor(props) {
    super(props);
    this.state = { projectId: 0 }
    window.onpopstate = this.handleBack;
  }

  setProject = id => {
    this.setState({ projectId: id });
  }

  render() {
    const user = {id: 1, name: 'First Worker'}
    const { projectId, tab } = this.state
    return (
      <>
        <NavBar user={user} tab={tab} />
        <div className="panels">
          <LeftPanel
            user={user}
            boards={[]}
            selectedIndex={projectId}
            setProject={ this.setProject }
          />
          <div id="content" className="content">
            <Board user={user} projectId={projectId}  />
          </div>
        </div>
      </>
    );
  }
}
 
export default Tracker;
