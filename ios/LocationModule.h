//
//  LocationModule.h
//  WeatherApp
//
//  Created by ahmed mohamed on 31/05/2024.
//

#ifndef LocationModule_h
#define LocationModule_h
#import <React/RCTBridgeModule.h>
#import <React/RCTConvert.h>
#import <CoreLocation/CoreLocation.h>

@interface LocationModule : NSObject <RCTBridgeModule, CLLocationManagerDelegate>

@end

#endif /* LocationModule_h */
