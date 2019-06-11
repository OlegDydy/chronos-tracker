import * as actions from '../constants/actions/ui';

export function showTaskModal(value){
  return {
    type: actions.TASK_MODAL,
    value
  }
}
