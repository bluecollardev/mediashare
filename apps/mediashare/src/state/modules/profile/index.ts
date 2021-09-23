import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ProfileDto } from '../../../api/models/profile-dto';
import { apis } from '../../apis';

interface InitialState {
  entity: ProfileDto;
}

const INITIAL_STATE: InitialState = {
  entity: null,
};

const getUserById = createAsyncThunk('getUserById', async function ({ userId }: { userId: string }) {
  const user = await apis.users.usersControllerFindOne({ userId }).toPromise();
  return user;
});

const profileSlice = createSlice({
  name: 'profile',
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUserById.fulfilled, (state, action) => {
      return { ...state, entity: action.payload };
    });
  },
});

const { reducer } = profileSlice;

export { reducer, getUserById };
