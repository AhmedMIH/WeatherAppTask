import {HIDE_TOAST, SHOW_TOAST} from '../Types';

export function showToast(message, type) {
  return async dispatch => {
    dispatch({
      type: SHOW_TOAST,
      payload: {message, type},
    });
  };
}
export function hideToast() {
  return async dispatch => {
    dispatch({
      type: HIDE_TOAST,
    });
  };
}
