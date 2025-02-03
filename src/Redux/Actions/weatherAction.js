import apiClient from '../../Api/client';
import {
  GET_WEATHER_START,
  GET_WEATHER_SUCCESS,
  GET_WEATHER_FAILED,
} from '../Types';

export function getWeather(location) {
  return async dispatch => {
    dispatch({
      type: GET_WEATHER_START,
    });
    console.log(location);
    apiClient
      .get(
        `forecast.json?key=49987b5083ec41b098f173318250102&aqi=no&q=${location}&days=5&alerts=no`,
      )
      .then(response => {
        if (response.status === 200) {
          dispatch({
            type: GET_WEATHER_SUCCESS,
            payload: response.data,
          });
        } else {
          dispatch({
            type: GET_WEATHER_FAILED,
            payload: response.data,
          });
        }
      })
      .catch(err => {
        dispatch({
          type: GET_WEATHER_FAILED,
          payload: err,
        });
      });
  };
}

export function toggleUnit() {
  return {
    type: 'TOGGLE_UNIT',
  };
}
