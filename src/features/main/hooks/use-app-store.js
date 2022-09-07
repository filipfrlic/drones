import { useMemo } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';

import { reducer } from '../redux';

const persistedReducer = persistReducer(
  {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['drones', 'points', 'plan'],
  },
  reducer,
);

export const useAppStore = () =>
  useMemo(() => {
    const store = configureStore({
      reducer: persistedReducer,
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: {
            ignoredActions: ['persist/PERSIST'],
          },
        }),
    });

    return { store, persistor: persistStore(store) };
  }, []);
