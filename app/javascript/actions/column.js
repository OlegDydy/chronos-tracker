import * as actions from '../constants/actions/column';
import { INSERT_COLUMN_PROJECT, DELETE_COLUMN_PROJECT } from "../constants/actions/project";
import { request, METHOD } from '../utils/request';

export function initColumns(columns){
  return {
    type: actions.INIT_COLUMNS,
    columns
  }
}

export function createColumn(project_id, name, resetFocus) {
  return dispatch => {
    dispatch({
      type: actions.CREATE_COLUMN_REQUEST
    })

    request(METHOD.POST, '/columns', {
      name, project_id
    }).then(
      res => {
        dispatch({
          type: actions.CREATE_COLUMN_SUCCESS,
          id: res.data.id,
          column: res.data.column
        });
        dispatch({
          type: INSERT_COLUMN_PROJECT,
          id: project_id,
          position: res.data.position,
          columnId: res.data.id
        });
        resetFocus();
      },
      err => {
        dispatch({
          type: actions.CREATE_COLUMN_ERROR,
          message: err
        })
      }
    )
  }
}

export function deleteColumn(columnId, column) {
  return dispatch => {
    dispatch({
      type: actions.DELETE_COLUMN_REQUEST
    })

    request(METHOD.DELETE, `/columns/${columnId}`).then(
      () => {
        dispatch({
          type: DELETE_COLUMN_PROJECT,
          id: column.projectId,
          columnId: columnId
        });
        dispatch({
          type: actions.DELETE_COLUMN_SUCCESS,
          id: columnId,
        });
      },
      err => {
        dispatch({
          type: actions.DELETE_COLUMN_ERROR,
          message: err
        })
      }
    )
  }
}
