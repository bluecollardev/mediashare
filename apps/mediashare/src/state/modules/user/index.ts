import { createAction, createAsyncThunk, createReducer, createSlice } from '@reduxjs/toolkit';

import { ActionsFactory, withPayloadType } from '../../core/factory';
import { LoginResponseDto } from '../../../api/models/login-response-dto';
import { LoginDto } from '../../../api/models/login-dto';
import { apis, ApiService } from '../../apis';
import { addItem } from '../../core/reducers';
import { Auth } from 'aws-amplify';

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
// const login = createAsyncThunk(UserActions.login.type, async (loginDto: LoginDto) => await apis.user.userControllerLogin({ loginDto }));

const userReducer = createReducer(initialState, (builder) =>
  builder.addCase(UserActions.login, (state, action) => {
    console.log(action);
    return action.payload;
  })
);
// export const;
export { userReducer };
