import * as actions from '../constants/actions/task';
import { INSERT_TASK_COLUMN } from '../constants/actions/column';
import { TASK_MODAL } from '../constants/actions/ui';
import { request } from '../utils/request';

export function initTasks(tasks){
  return {
    type: actions.INIT_TASKS,
    tasks
  }
}

export function createTask(task){
  return dispatch => {
    dispatch({
      type: actions.CREATE_TASK_REQUEST
    })

    request('POST', '/tasks', task).then(
      res => {
          dispatch({
            type: actions.CREATE_TASK_SUCCESS,
            id: res.data.id,
            task: res.data.task
          });
          dispatch({
            type: INSERT_TASK_COLUMN,
            task: res.data.id,
            column: res.data.task.columnId,
            position: res.data.position
          });
          dispatch({
            type: TASK_MODAL,
            value: false
          })
        },
      err => 
        dispatch({
          type: actions.CREATE_TASK_ERROR,
          message: err
        })
    )
  }
}

export function renameTask(taskID, name) {
  return {
    type: actions.RENAME_TASK,
    name
  }
}

export function freezeTask(taskID) {
  return {
    type: actions.DELETE_TASK
  }
}
