import * as actions from '../constants/actions/project';

const initialState = {}

/*
project = {
  name: '',
  description: '',
  ownerID: 0
  columns: [1,2,3,4]
}
*/

export default function projects(state = initialState, action) {
  
  switch (action.type) {
    case actions.INIT_PROJECTS:
      return action.projects
    case actions.CREATE_PROJECT_SUCCESS:
      return {
        ...state,
        [action.id]: action.data
      }
    case actions.RENAME_PROJECT_SUCCESS:{
      const result = {
        ...state
      }
      result[action.id].name = action.name;
      return result;
    }
    case actions.INSERT_COLUMN_PROJECT: {
      const nextState = { ...state };
      nextState[action.id].columns.splice(action.position, 0, action.columnId)
      return nextState;
    }
    case actions.DELETE_COLUMN_PROJECT: {
      const nextState = { ...state };
      project = nextState[action.id];
      project.columns.splice(project.columns.findIndex(i => i === action.columnId), 1);
      return nextState;
    }
    case actions.FREEZE_PROJECT:{
      const result = {
        ...state
      }
      // result[action.id].freezed = action.freezed;
      return result;
    }
    default:
      return state
  }
}
