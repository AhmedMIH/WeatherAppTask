import axios from "axios";
import Config from "react-native-config";
import { debugLog } from "../Utils/Helper";

const apiClient = axios.create( {
    baseURL: Config.BASE_API_URL,
    headers: {
        "Content-type": "application/json"
    },
  
} );

apiClient.interceptors.request.use( config => {
    console.log(config);
    return config
} );

apiClient.interceptors.response.use( response => {
    return response
} );

export default apiClient;