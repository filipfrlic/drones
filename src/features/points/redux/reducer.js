import { createReducer } from '@reduxjs/toolkit';

import { PointActions } from './actions';

const INITIAL_STATE = [];

export const reducer = createReducer(INITIAL_STATE, (builder) => {
  builder.addCase(PointActions.add, (state, { payload }) => [...state, payload]);
  builder.addCase(PointActions.update, (state, { payload }) => {
    const index = state.findIndex((d) => d.id === payload.id);
    const newState = [...state];
    newState[index] = payload;

    return newState;
  });
  builder.addCase(PointActions.remove, (state, { payload }) =>
    state.filter((d) => d.id !== payload),
  );
});
