import {LOADER_START, LOADER_STOP} from '../Types';

const INIT_STATE = {
  loading: false,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case LOADER_START:
      return {loading: true};
    case LOADER_STOP:
      return {
        loading: false,
      };
    default:
      return state;
  }
};
