import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { makeActions } from 'mediashare/store/factory';
import { ApiService } from 'mediashare/store/apis';
import { ProfileDto } from 'mediashare/rxjs-api';

// Define these in snake case or our converter won't work... we need to fix that
const profileActionNames = [
  'get_user_by_id',
] as const;

export const profileActions = makeActions(profileActionNames);

export const loadProfile = createAsyncThunk(profileActions.getUserById.type, async (userId: string | undefined, { extra  }) => {
  const { api } = extra as { api: ApiService };
  return userId ?
    await api.users.usersControllerFindOne({ userId }).toPromise() :
    await api.user.userControllerGetUser().toPromise();
});

interface ProfileState {
  entity: Partial<ProfileDto>;
  loading: boolean;
  loaded: boolean;
}

export const profileInitialState: ProfileState = {
  entity: {
    sharedItems: [],
  } as Partial<ProfileDto>,
  loading: false,
  loaded: false,
};

const profileSlice = createSlice({
  name: 'profile',
  initialState: profileInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadProfile.fulfilled, (state, action) => ({
        ...state, entity: action.payload, loading: false, loaded: true
      }));
  },
});

export default profileSlice;
export const reducer = profileSlice.reducer;
