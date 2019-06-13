import * as actions from '../constants/actions/task';

const initialState = {}

export default function tasks(state = initialState, action) {
  switch (action.type) {
    case actions.INIT_TASKS:
      return action.tasks;
    case actions.CREATE_TASK_SUCCESS:
      return {
        ...state,
        [action.id]: action.task
      }
    case actions.ARCHIVE_TASK_SUCCESS:{
      const nextState = {
        ...state,
        [action.id]: action.task
      }
      delete nextState[action.id]
      return nextState;
    }
    case actions.ARCHIVE_TASK_ERROR:
    case actions.CREATE_TASK_ERROR:
      alert(action.message)
      return state;
    default:
      return state;
  }
}
