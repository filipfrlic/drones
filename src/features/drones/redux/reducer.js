import { createReducer } from '@reduxjs/toolkit';

import { DroneActions } from './actions';

const INITIAL_STATE = [];

export const reducer = createReducer(INITIAL_STATE, (builder) => {
  builder.addCase(DroneActions.add, (state, { payload }) => [...state, payload]);
  builder.addCase(DroneActions.update, (state, { payload }) => {
    const index = state.findIndex((d) => d.id === payload.id);
    const newState = [...state];
    newState[index] = payload;

    return newState;
  });
  builder.addCase(DroneActions.remove, (state, { payload }) =>
    state.filter((d) => d.id !== payload),
  );
});
