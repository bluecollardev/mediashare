import { createAsyncThunk, createReducer } from '@reduxjs/toolkit';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { makeActions, makeEnum } from '../../core/factory';

import * as reducers from '../../core/reducers';
import { ApiService } from '../../apis';
import { CreatePlaylistDto, OperationOpts, UpdatePlaylistDto } from '../../../api';

const PLAYLIST_ACTIONS = ['GET_USER_PLAYLIST', 'ADD_USER_PLAYLIST', 'UPDATE_USER_PLAYLIST', 'SHARE_USER_PLAYLIST', 'REMOVE_USER_PLAYLIST'] as const;
const PLAYLISTS_ACTIONS = ['FIND_USER_PLAYLISTS'] as const;
const PLAYLIST_ITEM_ACTIONS = ['ADD_USER_PLAYLIST_ITEM', 'UPDATE_USER_PLAYLIST_ITEM', 'REMOVE_USER_PLAYLIST_ITEM'] as const;

export const playlistActionTypes = makeEnum(PLAYLIST_ACTIONS);
export const playlistsActionTypes = makeEnum(PLAYLISTS_ACTIONS);
export const playlistItemActionTypes = makeEnum(PLAYLIST_ITEM_ACTIONS);

/* const [playlistActions, playlistsActions, playlistItemActions] = [
  makeActions(PLAYLIST_ACTIONS),
  makeActions(PLAYLISTS_ACTIONS),
  makeActions(PLAYLIST_ITEM_ACTIONS),
]; */

export const getUserPlaylistById = createAsyncThunk(playlistActionTypes.getUserPlaylist, async (id: string, { extra }) => {
  const { api } = extra as { api: ApiService };
  const response = api.playlists.playlistControllerFindOne({ playlistId: id }).toPromise();
  return response;
});

export const addUserPlaylist = createAsyncThunk(playlistActionTypes.addUserPlaylist, async (playlist: CreatePlaylistDto, { extra }) => {
  const { api } = extra as { api: ApiService };
  const response = api.playlists.playlistControllerCreate({ createPlaylistDto: playlist }).toPromise();
  return response;
});

export const updateUserPlaylist = createAsyncThunk(playlistActionTypes.updateUserPlaylist, async (playlist: UpdatePlaylistDto, { extra }) => {
  const { api } = extra as { api: ApiService };
  // @ts-ignore - TODO: Fix _id property on UpdatePlaylistDto!
  const response = api.playlists.playlistControllerUpdate({ playlistId: playlist._id, updatePlaylistDto: playlist }).toPromise();
  return response;
});

export const shareUserPlaylist = createAsyncThunk(playlistActionTypes.shareUserPlaylist, async (playlist: CreatePlaylistDto, { extra }) => {
  const { api } = extra as { api: ApiService };
  const response = api.playlists.playlistControllerCreate({ createPlaylistDto: playlist }).toPromise();
  return response;
});

export const removeUserPlaylist = createAsyncThunk(playlistActionTypes.removeUserPlaylist, async (id: string, { extra }) => {
  const { api } = extra as { api: ApiService };
  const response = api.playlists.playlistControllerRemove({ playlistId: id }).toPromise();
  return response;
});

export const findUserPlaylists = createAsyncThunk(playlistsActionTypes.findUserPlaylists, async (opts: OperationOpts | undefined, { extra }) => {
  const { api } = extra as { api: ApiService };
  // @ts-ignore - TODO: Add playlistControllerFindAll to API service!
  const response = api.playlists.playlistControllerFindAll(opts).toPromise();
  return response;
});

export const addUserPlaylistItem = createAsyncThunk(playlistItemActionTypes.addUserPlaylistItem, async (playlist: CreatePlaylistDto, { extra }) => {
  const { api } = extra as { api: ApiService };
  // @ts-ignore - TODO: Add playlistControllerCreateItem to API service!
  const response = api.playlists.playlistControllerCreateItem({ createPlaylistDto: playlist }).toPromise();
  return response;
});

export const updateUserPlaylistItem = createAsyncThunk(playlistItemActionTypes.updateUserPlaylistItem, async (playlist: UpdatePlaylistDto, { extra }) => {
  const { api } = extra as { api: ApiService };
  // @ts-ignore - TODO: Fix _id property on DTO! | TODO: Add playlistControllerUpdateItem to API service!
  const response = api.playlists.playlistControllerUpdateItem({ playlistId: playlist._id, updatePlaylistDto: playlist }).toPromise();
  return response;
});

export const removeUserPlaylistItem = createAsyncThunk(playlistItemActionTypes.removeUserPlaylistItem, async (id: string, { extra }) => {
  const { api } = extra as { api: ApiService };
  // @ts-ignore - TODO: Add playlistControllerRemoveItem to API service!
  const response = api.playlists.playlistControllerRemoveItem({ playlistId: id }).toPromise();
  return response;
});

const initialState = {};

export const USER_PLAYLISTS_STATE_KEY = 'userPlaylists';

const playlistReducer = createReducer(
  initialState,
  (builder) =>
    builder
      .addCase(getUserPlaylistById.fulfilled, reducers.addItem(USER_PLAYLISTS_STATE_KEY))
      .addCase(addUserPlaylist.fulfilled, reducers.addItem(USER_PLAYLISTS_STATE_KEY))
      .addCase(updateUserPlaylist.fulfilled, reducers.updateItem(USER_PLAYLISTS_STATE_KEY))
  // .addCase(shareUserPlaylist.fulfilled, reducers.updateItem(USER_PLAYLISTS_STATE_KEY))
  // .addCase(removeUserPlaylist.fulfilled, reducers.removeItem(USER_PLAYLISTS_STATE_KEY))
);

const playlistsReducer = createReducer(
  initialState, (builder) =>
    builder
      .addCase(findUserPlaylists.fulfilled, reducers.loadItems(USER_PLAYLISTS_STATE_KEY)));

const playlistItemsReducer = createReducer(
  initialState,
  (builder) =>
    builder
      .addCase(addUserPlaylistItem.fulfilled, reducers.addItem(USER_PLAYLISTS_STATE_KEY))
      .addCase(updateUserPlaylistItem.fulfilled, reducers.updateItem(USER_PLAYLISTS_STATE_KEY))
  // .addCase(removeUserPlaylistItem.fulfilled, reducers.removeItem(USER_PLAYLISTS_STATE_KEY))
);

export { playlistReducer, playlistsReducer, playlistItemsReducer };
