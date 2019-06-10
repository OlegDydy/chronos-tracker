import React from "react"
import { combineReducers, createStore, applyMiddleware } from "redux"
import thunk from "redux-thunk";
import { Provider } from "react-redux";

import * as reducers from '../reducers'
import Tracker from './Tracker'

function getRouteId(route){
  const match = route.match(/(\/[^\/]*)(?:\/(\d+))?/)
  const data = match[2] ? +match[2] : null
  switch(match[1]){
    case '/boards': return {id: 0, data}
    case '/statistics': return {id: 1, data}
    case '/vacations': return {id: 2, data}
  }
}

const reducer = combineReducers(reducers);
const store = createStore(reducers, applyMiddleware(thunk));

class Application extends React.Component {
  constructor(props){
    super(props);
    const route = getRouteId(location.pathname)
    this.state = {
      tab: route.id,
      board: props.boardId || route.data || 0
    }

    window.onpopstate = this.handleBack;
  }

  handleBack = e => {
    const route = getRouteId(location.pathname);
    this.setState({
      tab: route.id,
      board: route.data || 0
    })
  }

  setBoard = board => {
    this.setState({ board });
    history.pushState(null, '', `/boards/${board}`);
  }
  
  render () {
    return (
      <Provider store={store}>
        {() => <Tracker />}
      </Provider>
    );
  }
}

export default Application
