import {getForecast} from '../../Api/weatherAPI';
import {
  GET_WEATHER_START,
  GET_WEATHER_SUCCESS,
  GET_WEATHER_FAILED,
  TOGGLE_UNIT,
  LOADER_START,
  LOADER_STOP,
} from '../Types';

export function getWeather(location) {
  return async dispatch => {
    dispatch({type: LOADER_START});
    dispatch({
      type: GET_WEATHER_START,
    });
    await getForecast(location)
      .then(response => {
        if (response?.current) {
          dispatch({
            type: GET_WEATHER_SUCCESS,
            payload: response,
          });
        } else {
          dispatch({
            type: GET_WEATHER_FAILED,
            payload: 'Location not found or failed to fetch weather data',
          });
        }
      })
      .catch(err => {
        dispatch({
          type: GET_WEATHER_FAILED,
          payload: err,
        });
      })
      .finally(() => {
        dispatch({type: LOADER_STOP});
      });
  };
}

export function toggleUnit() {
  return {
    type: TOGGLE_UNIT,
  };
}
