import React, { Component } from "react"
import { createStore, applyMiddleware } from "redux"
import thunk from "redux-thunk";
import { Provider } from "react-redux";

import reducers from '../reducers'
import Tracker from './Tracker';

const store = createStore(reducers, applyMiddleware(thunk));

class Application extends Component {
  constructor(props){
    super(props);
    store.dispatch({
      type: 'INIT_PROJECTS',
      projects: props.projects
    })
    store.dispatch({
      type: 'INIT_USER',
      user: props.user
    })
    store.dispatch({
      type: 'INIT_TASKS',
      tasks: props.tasks
    })
    store.dispatch({
      type: 'INIT_COLUMNS',
      columns: props.columns
    })
  }
  
  render () {
    return (
      <Provider store={store}>
        <Tracker />
      </Provider>
    );
  }
}

const mapStateToProps = store => ({
  projects: store.projects,
})

export default Application
