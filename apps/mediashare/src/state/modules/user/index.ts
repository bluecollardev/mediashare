import { createReducer } from '@reduxjs/toolkit';

import { ActionsFactory } from '../../core/factory';

import { AuthDetails } from './auth-type.model';

export const USER_STATE_KEY = 'user';

// We don't define any 'get' actions as they don't update state - use redux selectors instead
const USER_ACTIONS = ['LOGIN', 'LOGOUT', 'UPDATE_ACCOUNT', 'DELETE_ACCOUNT'] as const;
const initialState: AuthDetails = null;
export const UserActions = ActionsFactory(USER_ACTIONS, initialState);
// const login = createAsyncThunk(UserActions.login.type, async (loginDto: LoginDto) => await apis.user.userControllerLogin({ loginDto }));

const userReducer = createReducer(initialState, (builder) =>
  builder.addCase(UserActions.login, (state, action) => {
    console.log(action);
    return action.payload;
  })
);
// export const;
export { userReducer };
