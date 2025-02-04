package com.weatherapptask;

import android.content.Context;
import android.location.LocationManager;


import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;



public class LocationModule extends ReactContextBaseJavaModule {

    public static final String NAME = "LocationModule";

    private LocationManager locationManager;
    private GetLocation getLocation;

    public LocationModule(ReactApplicationContext reactContext) {
        super(reactContext);
        try {
            locationManager = (LocationManager) reactContext.getApplicationContext().getSystemService(Context.LOCATION_SERVICE);
        } catch (Exception ex) {
            ex.printStackTrace();
        }
    }

    @Override
    public String getName() {
        return NAME;
    }




    @ReactMethod
    public void getCurrentPosition( Promise promise) {
        if (getLocation != null) {
            getLocation.cancel();
        }
        getLocation = new GetLocation(locationManager);
        getLocation.get( promise);
    }

}