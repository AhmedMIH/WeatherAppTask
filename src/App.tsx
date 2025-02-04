import React from 'react';
import SplashScreen from 'react-native-splash-screen';
import {useEffect} from 'react';
import AppNavigation from './Routes/AppNavigation';
import {Provider} from 'react-redux';
import {store} from './Redux/Store';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import GlobalLoader from '../src/Components/GlobalLoader';
import GlobalToast from '../src/Components/GlobalToast';
import ErrorBoundary from '../src/Components/ErrorBoundary';

import {StatusBar} from 'react-native';
import Colors from './Utils/Colors';

function App(): React.JSX.Element {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <Provider store={store}>
      <SafeAreaView style={{flex: 1, backgroundColor: Colors.gradient}}>
        <ErrorBoundary>
          <AppNavigation />
          <GlobalLoader />
          <GlobalToast />
        </ErrorBoundary>
      </SafeAreaView>
    </Provider>
  );
}

export default App;
