import * as actions from '../constants/actions/task';
import { COLUMN_INSERT_TASK, COLUMN_REMOVE_TASK } from '../constants/actions/column';
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
            type: COLUMN_INSERT_TASK,
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
    type: actions.RENAME_TASK_SUCCESS,
    task_id: taskID,
    name
  }
}

export function archiveTask(columnId, taskId, closeModal) {
  return dispatch => {
    dispatch({
      type: actions.ARCHIVE_TASK_REQUEST
    })

    request('POST', `/tasks/${taskId}/archive`, {}).then(
      res => {
          dispatch({
            type: COLUMN_REMOVE_TASK,
            taskId: taskId,
            column: columnId
          });
          dispatch({
            type: actions.ARCHIVE_TASK_SUCCESS,
            id: taskId
          });
          closeModal();
        },
      err => 
        dispatch({
          type: actions.ARCHIVE_TASK_ERROR,
          message: err
        })
    )
  }
}
