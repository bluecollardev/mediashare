import { ActionReducerMapBuilder, createAsyncThunk, createReducer } from '@reduxjs/toolkit';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { makeActions, makeEnum } from '../../core/factory';

import * as reducers from '../../core/reducers';
import { ApiService } from '../../apis';
import { CreatePlaylistDto, PlaylistItemResponseDto, UpdatePlaylistDto } from '../../../api';
import { apis } from '../../apis';
import { PlaylistResponseDto } from '../../../api/models/playlist-response-dto';
import { CreatePlaylistDtoCategoryEnum } from '../../../api/models/create-playlist-dto';

const PLAYLIST_ACTIONS = ['GET_USER_PLAYLIST', 'ADD_USER_PLAYLIST', 'UPDATE_USER_PLAYLIST', 'SHARE_USER_PLAYLIST', 'REMOVE_USER_PLAYLIST'] as const;
const PLAYLISTS_ACTIONS = ['FIND_USER_PLAYLISTS'] as const;
const PLAYLIST_ITEM_ACTIONS = ['ADD_USER_PLAYLIST_ITEM', 'UPDATE_USER_PLAYLIST_ITEM', 'REMOVE_USER_PLAYLIST_ITEM'] as const;

export const playlistActionTypes = makeEnum(PLAYLIST_ACTIONS);
export const playlistsActionTypes = makeEnum(PLAYLISTS_ACTIONS);
export const playlistItemActionTypes = makeEnum(PLAYLIST_ITEM_ACTIONS);

export const getUserPlaylistById = createAsyncThunk(playlistActionTypes.getUserPlaylist, async (id: string, { extra }) => {
  const { api } = extra as { api: ApiService };
  const response = await api.playlists.playlistControllerFindOne({ playlistId: id }).toPromise();
  return response;
});

export const addUserPlaylist = createAsyncThunk(playlistActionTypes.addUserPlaylist, async (playlist: CreatePlaylistDto, { extra }) => {
  const { api } = extra as { api: ApiService };
  const response = await api.playlists.playlistControllerCreate({ createPlaylistDto: playlist }).toPromise();
  return response;
});

export const updateUserPlaylist = createAsyncThunk(playlistActionTypes.updateUserPlaylist, async (playlist: UpdatePlaylistDto, { extra }) => {
  const { api } = extra as { api: ApiService };
  // @ts-ignore - TODO: Fix _id property on UpdatePlaylistDto!
  const response = await api.playlists.playlistControllerUpdate({ playlistId: playlist._id, updatePlaylistDto: playlist }).toPromise();
  return response;
});

export const shareUserPlaylist = createAsyncThunk(playlistActionTypes.shareUserPlaylist, async (playlist: CreatePlaylistDto, { extra }) => {
  const { api } = extra as { api: ApiService };
  const response = await api.playlists.playlistControllerCreate({ createPlaylistDto: playlist }).toPromise();
  return response;
});

export const removeUserPlaylist = createAsyncThunk(playlistActionTypes.removeUserPlaylist, async (id: string, { extra }) => {
  const { api } = extra as { api: ApiService };
  const response = await api.playlists.playlistControllerRemove({ playlistId: id }).toPromise();
  return response;
});

export const findUserPlaylists = createAsyncThunk(playlistsActionTypes.findUserPlaylists, async (opts: {} | undefined, { extra }) => {
  console.log('finding user playlist');
  // @ts-ignore
  const response = await apis.user.userControllerGetUserPlaylists().toPromise();
  return response;
});

export const addUserPlaylistItem = createAsyncThunk(playlistItemActionTypes.addUserPlaylistItem, async (playlist: CreatePlaylistDto, { extra }) => {
  const { api } = extra as { api: ApiService };
  // @ts-ignore
  const response = await api.playlists.playlistControllerCreateItem({ createPlaylistDto: playlist }).toPromise();
  return response.userPlaylists;
});

export const updateUserPlaylistItem = createAsyncThunk(playlistItemActionTypes.updateUserPlaylistItem, async (playlist: UpdatePlaylistDto) => {
  // @ts-ignore - TODO: Fix _id property on DTO! | TODO: Add playlistControllerUpdateItem to API service!
  const response = await apis.playlists.playlistControllerUpdateItem({ playlistId: playlist._id, updatePlaylistDto: playlist });
  return response && response.status === 200 ? response.data : undefined;
});

export const removeUserPlaylistItem = createAsyncThunk(playlistItemActionTypes.removeUserPlaylistItem, async (id: string, { extra }) => {
  const { api } = extra as { api: ApiService };
  // @ts-ignore - TODO: Add playlistControllerRemoveItem to API service!
  const response = await api.playlists.playlistControllerRemoveItem({ playlistId: id });
  return response && response.status === 200 ? response.data : undefined;
});

const initialState: { userPlaylists: PlaylistItemResponseDto[]; loading: boolean } = {
  userPlaylists: [],
  loading: false,
};

export const USER_PLAYLISTS_STATE_KEY = 'userPlaylists';
const initialPlaylistState: { createPlaylist: CreatePlaylistDto; loading: boolean } = {
  loading: false,
  createPlaylist: {
    createdBy: '',
    category: CreatePlaylistDtoCategoryEnum.Builder,
    title: '',
    description: '',
    mediaIds: [],
  },
};

const playlistReducer = createReducer(
  initialPlaylistState,
  (builder) => {}
  builder.addCase(findUserPlaylists.fulfilled, (state, action) => {
    state.userPlaylists = action.payload;
  })
  // .addCase(addUserPlaylist.fulfilled, reducers.addItem(USER_PLAYLISTS_STATE_KEY))
  // .addCase(updateUserPlaylist.fulfilled, reducers.updateItem(USER_PLAYLISTS_STATE_KEY))
  // .addCase(shareUserPlaylist.fulfilled, reducers.updateItem(USER_PLAYLISTS_STATE_KEY))
  // .addCase(removeUserPlaylist.fulfilled, reducers.removeItem(USER_PLAYLISTS_STATE_KEY))
);

const playlistsReducer = createReducer(initialState, (builder) => {
  builder.addCase(addUserPlaylistItem.pending, (state, action) => {
    return { userPlaylists: action.payload, loading: true };
  });
  builder.addCase(addUserPlaylistItem.fulfilled, (state, action) => {
    return { userPlaylists: action.payload, loading: false };
  });
});

const playlistItemsReducer = createReducer(
  initialState,
  (builder) =>
    builder
      .addCase(addUserPlaylistItem.fulfilled, reducers.addItem(USER_PLAYLISTS_STATE_KEY))
      .addCase(updateUserPlaylistItem.fulfilled, reducers.updateItem(USER_PLAYLISTS_STATE_KEY))
  // .addCase(removeUserPlaylistItem.fulfilled, reducers.removeItem(USER_PLAYLISTS_STATE_KEY))
);

export { playlistReducer, playlistsReducer, playlistItemsReducer };
