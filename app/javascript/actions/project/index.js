import * as actions from '../../constants/actions'

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
