package com.weatherapptask;

import android.location.Criteria;
import android.location.Location;
import android.location.LocationListener;
import android.location.LocationManager;
import android.os.Bundle;
import android.os.Looper;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableNativeMap;

import java.util.Timer;

public class GetLocation {

    private final LocationManager locationManager;

    private Timer timer;
    private LocationListener listener;
    private Promise promise;

    public GetLocation(LocationManager locationManager) {
        this.locationManager = locationManager;
    }

    public void get( final Promise promise) {
        this.promise = promise;
        try {
            if (!isLocationEnabled()) {
                promise.reject("UNAVAILABLE", "Location not available");
                return;
            }

            long timeout =0;

            Criteria criteria = new Criteria();
            criteria.setAccuracy(Criteria.ACCURACY_COARSE);

            listener = new LocationListener() {
                private boolean locationFound = false;

                @Override
                public synchronized void onLocationChanged(Location location) {
                    if (location != null && !locationFound) {
                        locationFound = true;
                        WritableNativeMap resultLocation = new WritableNativeMap();
                        resultLocation.putDouble("latitude", location.getLatitude());
                        resultLocation.putDouble("longitude", location.getLongitude());
                        promise.resolve(resultLocation);
                        stop();
                        clearReferences();
                    }
                }

                @Override
                public void onStatusChanged(String provider, int status, Bundle extras) {

                }

                @Override
                public void onProviderEnabled(String provider) {

                }

                @Override
                public void onProviderDisabled(String provider) {

                }
            };

            locationManager.requestLocationUpdates(0L, 0F, criteria, listener, Looper.myLooper());

        } catch (SecurityException ex) {
            ex.printStackTrace();
            stop();
            promise.reject("UNAUTHORIZED", "Location permission denied", ex);
        } catch (Exception ex) {
            ex.printStackTrace();
            stop();
            promise.reject("UNAVAILABLE", "Location not available", ex);
        }
    }

    public synchronized void cancel() {
        if (promise == null) {
            return;
        }
        try {
            promise.reject("CANCELLED", "Location cancelled by another request");
            stop();
            clearReferences();
        } catch (Exception ex) {
            ex.printStackTrace();
        }
    }

    private void stop() {
        if (timer != null) {
            timer.cancel();
        }
        if (listener != null) {
            locationManager.removeUpdates(listener);
        }
    }

    private void clearReferences() {
        promise = null;
        timer = null;
        listener = null;
    }

    private boolean isLocationEnabled() {
        try {
            return locationManager.isProviderEnabled(LocationManager.GPS_PROVIDER) ||
                    locationManager.isProviderEnabled(LocationManager.NETWORK_PROVIDER);
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return false;
    }
}