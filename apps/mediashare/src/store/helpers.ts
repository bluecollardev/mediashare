export const reducePendingState = (reducer?: (state, action) => any) => (state, action) => {
  const pendingStateProperties = { ...state, loading: true, loaded: false };
  return reducer ? reducer(pendingStateProperties, action) : pendingStateProperties;
};

export const reduceRejectedState = (reducer?: (state, action) => any) => (state, action) => {
  const rejectedStateProperties = { ...state, loading: false, loaded: true };
  return reducer ? reducer(rejectedStateProperties, action) : rejectedStateProperties;
};

export const reduceFulfilledState = (reducer?: (state, action) => any) => (state, action) => {
  const fulfilledStateProperties = { ...state, loading: false, loaded: true };
  return reducer ? reducer.call(reducer, action) : fulfilledStateProperties;
};
