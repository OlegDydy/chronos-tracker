import * as actions from '../constants/actions/project'
import { request, METHOD } from "../utils/request";

export function loadStatistics(projectId){
  return dispatch => {
    dispatch({
      type: actions.LOAD_STATISTICS_REQUEST
    });

    request(METHOD.GET, `/project/${projectId}/statistics`).then(
      res => {
        dispatch({
          type: actions.LOAD_STATISTICS_STATS,
          statistics: res.statistics
        });
      },
      err => {
        dispatch({
          type: actions.LOAD_STATISTICS_ERROR,
          message: JSON.stringify(err)
        });
      }
    )
  }
}

export function initProjects(projects){
  return {
    type: actions.INIT_PROJECTS,
    projects
  }
}

export function createProject(name){
  return {
    type: actions.CREATE_PROJECT,
    name
  }
}

export function renameProject(projectID, name) {
  return {
    type: actions.RENAME_PROJECT,
    name
  }
}

export function freezeProject(projectID) {
  return {
    type: actions.FREEZE_PROJECT
  }
}
