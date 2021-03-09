import { RootState } from '..';
import { snakeCaseToCamelCase, SnakeCaseToCamelCase } from './types';

export const ReducerFactory = function <T extends string>(reducerDict: Record<T[number], (...args) => RootState>) {
  const reducer = function (type: T) {
    return reducerDict[snakeCaseToCamelCase(type)];
  };

  return reducer;
};

export type ReducerDictionary<T extends string> = Record<SnakeCaseToCamelCase<T>, (...args) => RootState>;
