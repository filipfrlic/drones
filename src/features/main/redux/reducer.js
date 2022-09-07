import { combineReducers } from '@reduxjs/toolkit';

import { reducer as dronesReducer } from 'features/drones';
import { reducer as planReducer } from 'features/plan';
import { reducer as pointsReducer } from 'features/points';

export const reducer = combineReducers({
  drones: dronesReducer,
  points: pointsReducer,
  plan: planReducer,
});
