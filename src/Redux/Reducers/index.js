import {combineReducers} from 'redux';
import weatherReducer from './weatherReducer';
import loaderReducer from './loaderReducer';
import toastReducer from './toastReducer';

export default combineReducers({
  weather: weatherReducer,
  loader: loaderReducer,
  toast: toastReducer,
});