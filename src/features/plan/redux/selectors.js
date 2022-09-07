const rootSelector = (state) => state.plan;

const getAll = (state) => rootSelector(state);
const getById = (state) => (id) => rootSelector(state).find((d) => d.id === id);

export const PlanSelectors = {
  getAll,
  getById,
};
