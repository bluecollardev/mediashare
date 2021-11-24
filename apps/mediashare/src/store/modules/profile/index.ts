import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { ProfileDto } from '../../../rxjs-api';
import { ApiService } from '../../apis';

interface InitialState {
  entity: Partial<ProfileDto>;
}

const INITIAL_STATE: InitialState = {
  entity: {
    sharedItems: [],
  } as Partial<ProfileDto>,
};

// @ts-ignore
const loadProfile = createAsyncThunk('getUserById', async (userId?: string, { extra }) => {
  const { api } = extra as { api: ApiService };
  return userId ? await api.users.usersControllerFindOne({ userId }).toPromise() : await api.user.userControllerGetUser().toPromise();
});

const profileSlice = createSlice({
  name: 'profile',
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loadProfile.fulfilled, (state, action) => {
      return { ...state, entity: action.payload };
    });
  },
});

const { reducer } = profileSlice;
export { reducer, loadProfile };
