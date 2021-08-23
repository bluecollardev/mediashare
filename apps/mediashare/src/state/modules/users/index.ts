import { createAsyncThunk, createReducer } from '@reduxjs/toolkit';
import { apis } from '../../apis';

import { makeActions, makeEnum } from '../../core/factory';
// import { UserDto } from '../../../api';

import * as genericListReducers from '../../core/reducers';
import { UserActions } from '../user';

export const USERS_STATE_KEY = 'users';

export interface UsersState {}

// We don't define any 'get' actions as they don't update state - use redux selectors instead
const USERS_ACTIONS = ['LOAD_USERS', 'ADD_USER', 'ADD_USERS', 'REMOVE_USER', 'REMOVE_USERS'] as const;
export const ActionTypes = makeEnum(USERS_ACTIONS);
export const UsersActions = makeActions(USERS_ACTIONS);

const initialState: UsersState = {};

export const createUser = createAsyncThunk('createUser', async (username: string) => {
  console.log(username);
  const user = await apis.users.usersControllerCreate({ createUserDto: { username } }).toPromise();
  console.log('user', user);
});
export const usersReducer = createReducer(
  initialState,
  (builder) =>
    builder.addCase(createUser.fulfilled, (state, action) => {
      return { ...state };
    })
  // .addCase(UsersActions.loadUsers, genericListReducers.addItems(USERS_STATE_KEY))
  // .addCase(UsersActions.addUser, genericListReducers.addItems(USERS_STATE_KEY))
  // .addCase(UsersActions.addUsers, genericListReducers.addItems(USERS_STATE_KEY))
  // .addCase(UsersActions.removeUser, genericListReducers.removeItem(USERS_STATE_KEY))
  // .addCase(UsersActions.removeUsers, genericListReducers.removeItem(USERS_STATE_KEY))
);
