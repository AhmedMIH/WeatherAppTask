import {PermissionsAndroid} from 'react-native';

import LocationError from './LocationError';

const {PERMISSIONS, RESULTS} = PermissionsAndroid;

export async function requestAndroidPermission() {
  const permission = PERMISSIONS.ACCESS_COARSE_LOCATION;

  const alreadyGranted = await PermissionsAndroid.check(permission);

  if (alreadyGranted) return true;

  const granted = await PermissionsAndroid.request(permission);

  if (granted !== RESULTS.GRANTED) {
    throw new LocationError('UNAUTHORIZED', 'Authorization denied');
  }

  return true;
}
