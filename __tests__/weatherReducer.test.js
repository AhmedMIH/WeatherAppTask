import weatherReducer from '../src/Redux/Reducers/weatherReducer';
import {
  GET_WEATHER_START,
  GET_WEATHER_SUCCESS,
  GET_WEATHER_FAILED,
  TOGGLE_UNIT,
} from '../src/Redux/Types';

describe('Weather Reducer', () => {
  const initialState = {
    error: null,
    weathers: null,
    unit: 'c',
  };

  it('should return the initial state', () => {
    expect(weatherReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle GET_WEATHER_START', () => {
    const action = {type: GET_WEATHER_START};
    const newState = weatherReducer(initialState, action);
    expect(newState.error).toBeNull();
  });

  it('should handle GET_WEATHER_SUCCESS', () => {
    const weatherData = {temperature: 25, condition: 'Clear'};
    const action = {type: GET_WEATHER_SUCCESS, payload: weatherData};
    const newState = weatherReducer(initialState, action);
    expect(newState.weathers).toEqual(weatherData);
    expect(newState.error).toBeNull();
  });

  it('should handle GET_WEATHER_FAILED', () => {
    const action = {type: GET_WEATHER_FAILED, payload: 'Error fetching data'};
    const newState = weatherReducer(initialState, action);
    expect(newState.error).toBe('Error fetching data');
  });

  it('should toggle unit when TOGGLE_UNIT is dispatched', () => {
    const action = {type: TOGGLE_UNIT};
    const newState = weatherReducer(initialState, action);
    expect(newState.unit).toBe('f');
    const toggledBack = weatherReducer(newState, action);
    expect(toggledBack.unit).toBe('c');
  });
});
