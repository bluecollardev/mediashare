import { createAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { makeActions } from 'mediashare/store/factory';
import { reduceFulfilledState, reducePendingState, reduceRejectedState } from 'mediashare/store/helpers';
import { ApiService } from 'mediashare/store/apis';
import { PlaylistResponseDto } from 'mediashare/rxjs-api';

// Define these in snake case or our converter won't work... we need to fix that
const playlistsActionNames = ['find_playlists', 'get_user_playlists', 'select_playlist', 'clear_playlists'] as const;

export const playlistsActions = makeActions(playlistsActionNames);

export const findUserPlaylists = createAsyncThunk(playlistsActions.findPlaylists.type, async (args: { text?: string; tags?: string[] }, { extra }) => {
  const { api } = extra as { api: ApiService };
  const { text, tags = [] } = args;
  console.log(`Search playlists args: ${JSON.stringify(args, null, 2)}`);
  console.log(`Searching playlists for: text -> [${text}, tags -> [${JSON.stringify(tags)}]`);
  return await api.playlists.playlistControllerFindAll({ text, tags }).toPromise();
});

export const getUserPlaylists = createAsyncThunk(playlistsActions.getUserPlaylists.type, async (opts = undefined, { extra }) => {
  const { api } = extra as { api: ApiService };
  return await api.playlists.playlistControllerFindAll({ text: '', tags: [] }).toPromise();
});

export const selectPlaylist = createAction<{ isChecked: boolean; plist: PlaylistResponseDto }, typeof playlistsActions.selectPlaylist.type>(
  playlistsActions.selectPlaylist.type
);

export const clearPlaylists = createAction(playlistsActions.clearPlaylists.type);

export interface PlaylistsState {
  entities: PlaylistResponseDto[];
  selected: PlaylistResponseDto[];
  loading: boolean;
  loaded: boolean;
}

export const playlistsInitialState: PlaylistsState = {
  entities: [],
  selected: [],
  loading: false,
  loaded: false,
};

const playlistsSlice = createSlice({
  name: 'playlists',
  initialState: playlistsInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserPlaylists.pending, reducePendingState())
      .addCase(getUserPlaylists.rejected, reduceRejectedState())
      .addCase(
        getUserPlaylists.fulfilled,
        reduceFulfilledState((state, action) => ({
          ...state,
          entities: action.payload,
          loading: false,
          loaded: true,
        }))
      )
      .addCase(findUserPlaylists.pending, reducePendingState())
      .addCase(findUserPlaylists.rejected, reduceRejectedState())
      .addCase(
        findUserPlaylists.fulfilled,
        reduceFulfilledState((state, action) => ({
          ...state,
          entities: action.payload,
          loading: false,
          loaded: true,
        }))
      )
      .addCase(selectPlaylist, (state, action) => {
        const updateSelection = (bool: boolean, item: PlaylistResponseDto) => {
          const { selected } = state;
          // @ts-ignore
          return bool ? selected.concat([item]) : selected.filter((plist) => plist._id !== item._id); // Is it filtered?
        };
        return { ...state, selected: updateSelection(action.payload.isChecked, action.payload.plist), loading: false, loaded: true };
      })
      .addCase(clearPlaylists, (state) => ({
        // TODO: Shouldn't we be clearing selected media items?
        ...state,
        selected: [],
        loading: false,
        loaded: true,
        // ...state, entities: [], loading: false, loaded: true
      }));
  },
});

export default playlistsSlice;
export const reducer = playlistsSlice.reducer;
