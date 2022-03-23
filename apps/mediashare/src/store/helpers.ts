export const reducePendingState = (reducer?: (state, action) => any) => (state, action) => {
  const pendingStateProperties = { ...state, loading: true, loaded: false };
  return reducer ? reducer(pendingStateProperties, action) : pendingStateProperties;
};

export const reduceRejectedState = (reducer?: (state, action) => any) => (state, action) => {
  const rejectedStateProperties = { ...state, loading: false, loaded: true };
  return reducer ? reducer(rejectedStateProperties, action) : rejectedStateProperties;
};

export const reduceFulfilledState = (reducer?: (state, action) => any) => (state, action) => {
  const fulfilledStateProperties = reducer ? { ...state, loading: false, loaded: true } : { ...state, ...action.payload, loading: false, loaded: true };
  return reducer ? reducer(fulfilledStateProperties, action) : fulfilledStateProperties;
};

export const reduceClearedState = (reducer?: (state, action) => any) => (state, action) => {
  const clearedStateProperties = { loading: false, loaded: true };
  return reducer ? reducer(clearedStateProperties, action) : clearedStateProperties;
};
