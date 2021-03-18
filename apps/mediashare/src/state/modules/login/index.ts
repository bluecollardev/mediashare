import { createAction, createReducer, PayloadAction } from '@reduxjs/toolkit';

import INITIAL_STATE, { RootState } from '../../index';
import { LoginDto } from '../../../api';

const loginAction = createAction<LoginDto>('login');
const logoutAction = createAction('logout');
const toggleLoadingAction = createAction('toggleLoading');

const initialState = INITIAL_STATE;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const toggleLoadingReducer = (state: RootState, action: PayloadAction<RootState>): RootState => {
  return state;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const index = (state: RootState, action: PayloadAction<any>): RootState => {
  return state;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const logoutReducer = (state: RootState, action: PayloadAction<any>): RootState => {
  return state;
};

export const loginReducer = createReducer(initialState, (builder) =>
  builder.addCase(loginAction, index).addCase(logoutAction, logoutReducer).addCase(toggleLoadingAction, toggleLoadingReducer)
);

export { loginAction as login, logoutAction as logout, toggleLoadingAction as toggleLoading };
