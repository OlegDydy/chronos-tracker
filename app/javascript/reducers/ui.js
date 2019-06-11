import * as actions from '../constants/actions/ui';

const initialState = {
  taskModal: false
}

export default function ui(state = initialState, action){
  switch (action.type) {
    case actions.TASK_MODAL:
      return {
        ...state,
        taskModal: action.value
      }
    default:
      return state;
  }
}
