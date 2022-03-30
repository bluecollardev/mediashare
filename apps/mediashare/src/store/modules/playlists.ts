import { createAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { makeActions } from 'mediashare/store/factory';
import { ApiService } from 'mediashare/store/apis';
import { PlaylistResponseDto, PlaylistItemResponseDto } from 'mediashare/rxjs-api';
import { reduceFulfilledState, reducePendingState, reduceRejectedState } from 'mediashare/store/helpers';

const playlistsActionNames = [
  'find_playlists',
  'get_user_playlists',
  'select_playlist',
] as const;

export const playlistsActionTypes = makeActions(playlistsActionNames);

export const clearPlaylistAction = createAction('clearPlaylist');
export const selectPlaylistAction = createAction<{ isChecked: boolean; plist: PlaylistResponseDto }, typeof playlistsActionTypes.selectPlaylist.type>(
  playlistsActionTypes.selectPlaylist.type
);

export const findPlaylists = createAsyncThunk(playlistsActionTypes.findPlaylists.type, async (args: { text?: string; tags?: string[] }, { extra }) => {
  const { api } = extra as { api: ApiService };
  const { text, tags = [] } = args;
  console.log(`Search args: ${JSON.stringify(args, null, 2)}`);
  console.log(`Searching playlists for: [text] ${text}, [tags] ${JSON.stringify(tags)}`);
  return await api.playlists.playlistControllerFindAll({ text, tags }).toPromise();
});

export const getUserPlaylists = createAsyncThunk(playlistsActionTypes.getUserPlaylists.type, async (opts: {} | undefined, { extra }) => {
  const { api } = extra as { api: ApiService };
  return await api.user.userControllerGetUserPlaylists().toPromise();
});

export interface PlaylistsInitialState {
  selected: PlaylistResponseDto[] | PlaylistItemResponseDto[];
  entities: PlaylistResponseDto[] | PlaylistItemResponseDto[];
  loading: boolean;
  loaded: boolean;
}

export const PLAYLISTS_INITIAL_STATE: PlaylistsInitialState = {
  entities: [],
  selected: [],
  loading: false,
  loaded: false,
};

const playlistsSlice = createSlice({
  name: 'playlists',
  initialState: PLAYLISTS_INITIAL_STATE,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserPlaylists.pending, reducePendingState())
      .addCase(getUserPlaylists.rejected, reduceRejectedState())
      .addCase(getUserPlaylists.fulfilled, reduceFulfilledState((state, action) => {
        return { ...state, entities: action.payload, loading: false, loaded: true };
      }))
      .addCase(findPlaylists.pending, reducePendingState())
      .addCase(findPlaylists.rejected, reduceRejectedState())
      .addCase(findPlaylists.fulfilled, reduceFulfilledState((state, action) => {
        return { ...state, entities: action.payload, loading: false, loaded: true };
      }))
      .addCase(selectPlaylistAction, (state, action) => {
        const updateSelection = function (bool: boolean, item: PlaylistResponseDto) {
          const { selected } = state;
          // Is it filtered?
          // @ts-ignore
          return bool ? selected.concat([item]) : selected.filter((plist) => plist._id !== item._id);
        };
        return { ...state, selected: updateSelection(action.payload.isChecked, action.payload.plist) };
      });
  },
});

export default playlistsSlice;
export const reducer = playlistsSlice.reducer;
