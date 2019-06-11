//import * as actions from '../constants/actions/project';

const initialState = null

export default function user(state = initialState, action) {
  switch (action.type) {
    case 'INIT_USER':
      return action.user;
    default:
      return state;
  }
}
