import { RootState } from '..';
import { snakeCaseToCamelCase, SnakeCaseToCamelCase } from './types';
import * as R from 'remeda';
import { Reducer } from 'redux';
export const ReducerFactory = function <T extends string>(
  reducerDict: Record<T[number], (...args) => RootState>
): Reducer {
  const reducer = function (state: RootState, action: { type: T }) {
    const { type } = action;
    if (!type) return state;
    console.log(state, action);
    return reducerDict[snakeCaseToCamelCase(type)];
  };

  return reducer;
};

export type ReducerDictionary<T extends string> = Record<SnakeCaseToCamelCase<T>, (...args) => RootState>;

export const cloneState = (state: RootState): RootState => R.clone<RootState>(state);

export const mergeState = (state: RootState) => <T>(item: T) => R.merge(cloneState(state), R.clone(item));
