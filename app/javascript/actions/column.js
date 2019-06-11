import * as actions from '../constants/actions/column'

export function initColumns(columns){
  return {
    type: actions.INIT_COLUMNS,
    columns
  }
}
