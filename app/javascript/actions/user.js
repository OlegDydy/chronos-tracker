import * as actions from "../constants/actions/user";
import { request, METHOD } from "../utils/request";

export function stopTrack(trackId){
  return dispatch => {
    dispatch({
      type: actions.STOP_TRACK_REQUEST
    });

    request(METHOD.DELETE, `/tracks/${trackId}`).then(
      res => {
        dispatch({
          type: actions.STOP_TRACK_SUCCESS
        });
      },
      err => {
        dispatch({
          type: actions.STOP_TRACK_ERROR,
          message: err
        });
        alert(JSON.stringify(err));
      }
    )
  }
}

export function startTrack(taskId){
  return dispatch => {
    dispatch({
      type: actions.START_TRACK_REQUEST
    });

    request(METHOD.POST, `/tracks`, { track: { task_id: taskId } }).then(
      res => {
        dispatch({
          type: actions.START_TRACK_SUCCESS,
          track: res.track
        });
      },
      err => {
        dispatch({
          type: actions.START_TRACK_ERROR,
          message: err
        });
        alert(JSON.stringify(err));
      }
    )
  }
}
