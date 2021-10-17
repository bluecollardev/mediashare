import { createAction, createAsyncThunk, createReducer, createSlice } from '@reduxjs/toolkit';
import { flattenDeep } from 'remeda';
import { merge } from 'rxjs';
import { take } from 'rxjs/operators';

import { makeEnum } from '../../core/factory';

import { apis, ApiService } from '../../apis';
import { CreatePlaylistDto, UpdatePlaylistDto, CreatePlaylistResponseDto, PlaylistResponseDto } from '../../../rxjs-api';
import { reducePendingState, reduceRejectedState } from '../../helpers';

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

export const addUserPlaylist = createAsyncThunk(playlistActionTypes.addUserPlaylist, async (playlist: CreatePlaylistDto, { extra }) => {
  return await apis.playlists.playlistControllerCreate({ createPlaylistDto: playlist }).toPromise();
});

export const updateUserPlaylist = createAsyncThunk(playlistActionTypes.updateUserPlaylist, async (playlist: UpdatePlaylistDto, { extra }) => {
  // @ts-ignore - TODO: Fix _id property on UpdatePlaylistDto!
  return await apis.playlists
    .playlistControllerUpdate({
      playlistId: playlist._id,
      updatePlaylistDto: playlist,
    })
    .toPromise();
});

export const shareUserPlaylist = createAsyncThunk(
  playlistActionTypes.shareUserPlaylist,
  async ({ userIds, playlistIds }: { userIds: string[]; playlistIds: string[] }, { extra }) => {
    const prom = ({ playlistId, userId }) => apis.playlists.playlistControllerShare({ playlistId, userId });
    const promises = userIds.map((userId) => playlistIds.map((playlistId) => prom({ userId, playlistId })));
    const flat = flattenDeep(promises);
    return await merge(...flat).toPromise();
  }
);

export const removeUserPlaylist = createAsyncThunk(playlistActionTypes.removeUserPlaylist, async (id: string, { extra }) => {
  const { api } = extra as { api: ApiService };
  return await api.playlists.playlistControllerRemove({ playlistId: id }).toPromise();
});

export const findUserPlaylists = createAsyncThunk(playlistsActionTypes.findUserPlaylists, async (opts: {} | undefined, { extra }) => {
  return await apis.user.userControllerGetUserPlaylists().toPromise();
});

export const addUserPlaylistItem = createAsyncThunk(playlistItemActionTypes.addUserPlaylistItem, async (playlist: CreatePlaylistDto, { extra }) => {
  // TODO: playlistControllerCreateItem does not exist!
  // @ts-ignore
  const response = await apis.playlists.playlistControllerCreateItem({ createPlaylistDto: playlist }).toPromise();
  return response.userPlaylists;
});

export const updateUserPlaylistItem = createAsyncThunk(playlistItemActionTypes.updateUserPlaylistItem, async (playlist: UpdatePlaylistDto) => {
  return await apis.playlists
    .playlistControllerUpdate({
      playlistId: playlist._id,
      updatePlaylistDto: playlist,
    })
    .toPromise();
});

export const getPlaylistById = createAsyncThunk('getPlaylistById', async (id: string) => {
  const response = await apis.playlists.playlistControllerFindOne({ playlistId: id }).toPromise();
  apis.views.viewsControllerCreatePlaylistView({ playlistId: id }).pipe(take(1)).subscribe();
  return response;
});

export interface PlaylistInitialState {
  createdPlaylist: CreatePlaylistResponseDto;
  selectedPlaylist: PlaylistResponseDto;
  loading: boolean;
  loaded: boolean;

}

export const PLAYLIST_INITIAL_STATE: PlaylistInitialState = {
  createdPlaylist: null,
  selectedPlaylist: null,
  loading: false,
  loaded: false,
};

const playlistSlice = createSlice({
  name: 'playlist',
  initialState: PLAYLIST_INITIAL_STATE,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addUserPlaylist.pending, reducePendingState())
      .addCase(addUserPlaylist.fulfilled, (state, action) => {
        return { ...state, createdPlaylist: action.payload };
      })
      .addCase(clearPlaylistAction, (state) => {
        return { ...state, createdPlaylist: null };
      })
      .addCase(getPlaylistById.pending, (state) => {
        return { ...state, selectedPlaylist: null };
      })
      .addCase(getPlaylistById.rejected, reduceRejectedState())
      .addCase(getPlaylistById.fulfilled, (state, action) => {
        return { ...state, selectedPlaylist: action.payload };
      })
      .addCase(removeUserPlaylist.pending, (state) => {
        return { ...state, selectedPlaylist: null };
      })
      .addCase(removeUserPlaylist.rejected, reduceRejectedState())
      .addCase(removeUserPlaylist.fulfilled, (state) => {
        return { ...state, selectedPlaylist: null };
      });
  },
});

export interface PlaylistsInitialState {
  selected: PlaylistResponseDto[];
  entities: PlaylistResponseDto[];
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
    builder.addCase(findUserPlaylists.pending, (state, action) => {
      return { ...state, entities: action.payload };
    });
    builder
      .addCase(findUserPlaylists.fulfilled, (state, action) => {
        return { ...state, entities: action.payload };
      })
      .addCase(selectPlaylistAction, (state, action) => {
        const updateSelection = function (bool: boolean, item: PlaylistResponseDto) {
          const { selected } = state;
          // Is it filtered?
          return bool ? selected.concat([item]) : selected.filter((plist) => plist._id !== item._id);
        };
        return { ...state, selected: updateSelection(action.payload.isChecked, action.payload.plist) };
      });
  },
});

const playlistSliceReducer = playlistSlice.reducer;
const playlistsSliceReducer = playlistsSlice.reducer;
export { playlistSliceReducer as playlistReducer, playlistsSliceReducer as playlistsReducer }
