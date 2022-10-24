import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { CreateUserConnectionDto, UserDto } from 'mediashare/rxjs-api';
import { makeActions } from 'mediashare/store/factory';
import { ApiService } from 'mediashare/store/apis';
import { reduceFulfilledState, reducePendingState, reduceRejectedState } from 'mediashare/store/helpers';

const userConnectionNamesActionNames = ['user_send_mail'] as const;
export const userConnectionActions = makeActions(userConnectionNamesActionNames);

export const sendEmail = createAsyncThunk(userConnectionActions.userSendMail.type, async ({ userId, email }: { userId: string; email: string }, { extra }) => {
  const { api } = extra as { api: ApiService };
  return await api.userConnection.userConnectionControllerSendEmail({ userId, email }).toPromise();
});

// Define these in snake case or our converter won't work... we need to fix that
const userConnectionsActionNames = ['load_user_connections'] as const;

export const userConnectionsActions = makeActions(userConnectionsActionNames);

export const loadUserConnections = createAsyncThunk(userConnectionsActions.loadUserConnections.type, async (opts = undefined, { extra }) => {
  const { api } = extra as { api: ApiService };
  return await api.user.userControllerGetUserConnections().toPromise();
});

export interface UserConnectionsState {
  entities: UserDto[];
  selected: UserDto[];
  loading: boolean;
  loaded: boolean;
}

export const userConnectionsInitialState: UserConnectionsState = {
  entities: [],
  selected: [],
  loading: false,
  loaded: false,
};

const userConnectionsSlice = createSlice({
  name: 'users',
  initialState: userConnectionsInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadUserConnections.pending, reducePendingState())
      .addCase(loadUserConnections.rejected, reduceRejectedState())
      .addCase(
        loadUserConnections.fulfilled,
        reduceFulfilledState((state, action) => ({
          ...state,
          entities: action.payload,
          loading: false,
          loaded: true,
        }))
      );
  },
});

export default userConnectionsSlice;
export const reducer = userConnectionsSlice.reducer;
