import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { makeActions } from 'mediashare/store/factory';
import { reduceFulfilledState, reducePendingState, reduceRejectedState } from 'mediashare/store/helpers';
import { signOut } from 'mediashare/core/aws/auth';
import { ApiService } from 'mediashare/store/apis';
import { AuthorizeDto, ProfileDto, UpdateUserDto, BcRolesType } from 'mediashare/rxjs-api';
// import { setKeyPair } from './keypair-store'; // TODO: Not compatible with react-native-web [https://github.com/expo/expo/issues/7744]
import { pick, clone } from 'remeda';

// Define these in snake case or our converter won't work... we need to fix that
const userActionNames = ['login', 'logout', 'load_user', 'update_account'] as const;

export const userActions = makeActions(userActionNames);

export const loginAction = createAsyncThunk(userActions.login.type, async (authorizeDto: AuthorizeDto, { extra }) => {
  const { api } = extra as { api: ApiService };
  return await api.user.userControllerAuthorize({ authorizeDto }).toPromise();
});

export const logout = createAsyncThunk(userActions.logout.type, async (opts = undefined, { extra }) => {
  const { api } = extra as { api: ApiService };
  await api.user.userControllerLogout().toPromise();
  // await setKeyPair('token', ''); // TODO: Not compatible with react-native-web [https://github.com/expo/expo/issues/7744]
  await signOut();
});

export const loadUser = createAsyncThunk(userActions.loadUser.type, async (opts = undefined, { extra }) => {
  const { api } = extra as { api: ApiService };
  return await api.user.userControllerGetUser().toPromise();
});

export const updateAccount = createAsyncThunk(
  userActions.updateAccount.type,
  async ({ updateUserDto, userId }: { updateUserDto: UpdateUserDto; userId?: string }, { extra }) => {
    const { api } = extra as { api: ApiService };
    // TODO: If no userId, that means we're updating the account owner's account? Or was that for our previous hardcoded user?
    return userId
      ? await api.users.usersControllerUpdate({ userId, updateUserDto }).toPromise()
      : await api.user.userControllerUpdateUser({ updateUserDto }).toPromise();
  }
);

export const defaultUserProfile: Pick<
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

interface UserState {
  entity: Partial<typeof defaultUserProfile> | undefined;
  loading: boolean;
  loaded: boolean;
}

export const userInitialState: UserState = {
  entity: clone(defaultUserProfile),
  loading: false,
  loaded: false,
};

// TODO: Double check these fields, do we even have roles?
const pickUser = (user: Partial<ProfileDto>) =>
  pick(user, [
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

const userSlice = createSlice({
  name: 'user',
  initialState: userInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginAction.pending, reducePendingState())
      .addCase(loginAction.rejected, reduceRejectedState())
      .addCase(loginAction.fulfilled, (state, action) => ({
        ...state,
        entity: { ...pickUser(action.payload) },
        loading: false,
        loaded: true,
      }))
      .addCase(logout.pending, reducePendingState())
      .addCase(logout.rejected, reduceRejectedState())
      .addCase(
        logout.fulfilled,
        reduceFulfilledState(() => ({
          ...userInitialState,
        }))
      )
      .addCase(loadUser.pending, reducePendingState())
      .addCase(loadUser.rejected, reduceRejectedState())
      .addCase(loadUser.fulfilled, (state, action) => ({
        ...state,
        entity: { ...pickUser(action.payload) },
        loading: false,
        loaded: true,
      }))
      .addCase(updateAccount.pending, reducePendingState())
      .addCase(updateAccount.rejected, reduceRejectedState())
      .addCase(updateAccount.fulfilled, (state, action) => ({
        ...state,
        entity: { ...pickUser(action.payload) },
        loading: false,
        loaded: true,
      }));
  },
});

export default userSlice;
export const reducer = userSlice.reducer;
