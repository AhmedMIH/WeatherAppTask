import { NativeModules, Platform } from 'react-native';
import {

    requestAndroidPermission,
} from './LocationUtility';
import LocationError, { isLocationError } from './LocationError';

const { OS } = Platform;
const { LocationModule } = NativeModules;

const GetLocation = {
    async getCurrentPosition () {
        if ( OS === 'android' ) {
            await requestAndroidPermission();
        }

        try {
            return LocationModule.getCurrentPosition();
        } catch ( error ) {
            if ( isLocationError( error ) ) {
                throw new LocationError( error.code, error.message );
            }
            throw error;
        }
    },
};

export default GetLocation;