import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { makeActions } from 'mediashare/store/factory';
import { reducePendingState, reduceRejectedState, reduceFulfilledState } from 'mediashare/store/helpers';
import { ApiService } from 'mediashare/store/apis';
import { UserDto } from 'mediashare/rxjs-api';

// Define these in snake case or our converter won't work... we need to fix that
const usersActionNames = ['load_users'] as const;

export const usersActions = makeActions(usersActionNames);

export const loadUsers = createAsyncThunk(usersActions.loadUsers.type, async (opts = undefined, { extra }) => {
  const { api } = extra as { api: ApiService };
  return await api.users.usersControllerFindAll().toPromise();
});

export interface UsersState {
  entities: UserDto[];
  selected: UserDto[];
  loading: boolean;
  loaded: boolean;
}

export const usersInitialState: UsersState = {
  entities: [],
  selected: [],
  loading: false,
  loaded: false,
};

const usersSlice = createSlice({
  name: 'users',
  initialState: usersInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadUsers.pending, reducePendingState())
      .addCase(loadUsers.rejected, reduceRejectedState())
      .addCase(
        loadUsers.fulfilled,
        reduceFulfilledState((state, action) => ({
          ...state,
          entities: action.payload,
          loading: false,
          loaded: true,
        }))
      );
  },
});

export default usersSlice;
export const reducer = usersSlice.reducer;
