import * as actions from '../constants/actions/task';
import { COLUMN_INSERT_TASK, COLUMN_REMOVE_TASK } from '../constants/actions/column';
import { TASK_MODAL } from '../constants/actions/ui';
import { request, METHOD } from '../utils/request';

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

    request(METHOD.POST, '/tasks', task).then(
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

export function archiveTask(columnId, taskId, closeModal) {
  return dispatch => {
    dispatch({
      type: actions.ARCHIVE_TASK_REQUEST
    })

    request(METHOD.POST, `/tasks/${taskId}/archive`, {}).then(
      () => {
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

export function updateTask(task, position, columnId) {
  return dispatch => {
    dispatch({
      type: actions.UPDATE_TASK_REQUEST
    });
    const id = task.id;
    delete task.id;
    request(METHOD.PATCH, `/tasks/${id}`, task).then(
      res => {
        if (res.data.position != position || res.data.columnId != columnId){
          dispatch({
            typs: COLUMN_REMOVE_TASK,
            taskId: res.id,
            column: columnId
          });
          dispatch({
            typs: COLUMN_INSERT_TASK,
            task: res.id,
            column: res.task.columnId,
            position: res.position
          })
        }
        dispatch({
          type: actions.UPDATE_TASK_SUCCESS,
          id: res.data.id,
          position: res.data.position,
          task: res.data.task
        })
      },
      err => 
        dispatch({
          type: actions.UPDATE_TASK_ERROR,
          message: err
        })
    )
  }
}
