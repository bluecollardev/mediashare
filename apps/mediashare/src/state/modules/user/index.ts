import { createAsyncThunk, createReducer } from '@reduxjs/toolkit';
import * as R from 'remeda';

import { ActionsFactory } from '../../core/factory';
import { UpdateUserDto, UserDto, TokenDto } from '../../../rxjs-api';
import { apis } from '../../apis';
import { setKeyPair } from './keypair-store';
import { signOut } from './auth';

// We don't define any 'get' actions as they don't update state - use redux selectors instead
const USER_ACTIONS = ['LOGIN', 'LOGOUT', 'UPDATE_ACCOUNT', 'DELETE_ACCOUNT', 'VALIDATE', 'LOAD_USER'] as const;
const initialState: Pick<UserDto, 'username' | 'firstName' | 'lastName' | '_id' | 'phoneNumber' | 'imageSrc' | 'email' | 'mediaItems'> = {
  username: '',
  firstName: '',
  lastName: '',
  _id: '',
  mediaItems: [],
  phoneNumber: '',
  imageSrc: '',
  email: '',
};

const pickUser = (user: UserDto) => R.pick(user, ['username', 'email', '_id', 'firstName', 'lastName', 'phoneNumber', 'imageSrc', 'mediaItems']);
export const UserActions = ActionsFactory(USER_ACTIONS, initialState);

export const loginAction = createAsyncThunk(UserActions.login.type, async (tokenDto: TokenDto) => {
  const response = await apis.user.userControllerAuthorize({ tokenDto }).toPromise();
  // await setKeyPair('token', response.accessToken);
  return response;
});

export const loadUser = createAsyncThunk(UserActions.loadUser.type, async () => {
  return await apis.user.userControllerGetUser().toPromise();
});

export const updateAccount = createAsyncThunk(UserActions.updateAccount.type, async ({ updateUserDto }: { updateUserDto: UpdateUserDto }) => {
  return await apis.user.userControllerUpdate({ updateUserDto }).toPromise();
});

export const logout = createAsyncThunk(UserActions.logout.type, async () => {
  const response = await apis.user.userControllerLogout().toPromise();
  await setKeyPair('token', '');
  const signout = await signOut();
  console.log(signout);
  return response;
});

const userReducer = createReducer(initialState, (builder) =>
  builder
    .addCase(loginAction.fulfilled, (state, action) => {
      return pickUser(action.payload);
    })
    .addCase(updateAccount.fulfilled, (state, action) => {
      return pickUser(action.payload);
    })
    .addCase(loadUser.fulfilled, (state, action) => {
      return { ...state, ...pickUser(action.payload) };
    })
    .addCase(loginAction.pending, (state) => {
      return { ...state };
    })
    .addCase(loginAction.rejected, (state, action) => {
      console.log('error: ', action);
      return { ...state };
    })

    .addCase(logout.fulfilled, () => {
      return initialState;
    })
    .addCase(logout.pending, (state) => {
      return { ...state };
    })
    .addCase(logout.rejected, (state, action) => {
      console.log('error: ', action);
      return { ...state };
    })
);

export { userReducer };
