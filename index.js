import React from 'react';
import { AppRegistry } from 'react-native';

import { App, AppProvider } from 'features/main';

import { name as appName } from './app.json';

const Root = () => (
  <AppProvider>
    <App />
  </AppProvider>
);

AppRegistry.registerComponent(appName, () => Root);
