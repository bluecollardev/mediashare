import { createAction, createAsyncThunk, createReducer } from '@reduxjs/toolkit';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { makeEnum } from '../../core/factory';

import { apis, ApiService } from '../../apis';
import { CreatePlaylistDto, UpdatePlaylistDto } from '../../../api';
import { CreatePlaylistResponseDto } from '../../../api/models/create-playlist-response-dto';
import { PlaylistResponseDto } from '../../../rxjs-api/models/PlaylistResponseDto';
import { flattenDeep } from 'remeda';
import { merge } from 'rxjs';
import { useDispatch } from 'react-redux';
import { loading } from '../app-state';

const PLAYLIST_ACTIONS = [
  'GET_USER_PLAYLIST',
  'ADD_USER_PLAYLIST',
  'UPDATE_USER_PLAYLIST',
  'SHARE_USER_PLAYLIST',
  'REMOVE_USER_PLAYLIST',
  'CLEAR_USER_PLAYLIST',
  'GET_PLAYLIST_BY_ID',
] as const;
const PLAYLISTS_ACTIONS = ['FIND_USER_PLAYLISTS', 'SELECT_PLAYLIST'] as const;
const PLAYLIST_ITEM_ACTIONS = ['ADD_USER_PLAYLIST_ITEM', 'UPDATE_USER_PLAYLIST_ITEM', 'REMOVE_USER_PLAYLIST_ITEM'] as const;

export const playlistActionTypes = makeEnum(PLAYLIST_ACTIONS);
export const playlistsActionTypes = makeEnum(PLAYLISTS_ACTIONS);
export const playlistItemActionTypes = makeEnum(PLAYLIST_ITEM_ACTIONS);

export const clearPlaylistAction = createAction('clearPlaylist');
export const selectPlaylistAction = createAction<{ isChecked: boolean; plist: PlaylistResponseDto }, typeof playlistsActionTypes.selectPlaylist>(
  playlistsActionTypes.selectPlaylist
);
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
  const response = await api.playlists
    .playlistControllerUpdate({
      playlistId: playlist._id,
      updatePlaylistDto: playlist,
    })
    .toPromise();
  return response;
});

export const shareUserPlaylist = createAsyncThunk(
  playlistActionTypes.shareUserPlaylist,
  async ({ userIds, playlistIds }: { userIds: string[]; playlistIds: string[] }, { extra }) => {
    const { api } = extra as { api: ApiService };
    const prom = ({ playlistId, userId }) => api.playlists.playlistControllerShare({ playlistId, userId });
    const promises = userIds.map((userId) => playlistIds.map((playlistId) => prom({ userId, playlistId })));
    const flat = flattenDeep(promises);
    const res = await merge(...flat).toPromise();

    return res;
  }
);

export const removeUserPlaylist = createAsyncThunk(playlistActionTypes.removeUserPlaylist, async (id: string, { extra }) => {
  const { api } = extra as { api: ApiService };
  const response = await api.playlists.playlistControllerRemove({ playlistId: id }).toPromise();
  return response;
});

export const findUserPlaylists = createAsyncThunk(playlistsActionTypes.findUserPlaylists, async (opts: {} | undefined, { extra }) => {
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
  const response = await apis.playlists.playlistControllerUpdate({
    playlistId: playlist._id,
    updatePlaylistDto: playlist,
  });
  return response;
});

export const removeUserPlaylistItem = createAsyncThunk(playlistItemActionTypes.removeUserPlaylistItem, async (id: string, { extra }) => {
  const { api } = extra as { api: ApiService };
  // @ts-ignore - TODO: Add playlistControllerRemoveItem to API service!
  const response = await api.playlists.playlistControllerRemoveItem({ playlistId: id });
  return response && response.status === 200 ? response.data : undefined;
});

export const getPlaylistById = createAsyncThunk('getPlaylistById', async (id: string, { extra }) => {
  const { api } = extra as { api: ApiService };
  // @ts-ignore - TODO: Add playlistControllerRemoveItem to API service!
  const response = await api.playlists.playlistControllerFindOne({ playlistId: id }).toPromise();

  return response;
});

const initialState: { selectedPlaylists: PlaylistResponseDto[]; userPlaylists: PlaylistResponseDto[]; loading: boolean; loaded: boolean } = {
  userPlaylists: [],
  selectedPlaylists: [],
  loading: false,
  loaded: false,
};

export const USER_PLAYLISTS_STATE_KEY = 'userPlaylists';
const initialPlaylistState: { createdPlaylist: CreatePlaylistResponseDto; loading: boolean; selectedPlaylist: PlaylistResponseDto } = {
  loading: false,
  createdPlaylist: null,
  selectedPlaylist: null,
};

const playlistReducer = createReducer(initialPlaylistState, (builder) => {
  builder
    .addCase(addUserPlaylist.pending, (state) => {
      return { ...state, loading: true };
    })
    .addCase(addUserPlaylist.fulfilled, (state, action) => {
      return { ...state, createdPlaylist: action.payload, loading: false };
    })

    .addCase(clearPlaylistAction, (state) => {
      return { ...state, createdPlaylist: null };
    })
    .addCase(getPlaylistById.pending, (state) => {
      return { ...state, selectedPlaylist: null, loading: true };
    })
    .addCase(getPlaylistById.rejected, (state) => {
      return { ...state, loading: false };
    })
    .addCase(getPlaylistById.fulfilled, (state, action) => {
      return { ...state, selectedPlaylist: action.payload, loading: false };
    });
});
// .addCase(addUserPlaylist.fulfilled, reducers.addItem(USER_PLAYLISTS_STATE_KEY))
// .addCase(updateUserPlaylist.fulfilled, reducers.updateItem(USER_PLAYLISTS_STATE_KEY))
// .addCase(shareUserPlaylist.fulfilled, reducers.updateItem(USER_PLAYLISTS_STATE_KEY))
// .addCase(removeUserPlaylist.fulfilled, reducers.removeItem(USER_PLAYLISTS_STATE_KEY))

const playlistsReducer = createReducer(initialState, (builder) => {
  builder.addCase(findUserPlaylists.pending, (state, action) => {
    return { ...state, userPlaylists: action.payload, loading: true, loaded: false };
  });
  builder
    .addCase(findUserPlaylists.fulfilled, (state, action) => {
      return { ...state, userPlaylists: action.payload, loading: false, loaded: true };
    })
    .addCase(selectPlaylistAction, (state, action) => {
      const updateSelection = function (bool: boolean, item: PlaylistResponseDto) {
        const { selectedPlaylists } = state;

        const filtered = bool ? selectedPlaylists.concat([item]) : selectedPlaylists.filter((plist) => plist._id !== item._id);
        return filtered;
      };
      return { ...state, selectedPlaylists: updateSelection(action.payload.isChecked, action.payload.plist) };
    });
});

const playlistItemsReducer = createReducer(
  initialState,
  (builder) => builder
  // .addCase(addUserPlaylistItem.fulfilled, reducers.addItem(USER_PLAYLISTS_STATE_KEY))
  // .addCase(updateUserPlaylistItem.fulfilled, reducers.updateItem(USER_PLAYLISTS_STATE_KEY))
  // .addCase(removeUserPlaylistItem.fulfilled, reducers.removeItem(USER_PLAYLISTS_STATE_KEY))
);

export { playlistReducer, playlistsReducer, playlistItemsReducer };
