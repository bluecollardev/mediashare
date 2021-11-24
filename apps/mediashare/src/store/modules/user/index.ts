import { createAsyncThunk, createReducer } from '@reduxjs/toolkit';
import * as R from 'remeda';

import { ActionsFactory } from '../../core/factory';
// import { setKeyPair } from './keypair-store'; // TODO: Not compatible with react-native-web [https://github.com/expo/expo/issues/7744]
import { signOut } from './auth';

import { AuthorizeDto, ProfileDto, UpdateUserDto, BcRolesType } from '../../../rxjs-api';
import { apis } from '../../apis';

import { reducePendingState, reduceRejectedState } from '../../helpers';

// We don't define any 'get' actions as they don't update state - use redux selectors instead
const USER_ACTIONS = ['LOGIN', 'LOGOUT', 'UPDATE_ACCOUNT', 'DELETE_ACCOUNT', 'VALIDATE', 'LOAD_USER'] as const;
const initialState: Pick<
  ProfileDto,
  'username' | 'firstName' | 'lastName' | '_id' | 'phoneNumber' | 'imageSrc' | 'email' | 'role' | 'sharedCount' | 'sharesCount' | 'likesCount' | 'sharedItems'
> = {
  username: '',
  firstName: '',
  lastName: '',
  _id: '',
  phoneNumber: '',
  imageSrc: '',
  email: '',
  role: BcRolesType.Guest,
  sharedCount: 0,
  likesCount: 0,
  sharesCount: 0,
  sharedItems: [],
};

const pickUser = (user: ProfileDto) =>
  R.pick(user, [
    'username',
    'email',
    '_id',
    'firstName',
    'lastName',
    'phoneNumber',
    'imageSrc',
    'role',
    'sharedCount',
    'likesCount',
    'sharesCount',
    'sharedItems',
  ]);
export const UserActions = ActionsFactory(USER_ACTIONS, initialState);

export const loginAction = createAsyncThunk(UserActions.login.type, async (authorizeDto: AuthorizeDto) => {
  return await apis.user.userControllerAuthorize({ authorizeDto }).toPromise();
});

export const loadUser = createAsyncThunk(UserActions.loadUser.type, async () => {
  const req = apis.user.userControllerGetUser();
  return await req.toPromise();
});

export const updateAccount = createAsyncThunk(
  UserActions.updateAccount.type,
  async ({ updateUserDto, userId }: { updateUserDto: UpdateUserDto; userId?: string }) => {
    const req = userId ? apis.users.usersControllerUpdate({ userId, updateUserDto }) : apis.user.userControllerUpdate({ updateUserDto });
    return await req.toPromise();
  }
);

export const logout = createAsyncThunk(UserActions.logout.type, async () => {
  const response = await apis.user.userControllerLogout().toPromise();
  // await setKeyPair('token', ''); // TODO: Not compatible with react-native-web [https://github.com/expo/expo/issues/7744]
  await signOut();
  return response;
});

const userReducer = createReducer(initialState, (builder) =>
  builder
    .addCase(loginAction.fulfilled, (state, action) => {
      return { ...state, ...pickUser(action.payload) };
    })
    .addCase(updateAccount.fulfilled, (state, action) => {
      const { firstName, lastName, phoneNumber, email, imageSrc } = action.payload;
      return { ...state, firstName, lastName, phoneNumber, email, imageSrc };
    })
    .addCase(loadUser.fulfilled, (state, action) => {
      return { ...state, ...pickUser({ ...action.payload }) };
    })
    .addCase(loginAction.pending, reducePendingState())
    .addCase(loginAction.rejected, reduceRejectedState())
    .addCase(logout.fulfilled, () => {
      return initialState;
    })
    .addCase(logout.pending, reducePendingState())
    .addCase(logout.rejected, reduceRejectedState())
);

export { userReducer };
