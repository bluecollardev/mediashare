import { createAsyncThunk, createReducer } from '@reduxjs/toolkit';

import { makeActions } from 'mediashare/store/factory';
import { UserDto } from 'mediashare/rxjs-api';
import { apis } from 'mediashare/store/apis';

import { reducePendingState, reduceRejectedState } from 'mediashare/store/helpers';

export interface UsersState {
  entities: UserDto[];
  loading: boolean;
}

// We don't define any 'get' actions as they don't update state - use redux selectors instead
const usersActionNames = [
  'load_users'
] as const;

export const ActionTypes = makeActions(usersActionNames);
export const loadUsers = createAsyncThunk(ActionTypes.loadUsers.type, async () => {
  return await apis.users.usersControllerFindAll().toPromise();
});

const initialState: UsersState = {
  entities: [],
  loading: false,
};

export const usersReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loadUsers.fulfilled, (state, action) => ({
      ...state, entities: action.payload
    }))
    .addCase(loadUsers.rejected, reduceRejectedState())
    .addCase(loadUsers.pending, reducePendingState());
});
