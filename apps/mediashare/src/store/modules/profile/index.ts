import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { ProfileDto } from '../../../rxjs-api';
import { apis } from '../../apis';

interface InitialState {
  entity: Partial<ProfileDto>;
}

const INITIAL_STATE: InitialState = {
  entity: {
    sharedItems: [],
  } as Partial<ProfileDto>,
};

const loadProfile = createAsyncThunk('getUserById', async function ({ userId }: { userId?: string }) {
  const req = userId ? apis.users.usersControllerFindOne({ userId }) : apis.user.userControllerGetUser();
  return await req.toPromise();
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
