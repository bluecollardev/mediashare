import { CaseReducer, createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import * as R from 'remeda';
import { makeEnum } from '../../core/factory';
const INITIAL_STATE = {
  loading: false,
  z: 'a',
};
// type InitialAppStateType = typeof INITIAL_STATE;
type InitialAppStateKeys = keyof InitialAppStateType;

// export type ObjectInfer<O> = O extends { InitialAppStateKeys[number]: infer A /** you could put another object in here */ } ? A : never;
export type ValuesWithKeys<T, K extends keyof T> = T[K];

export type InitialStateUnion<T extends object> = { [P in keyof T]: ValuesWithKeys<T, P> };

const appStateSlice = createSlice({
  name: 'appState',
  initialState: INITIAL_STATE,
  reducers: {
    loading: (state, action: PayloadAction<boolean>) => {
      console.log('loading');
      return {
        ...state,
        loading: true,
      };
    },
  },
});

export const { loading } = appStateSlice.actions;
export const reducer = appStateSlice.reducer;
