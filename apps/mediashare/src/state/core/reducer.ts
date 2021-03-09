import { RootState } from '..';

export const ReducerFactory = function <T extends string>(reducerDict: Record<T[number], (...args) => RootState>) {
  const reducer = function (type: T) {
    return reducerDict[type];
  };

  return reducer;
};
