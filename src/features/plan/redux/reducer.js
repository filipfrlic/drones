import { createReducer } from '@reduxjs/toolkit';

import { PlanActions } from './actions';

const INITIAL_STATE = [];

export const reducer = createReducer(INITIAL_STATE, (builder) => {
  builder.addCase(PlanActions.add, (state, { payload }) => [...state, payload]);
  builder.addCase(PlanActions.update, (state, { payload }) => {
    const index = state.findIndex((d) => d.id === payload.id);
    const newState = [...state];
    newState[index] = payload;

    return newState;
  });
  builder.addCase(PlanActions.remove, (state, { payload }) =>
    state.filter((d) => d.id !== payload),
  );
});
