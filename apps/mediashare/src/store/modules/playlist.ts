import { createAsyncThunk, createAction, createSlice } from '@reduxjs/toolkit';
import { makeActions } from 'mediashare/store/factory';
import { reduceFulfilledState, reducePendingState, reduceRejectedState } from 'mediashare/store/helpers';
import { ApiService } from 'mediashare/store/apis';
import { CreatePlaylistDto, CreatePlaylistResponseDto, UpdatePlaylistDto, PlaylistResponseDto } from 'mediashare/rxjs-api';

import { flattenDeep } from 'remeda';
import { take } from 'rxjs/operators';
import { merge } from 'rxjs';

// Define these in snake case or our converter won't work... we need to fix that
const playlistActionNames = [
  'get_playlist_by_id',
  'add_user_playlist',
  'update_user_playlist',
  'share_user_playlist',
  'remove_user_playlist',
  'clear_user_playlist',
] as const;

export const playlistActions = makeActions(playlistActionNames);

export const getPlaylistById = createAsyncThunk(playlistActions.getPlaylistById.type, async (id: string, { extra }) => {
  const { api } = extra as { api: ApiService };
  const response = await api.playlists.playlistControllerFindOne({ playlistId: id }).toPromise();
  api.views.viewsControllerCreatePlaylistView({ playlistId: id }).pipe(take(1)).subscribe();
  return response;
});

export const addUserPlaylist = createAsyncThunk(playlistActions.addUserPlaylist.type, async (playlist: CreatePlaylistDto, { extra }) => {
  const { api } = extra as { api: ApiService };
  return await api.playlists.playlistControllerCreate({ createPlaylistDto: playlist }).toPromise();
});

export const updateUserPlaylist = createAsyncThunk(playlistActions.updateUserPlaylist.type, async (playlist: UpdatePlaylistDto, { extra }) => {
  const { api } = extra as { api: ApiService };
  // @ts-ignore - TODO: Fix _id property on UpdatePlaylistDto!
  return await api.playlists.playlistControllerUpdate({ playlistId: playlist._id, updatePlaylistDto: playlist }).toPromise();
});

export const shareUserPlaylist = createAsyncThunk(
  playlistActions.shareUserPlaylist.type,
  async ({ userIds, playlistIds }: { userIds: string[]; playlistIds: string[] }, { extra }) => {
    const { api } = extra as { api: ApiService };
    const prom = ({ playlistId, userId }) => api.playlists.playlistControllerShare({ playlistId, userId });
    const promises = userIds.map((userId) => playlistIds.map((playlistId) => prom({ userId, playlistId })));
    const flat = flattenDeep(promises);
    return await merge(...flat).toPromise();
  }
);

export const removeUserPlaylist = createAsyncThunk(playlistActions.removeUserPlaylist.type, async (id: string, { extra }) => {
  const { api } = extra as { api: ApiService };
  return await api.playlists.playlistControllerRemove({ playlistId: id }).toPromise();
});

export const clearUserPlaylist = createAction(playlistActions.clearUserPlaylist.type);

export interface PlaylistState {
  created: CreatePlaylistResponseDto | undefined;
  selected: PlaylistResponseDto | undefined;
  loading: boolean;
  loaded: boolean;
}

export const playlistInitialState: PlaylistState = {
  created: undefined,
  selected: undefined,
  loading: false,
  loaded: false,
};

const playlistSlice = createSlice({
  name: 'playlist',
  initialState: playlistInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addUserPlaylist.pending, reducePendingState())
      .addCase(addUserPlaylist.rejected, reduceRejectedState())
      .addCase(addUserPlaylist.fulfilled, reduceFulfilledState((state, action) => ({
        ...state, created: action.payload, loading: false, loaded: true
      })))
      .addCase(getPlaylistById.pending, reducePendingState((state) => ({
        ...state, selected: undefined, loading: true, loaded: false
      })))
      .addCase(getPlaylistById.rejected, reduceRejectedState())
      .addCase(getPlaylistById.fulfilled, reduceFulfilledState((state, action) => ({
        ...state, selected: action.payload, loading: false, loaded: true
      })))
      .addCase(removeUserPlaylist.pending, reducePendingState((state) => ({
        ...state, selected: undefined, loading: true, loaded: false
      })))
      .addCase(removeUserPlaylist.rejected, reduceRejectedState())
      .addCase(removeUserPlaylist.fulfilled, reduceFulfilledState((state) => ({
        ...state, selected: undefined, loading: false, loaded: true
      })))
      .addCase(clearUserPlaylist, (state) => ({
        ...state, created: undefined, loading: false, loaded: true
      }))
  },
});

export default playlistSlice;
export const reducer = playlistSlice.reducer;
