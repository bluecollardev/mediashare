import { createAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { makeActions } from 'mediashare/store/factory';
import { ApiService } from 'mediashare/store/apis';
import { CreatePlaylistDto, UpdatePlaylistDto, CreatePlaylistResponseDto, PlaylistResponseDto, PlaylistItemResponseDto } from 'mediashare/rxjs-api';
// import { reduceFulfilledState, reducePendingState, reduceRejectedState } from 'mediashare/store/helpers';

const playlistItemActionNames = ['add_user_playlist_item', 'update_user_playlist_item', 'remove_user_playlist_item'] as const;

export const playlistItemActionTypes = makeActions(playlistItemActionNames);

export const clearPlaylistAction = createAction('clearPlaylist');

export const addUserPlaylistItem = createAsyncThunk(playlistItemActionTypes.addUserPlaylistItem.type, async (playlist: CreatePlaylistDto, { extra }) => {
  const { api } = extra as { api: ApiService };
  // TODO: playlistControllerCreateItem does not exist!
  // @ts-ignore
  const response = await api.playlists.playlistControllerCreateItem({ createPlaylistDto: playlist }).toPromise();
  return response.userPlaylists;
});

export const updateUserPlaylistItem = createAsyncThunk(playlistItemActionTypes.updateUserPlaylistItem.type, async (playlist: UpdatePlaylistDto, { extra }) => {
  const { api } = extra as { api: ApiService };
  return await api.playlists
    .playlistControllerUpdate({
      playlistId: playlist._id,
      updatePlaylistDto: playlist,
    })
    .toPromise();
});

export interface PlaylistItemsInitialState {
  created: CreatePlaylistResponseDto | undefined;
  selected: PlaylistResponseDto | undefined;
  loading: boolean;
  loaded: boolean;
}

export const PLAYLIST_ITEMS_INITIAL_STATE: PlaylistItemsInitialState = {
  created: undefined,
  selected: undefined,
  loading: false,
  loaded: false,
};

const playlistItemsSlice = createSlice({
  name: 'playlistItems',
  initialState: PLAYLIST_ITEMS_INITIAL_STATE,
  reducers: {},
  extraReducers: (builder) => {}
});

export default playlistItemsSlice;
export const reducer = playlistItemsSlice.reducer;
