import * as actions from '../constants/actions/column';

const initialState = {}

export default function columns(state = initialState, action) {
  switch (action.type) {
    case actions.INIT_COLUMNS:
      return action.columns;
    case actions.INSERT_TASK_COLUMN:{
      const nextState = { ...state };
      nextState[action.column].tasks.splice(action.position, 0, action.task);
      return nextState;
    }
    default:
      return state;
  }
}
