import axios from "axios";
import Config from "react-native-config";
import { debugLog } from "../Utils/Helper";

const apiClient = axios.create( {
    baseURL: Config.BASE_API_URL,
    headers: {
        "Content-type": "application/json"
    },
    params: {
        key: Config.API_KEY,
    },
  
} );

export default apiClient;