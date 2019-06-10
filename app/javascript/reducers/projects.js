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
