import {LOADER_START, LOADER_STOP} from '../Types';

export function loaderStart() {
  return async dispatch => {
    dispatch({
      type: LOADER_START,
    });
  };
}
export function loaderStop() {
  return async dispatch => {
    dispatch({
      type: LOADER_STOP,
    });
  };
}
