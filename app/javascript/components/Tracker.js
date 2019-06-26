import React, { Component } from "react"
import NavBar from "./NavBar";
import LeftPanel from "./LeftPanel";
import Board from "./Board";
import Timer from "./Timer";
import Statistics from "./Statistics";
import { BrowserRouter as Router, Route } from "react-router-dom";

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
    const { projectId, tab } = this.state
    return (
      <Router>
        <NavBar tab={tab} />
        <div className="panels">
          <LeftPanel
            boards={[]}
            selectedIndex={projectId}
            setProject={ this.setProject }
          />
          <div id="content" className="content">
            <Route path="/boards" render={ () => (<Board projectId={projectId} />)} />
            <Route path="/statistics" render={ () => (<Statistics projectId={projectId} />)} />
          </div>
        </div>
        <Timer />
      </Router>
    );
  }
}

export default Tracker;
