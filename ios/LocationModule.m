
#import "LocationModule.h"
#import <React/RCTLog.h>

@implementation LocationModule

RCT_EXPORT_MODULE(LocationModule);

CLLocationManager* mLocationManager;
RCTPromiseResolveBlock mResolve;
RCTPromiseRejectBlock mReject;



RCT_EXPORT_METHOD(getCurrentPosition:(RCTPromiseResolveBlock) resolve
                  rejecter: (RCTPromiseRejectBlock) reject) {
    dispatch_async(dispatch_get_main_queue(), ^{
        @try {
            [self cancelPreviousRequest];
            
            if (@available(iOS 14.0, *)) {
                // should use locationManagerDidChangeAuthorization
            } else {
                if (![CLLocationManager locationServicesEnabled]) {
                    [[NSException
                      exceptionWithName:@"Unavailable"
                      reason:@"Location service is unavailable"
                      userInfo:nil]
                     raise];
                }
            }
            

            
            CLLocationManager *locationManager = [[CLLocationManager alloc] init];
            locationManager.delegate = self;
            locationManager.distanceFilter = kCLDistanceFilterNone;
            locationManager.desiredAccuracy = kCLLocationAccuracyNearestTenMeters;
            
            mResolve = resolve;
            mReject = reject;
            mLocationManager = locationManager;

            
            [self startUpdatingLocation];
        }
        @catch (NSException *exception) {
            NSMutableDictionary * info = [NSMutableDictionary dictionary];
            [info setValue:exception.name forKey:@"ExceptionName"];
            [info setValue:exception.reason forKey:@"ExceptionReason"];
            [info setValue:exception.callStackReturnAddresses forKey:@"ExceptionCallStackReturnAddresses"];
            [info setValue:exception.callStackSymbols forKey:@"ExceptionCallStackSymbols"];
            [info setValue:exception.userInfo forKey:@"ExceptionUserInfo"];
            
            NSError *error = [[NSError alloc] initWithDomain:@"Location not available." code:1 userInfo:info];
            reject(@"UNAVAILABLE", @"Location not available", error);
        }
    });
}

- (void) locationManager:(CLLocationManager *)manager didUpdateLocations:(NSArray<CLLocation *> *)locations {
    if (locations.count > 0 && mResolve != nil) {
        CLLocation* location = locations[0];
        
        NSDictionary* locationResult = @{
            @"latitude": @(location.coordinate.latitude),
            @"longitude": @(location.coordinate.longitude),
            @"altitude": @(location.altitude),
            @"speed": @(location.speed),
            @"accuracy": @(location.horizontalAccuracy),
            @"time": @(location.timestamp.timeIntervalSince1970 * 1000),
            @"verticalAccuracy": @(location.verticalAccuracy),
            @"course": @(location.course),
        };
        
        mResolve(locationResult);
    }
    [self clearReferences];
}

- (void) locationManager:(CLLocationManager *)manager didFailWithError:(NSError *)error {
    if (mReject != nil) {
        mReject(@"UNAVAILABLE", @"Location not available", error);
    }
    [self clearReferences];
}

- (void) runTimeout:(id)sender {
    if (mReject != nil) {
        mReject(@"TIMEOUT", @"Location timed out", nil);
    }
    [self clearReferences];
}

- (void)locationManager:(CLLocationManager *)manager didChangeAuthorizationStatus:(CLAuthorizationStatus)status {
    if ([self isAuthorized]) {
        [self startUpdatingLocation];
    } else if ([self isAuthorizationDenied]) {
        mReject(@"UNAUTHORIZED", @"Authorization denied", nil);
        [self clearReferences];
    }
}

- (void) clearReferences {
    
    if (mLocationManager != nil) {
        [mLocationManager stopUpdatingLocation];
    }
    mResolve = nil;
    mReject = nil;
    mLocationManager = nil;
}

- (void) cancelPreviousRequest {
    if (mLocationManager != nil) {
        mReject(@"CANCELLED", @"Location cancelled by another request", nil);
    }
    [self clearReferences];
}

- (void) startUpdatingLocation {
    if (![self isAuthorized]) {
        NSLog(@"[locationManager requestWhenInUseAuthorization]");
        [mLocationManager requestWhenInUseAuthorization];
        return;
    }
    
    NSLog(@"[locationManager startUpdatingLocation]");
    [mLocationManager startUpdatingLocation];
}

- (void)locationManagerDidChangeAuthorization:(CLLocationManager *)manager {
    if (@available(iOS 14.0, *)) {
        if (![CLLocationManager locationServicesEnabled]) {
            mReject(@"UNAVAILABLE", @"Location not available", nil);
            [self clearReferences];
            return;
        }
        
        switch ([manager authorizationStatus]) {
            case kCLAuthorizationStatusAuthorizedAlways:
            case kCLAuthorizationStatusAuthorizedWhenInUse: {
                [self startUpdatingLocation];
                break;
            }
            case kCLAuthorizationStatusNotDetermined: {
                // do nothing
                break;
            }
            case kCLAuthorizationStatusDenied:
            case kCLAuthorizationStatusRestricted:
            default: {
                mReject(@"UNAUTHORIZED", @"Authorization denied", nil);
                [self clearReferences];
                break;
            }
        }
    }
}

- (BOOL) isAuthorizationDenied {
    int authorizationStatus = [CLLocationManager authorizationStatus];
    
    return authorizationStatus == kCLAuthorizationStatusDenied;
}

- (BOOL) isAuthorized {
    int authorizationStatus = [CLLocationManager authorizationStatus];
    
    return authorizationStatus == kCLAuthorizationStatusAuthorizedWhenInUse
    || authorizationStatus == kCLAuthorizationStatusAuthorizedAlways;
}

@end
