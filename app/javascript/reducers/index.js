import { combineReducers } from 'redux';
import columns from './columns';
import projects from './projects';
import tasks from './tasks';
import user from './user';
import ui from './ui';

export default combineReducers({
  columns,
  projects,
  tasks,
  user,
  ui
})
