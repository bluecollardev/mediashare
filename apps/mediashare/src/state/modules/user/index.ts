import { createAction, createAsyncThunk, createReducer, createSlice } from '@reduxjs/toolkit';

import { ActionsFactory, withPayloadType } from '../../core/factory';
import { LoginResponseDto } from '../../../api/models/login-response-dto';
import { LoginDto } from '../../../api/models/login-dto';
import { apis, ApiService } from '../../apis';
import { addItem } from '../../core/reducers';

export const USER_STATE_KEY = 'user';

// We don't define any 'get' actions as they don't update state - use redux selectors instead
const USER_ACTIONS = ['LOGIN', 'LOGOUT', 'UPDATE_ACCOUNT', 'DELETE_ACCOUNT'] as const;
const initialState: LoginResponseDto = {
  username: '',
  firstName: '',
  lastName: '',
  _id: '',
  accessToken: '',
};
export const UserActions = ActionsFactory(USER_ACTIONS, initialState);
const login = createAsyncThunk(UserActions.login.type, async (loginDto: LoginDto) => await apis.user.userControllerLogin({ loginDto }));

export const loginThunk = createAsyncThunk(UserActions.login.type, async (loginDto: LoginDto, { extra }) => {
  const { api } = extra as { api: typeof apis };
  const response = await api.user.userControllerLogin({ loginDto }).toPromise();
  return response;
});
console.log(loginThunk);

const userReducer = createReducer(initialState, (builder) => builder.addCase(login.fulfilled, (state, action) => addItem('login')(state, action)));

// export const userSlice = createSlice({
//   name: USER_STATE_KEY,
//   initialState,
//   reducers: {
//     // login: loginThunk,
//   },
// });

// export const;
export { userReducer };
