const rootSelector = (state) => state.drones;

const getAll = (state) => rootSelector(state);
const getById = (state) => (id) => rootSelector(state).find((d) => d.id === id);

export const DroneSelectors = {
  getAll,
  getById,
};
