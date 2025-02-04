import {
  GET_WEATHER_START,
  GET_WEATHER_SUCCESS,
  GET_WEATHER_FAILED,
  TOGGLE_UNIT
} from '../Types';

const INIT_STATE = {
  error: null,
  weathers: null,
  unit:'c',
};

export default ( state = INIT_STATE, action ) => {
  switch ( action.type ) {
    case GET_WEATHER_START:
      return { ...state, error: null };
    case GET_WEATHER_SUCCESS:
      return {
        error: null,
        weathers: action.payload,
        unit: state.unit,
      };
    case GET_WEATHER_FAILED:
      return { ...state,  error: action.payload };
    case TOGGLE_UNIT:
      return { ...state, unit: state.unit === 'c' ? 'f' : 'c' };
    default:
      return state;
  }
};