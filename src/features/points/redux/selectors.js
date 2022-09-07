const rootSelector = (state) => state.points;

const getAll = (state) => rootSelector(state);
const getById = (state) => (id) => rootSelector(state).find((d) => d.id === id);

export const PointSelectors = {
  getAll,
  getById,
};
