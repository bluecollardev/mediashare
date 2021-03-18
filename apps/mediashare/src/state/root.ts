import { createAction, createReducer, PayloadAction } from '@reduxjs/toolkit';

import INITIAL_STATE, { RootState } from '.';
import { LoginDto } from '../api';

const loginAction = createAction<LoginDto>('login');
const logoutAction = createAction('logout');
const toggleLoadingAction = createAction('toggleLoading');

const initialState = INITIAL_STATE;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const toggleLoadingReducer = (state: RootState, action: PayloadAction<RootState>): RootState => {
  return state;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const loginReducer = (state: RootState, action: PayloadAction<any>): RootState => {
  return state;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const logoutReducer = (state: RootState, action: PayloadAction<any>): RootState => {
  return state;
};

export const rootReducer = createReducer(initialState, (builder) =>
  builder.addCase(loginAction, loginReducer).addCase(logoutAction, logoutReducer).addCase(toggleLoadingAction, toggleLoadingReducer)
);

export { loginAction as login, logoutAction as logout, toggleLoadingAction as toggleLoading };
