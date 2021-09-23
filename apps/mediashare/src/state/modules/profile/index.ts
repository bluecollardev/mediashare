import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ProfileDto } from '../../../api/models/profile-dto';
import { apis } from '../../apis';

interface InitialState {
  entity: ProfileDto;
}

const INITIAL_STATE: InitialState = {
  entity: null,
};

const loadProfile = createAsyncThunk('getUserById', async function ({ userId }: { userId?: string }) {
  console.log('🚀 ------------------------------------------------------------');
  console.log('🚀 ~ file: index.ts ~ line 14 ~ loadProfile ~ userId', userId);
  console.log('🚀 ------------------------------------------------------------');
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
