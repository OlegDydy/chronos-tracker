import * as actions from '../constants/actions/user';

const initialState = null

export default function user(state = initialState, action) {
  switch (action.type) {
    case actions.INIT_USER:
      return action.user;
    case actions.STOP_TRACK_SUCCESS:{
      const nextState = { ...state };
      nextState.track = null;
      return nextState;
    }
    case actions.START_TRACK_SUCCESS:{
      const nextState = { ...state };
      nextState.track = action.track;
      return nextState;
    }
    default:
      return state;
  }
}
