import { createAction } from '@reduxjs/toolkit';

const add = createAction('points/add');

const update = createAction('points/update');

const remove = createAction('points/remove');

export const PointActions = { add, update, remove };
