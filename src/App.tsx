import React from 'react';
import AppNavigation from './Routes/AppNavigation';
import {Provider} from 'react-redux';
import {store} from './Redux/Store';

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <AppNavigation />
    </Provider>
  );
}

export default App;
