import * as actions from '../constants/actions/column';

const initialState = {}

export default function columns(state = initialState, action) {
  switch (action.type) {
    case actions.INIT_COLUMNS:
      return action.columns;
    case actions.CREATE_COLUMN_SUCCESS: {
      return { ...state, [action.id]: action.column }
    }
    case actions.COLUMN_INSERT_TASK: {
      const nextState = { ...state };
      nextState[action.column].tasks.splice(action.position, 0, action.task);
      return nextState;
    }
    case actions.COLUMN_REMOVE_TASK: {
      const nextState = { ...state };
      const tasks = nextState[action.column].tasks;
      tasks.splice(tasks.findIndex( id => id === action.taskId), 1);
      return nextState;
    }
    case actions.DELETE_COLUMN_SUCCESS: {
      const nextState = { ...state };
      delete nextState[action.id];
      return nextState;
    }
    default:
      return state;
  }
}
