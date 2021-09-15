import { createAsyncThunk, createReducer } from '@reduxjs/toolkit';

import { ActionsFactory } from '../../core/factory';
import { LoginResponseDto } from '../../../api/models/login-response-dto';
import { LoginDto } from '../../../api/models/login-dto';
import { apis } from '../../apis';
import { loadStateAction } from '../../../boot/configureStore';
import * as SecureStore from 'expo-secure-store';
import { getKeyPair, setKeyPair } from './keypair-store';
import { UserControllerAuthorizeRequest } from '../../../rxjs-api/apis/UserApi';

export const USER_STATE_KEY = 'user';

// We don't define any 'get' actions as they don't update state - use redux selectors instead
const USER_ACTIONS = ['LOGIN', 'LOGOUT', 'UPDATE_ACCOUNT', 'DELETE_ACCOUNT', 'VALIDATE'] as const;
const initialState: LoginResponseDto = {
  username: '',
  firstName: '',
  lastName: '',
  _id: '',
  accessToken: '',
};
export const UserActions = ActionsFactory(USER_ACTIONS, initialState);
// const login = createAsyncThunk(UserActions.login.type, async (loginDto: LoginDto) => await apis.user.userControllerLogin({ loginDto }));

export const loginAction = createAsyncThunk(UserActions.login.type, async (loginDto: LoginDto) => {
  const response = await apis.user.userControllerLogin({ loginDto }).toPromise();

  await setKeyPair('token', response.accessToken);

  return response;
});

export const validateTokenAction = createAsyncThunk(UserActions.validate.type, async (token: string) => {
  const response = await apis.user.userControllerAuthorize({ tokenDto: { token } }).toPromise();
  return response;
});

export const logoutAction = createAsyncThunk(UserActions.login.type, async () => {
  const response = await apis.user.userControllerLogout().toPromise();

  return response;
});

const userReducer = createReducer(initialState, (builder) =>
  builder
    .addCase(loginAction.fulfilled, (state, action) => {
      return action.payload;
    })
    .addCase(loginAction.pending, (state, action) => {
      return { ...state };
    })
    .addCase(loginAction.rejected, (state, action) => {
      console.log('error: ', action);
      return { ...state };
    })
    .addCase(validateTokenAction.fulfilled, (state, action) => {
      return action.payload;
    })
    .addCase(validateTokenAction.pending, (state, action) => {
      return { ...state };
    })
    .addCase(validateTokenAction.rejected, (state, action) => {
      console.log('error: ', action);
      return { ...state };
    })
);
// export const;
export { userReducer };
