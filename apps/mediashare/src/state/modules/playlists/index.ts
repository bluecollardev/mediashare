import { createAction, createAsyncThunk, createReducer } from '@reduxjs/toolkit';
import { flattenDeep } from 'remeda';
import { merge } from 'rxjs';
import { take } from 'rxjs/operators';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { makeEnum } from '../../core/factory';

import { apis, ApiService } from '../../apis';
import { CreatePlaylistDto, UpdatePlaylistDto } from '../../../api';
import { CreatePlaylistResponseDto, PlaylistResponseDto } from '../../../rxjs-api';

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

const initialState: { selectedPlaylists: PlaylistResponseDto[]; userPlaylists: PlaylistResponseDto[]; loading: boolean; loaded: boolean } = {
  userPlaylists: [],
  selectedPlaylists: [],
  loading: false,
  loaded: false,
};

const initialPlaylistState: { createdPlaylist: CreatePlaylistResponseDto; loading: boolean; loaded: boolean; selectedPlaylist: PlaylistResponseDto } = {
  loading: false,
  loaded: false,
  createdPlaylist: null,
  selectedPlaylist: null,
};

const playlistReducer = createReducer(initialPlaylistState, (builder) => {
  builder
    .addCase(addUserPlaylist.pending, (state) => {
      return { ...state };
    })
    .addCase(addUserPlaylist.fulfilled, (state, action) => {
      return { ...state, createdPlaylist: action.payload };
    })
    .addCase(clearPlaylistAction, (state) => {
      return { ...state, createdPlaylist: null };
    })
    .addCase(getPlaylistById.pending, (state) => {
      return { ...state, selectedPlaylist: null };
    })
    .addCase(getPlaylistById.rejected, (state) => {
      return { ...state };
    })
    .addCase(getPlaylistById.fulfilled, (state, action) => {
      return { ...state, selectedPlaylist: action.payload };
    })
    .addCase(removeUserPlaylist.pending, (state) => {
      return { ...state, selectedPlaylist: null };
    })
    .addCase(removeUserPlaylist.rejected, (state) => {
      return { ...state };
    })
    .addCase(removeUserPlaylist.fulfilled, (state) => {
      return { ...state, selectedPlaylist: null };
    });
});

const playlistsReducer = createReducer(initialState, (builder) => {
  builder.addCase(findUserPlaylists.pending, (state, action) => {
    return { ...state, userPlaylists: action.payload };
  });
  builder
    .addCase(findUserPlaylists.fulfilled, (state, action) => {
      return { ...state, userPlaylists: action.payload };
    })
    .addCase(selectPlaylistAction, (state, action) => {
      const updateSelection = function (bool: boolean, item: PlaylistResponseDto) {
        const { selectedPlaylists } = state;
        // Is it filtered?
        return bool ? selectedPlaylists.concat([item]) : selectedPlaylists.filter((plist) => plist._id !== item._id);
      };
      return { ...state, selectedPlaylists: updateSelection(action.payload.isChecked, action.payload.plist) };
    });
});

export { playlistReducer, playlistsReducer };
