import { createAsyncThunk, createReducer } from '@reduxjs/toolkit';

import { makeActions, makeEnum } from '../../core/factory';
// import { UserDto } from '../../../api';
import { UserDto } from '../../../rxjs-api/models/UserDto';
import { apis } from '../../apis';

export const USERS_STATE_KEY = 'users';

export interface UsersState {
  entities: UserDto[];
  loading: boolean;
}

// We don't define any 'get' actions as they don't update state - use redux selectors instead
const USERS_ACTIONS = ['LOAD_USERS', 'ADD_USER', 'ADD_USERS', 'REMOVE_USER', 'REMOVE_USERS'] as const;
export const ActionTypes = makeEnum(USERS_ACTIONS);
export const UsersActions = makeActions(USERS_ACTIONS);
export const loadUsers = createAsyncThunk(ActionTypes.loadUsers, async () => {
  const users = await apis.users.usersControllerFindAll().toPromise();
  return users;
});

const initialState: UsersState = {
  entities: [],
  loading: false,
};

export const usersReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loadUsers.fulfilled, (state, action) => {
      return { ...state, entities: action.payload };
    })
    .addCase(loadUsers.rejected, (state) => {
      return { ...state };
    })
    .addCase(loadUsers.pending, (state) => ({ ...state }));
  // .addCase(UsersActions.loadUsers, genericListReducers.addItems(USERS_STATE_KEY))
  // .addCase(UsersActions.addUser, genericListReducers.addItems(USERS_STATE_KEY))
  // .addCase(UsersActions.addUsers, genericListReducers.addItems(USERS_STATE_KEY))
  // .addCase(UsersActions.removeUser, genericListReducers.removeItem(USERS_STATE_KEY))
  // .addCase(UsersActions.removeUsers, genericListReducers.removeItem(USERS_STATE_KEY))
});
