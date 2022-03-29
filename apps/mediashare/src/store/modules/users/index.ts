import { createAsyncThunk, createReducer } from '@reduxjs/toolkit';

import { makeEnum } from '@app/store/core/factory';
import { UserDto } from '@app/rxjs-api';
import { apis } from '@app/store/apis';

import { reducePendingState, reduceRejectedState } from '@app/store/helpers';

export interface UsersState {
  entities: UserDto[];
  loading: boolean;
}

// We don't define any 'get' actions as they don't update state - use redux selectors instead
const USERS_ACTIONS = ['LOAD_USERS', 'ADD_USER', 'ADD_USERS', 'REMOVE_USER', 'REMOVE_USERS'] as const;
export const ActionTypes = makeEnum(USERS_ACTIONS);
export const loadUsers = createAsyncThunk(ActionTypes.loadUsers, async () => {
  return await apis.users.usersControllerFindAll().toPromise();
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
    .addCase(loadUsers.rejected, reduceRejectedState())
    .addCase(loadUsers.pending, reducePendingState());
});
