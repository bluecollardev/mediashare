import { createAsyncThunk, createReducer } from '@reduxjs/toolkit';
import { Auth } from 'aws-amplify';
import { LoginDto } from '../../../rxjs-api';
import { apis } from '../../apis';

import { ActionsFactory } from '../../core/factory';

import { AuthDetails } from './auth-type.model';

export const USER_STATE_KEY = 'user';

// We don't define any 'get' actions as they don't update state - use redux selectors instead
const USER_ACTIONS = ['LOGIN', 'LOGOUT', 'UPDATE_ACCOUNT', 'DELETE_ACCOUNT', 'CREATE'] as const;
const initialState: AuthDetails = null;
export const UserActions = ActionsFactory(USER_ACTIONS, initialState);
export const logout = createAsyncThunk(UserActions.logout.type, async () => {
  return await Auth.signOut();
});
const userReducer = createReducer(initialState, (builder) =>
  builder
    .addCase(UserActions.login, (state, action) => {
      console.log(action);
      return action.payload;
    })
    .addCase(logout.fulfilled, (state, actions) => {
      return null;
    })
);
// export const;
export { userReducer };
