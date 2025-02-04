import {SHOW_TOAST, HIDE_TOAST} from '../Types';

const INIT_STATE = {
  visible: false,
  message: '',
  type: 'info', // 'info' | 'success' | 'error' | 'warning'
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case SHOW_TOAST:
      return {
        visible: true,
        message: action.payload.message,
        type: action.payload.type,
      };
    case HIDE_TOAST:
      return {
        visible: false,
        message: '',
        type: 'info',
      };
    default:
      return state;
  }
};
