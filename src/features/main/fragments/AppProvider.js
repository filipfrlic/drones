import React from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import PropTypes from 'prop-types';
import { PersistGate } from 'redux-persist/integration/react';

import { useAppStore } from '../hooks';

export const AppProvider = ({ children }) => {
  const { store, persistor } = useAppStore();

  return (
    <NavigationContainer>
      <Provider store={store}>
        <PersistGate persistor={persistor}>{children}</PersistGate>
      </Provider>
    </NavigationContainer>
  );
};

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
