import { createAction } from '@reduxjs/toolkit';

const add = createAction('plan/add');

const update = createAction('plan/update');

const remove = createAction('plan/remove');

export const PlanActions = { add, update, remove };
