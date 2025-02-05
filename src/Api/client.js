import axios from 'axios';
import Config from 'react-native-config';
import {debugLog} from '../Utils/Helper';

const apiClient = axios.create({
  baseURL: Config.BASE_API_URL,
  headers: {
    'Content-type': 'application/json',
  },
  params: {
    key: Config.API_KEY,
  },
});

apiClient.interceptors.request.use(
  config => {
    debugLog('Request config: ', config);
    return config;
  },
  error => {
    debugLog('Request error: ', error);
    return Promise.reject(error);
  },
);

apiClient.interceptors.response.use(
  response => {
    debugLog('Response: ', response);
    return response;
  },
  error => {
    debugLog('Response error: ', error);
    return Promise.reject(error);
  },
);

export default apiClient;
