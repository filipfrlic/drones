import { createAction } from '@reduxjs/toolkit';

const add = createAction('drones/add');

const update = createAction('drones/update');

const remove = createAction('drones/remove');

export const DroneActions = { add, update, remove };
