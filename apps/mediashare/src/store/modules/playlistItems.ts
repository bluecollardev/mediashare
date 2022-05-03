// TODO: This ISN'T COMPLETED OR WORKING!
//  PLAYLIST ITEMS WILL BE REQUIRED FOR SORTING!
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { makeActions } from 'mediashare/store/factory';
import { reduceFulfilledState, reducePendingState, reduceRejectedState } from 'mediashare/store/helpers';
import { ApiService } from 'mediashare/store/apis';
import { CreatePlaylistDto, UpdatePlaylistDto, PlaylistItemResponseDto } from 'mediashare/rxjs-api';

// Define these in snake case or our converter won't work... we need to fix that
const playlistItemActionNames = [
  'add_user_playlist_item',
  'update_user_playlist_item',
  'remove_user_playlist_item'
] as const;

export const playlistItemActions = makeActions(playlistItemActionNames);

export const addUserPlaylistItem = createAsyncThunk(playlistItemActions.addUserPlaylistItem.type, async (playlist: CreatePlaylistDto, { extra }) => {
  const { api } = extra as { api: ApiService };
  // TODO: playlistControllerCreateItem does not exist!
  // @ts-ignore
  const response = await api.playlists.playlistControllerCreateItem({ createPlaylistDto: playlist }).toPromise();
  return response.userPlaylists;
});

export const updateUserPlaylistItem = createAsyncThunk(playlistItemActions.updateUserPlaylistItem.type, async (playlist: UpdatePlaylistDto, { extra }) => {
  const { api } = extra as { api: ApiService };
  return await api.playlists.playlistControllerUpdate({ playlistId: playlist._id, updatePlaylistDto: playlist }).toPromise();
});

export interface PlaylistItemsInitialState {
  // entities: PlaylistResponseDto[] | PlaylistItemResponseDto[];
  // selected: PlaylistResponseDto[] | PlaylistItemResponseDto[];
  entities: PlaylistItemResponseDto[];
  selected: PlaylistItemResponseDto[];
  loading: boolean;
  loaded: boolean;
}

export const playlistsItemsInitialState: PlaylistItemsInitialState = {
  entities: [],
  selected: [],
  loading: false,
  loaded: false,
};

const playlistItemsSlice = createSlice({
  name: 'playlistItems',
  initialState: playlistsItemsInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addUserPlaylistItem.pending, reducePendingState())
      .addCase(addUserPlaylistItem.rejected, reduceRejectedState())
      .addCase(addUserPlaylistItem.fulfilled, reduceFulfilledState())
      .addCase(updateUserPlaylistItem.pending, reducePendingState())
      .addCase(updateUserPlaylistItem.rejected, reduceRejectedState())
      .addCase(updateUserPlaylistItem.fulfilled, reduceFulfilledState())
  }
});

export default playlistItemsSlice;
export const reducer = playlistItemsSlice.reducer;
