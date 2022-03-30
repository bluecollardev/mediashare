import { createAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { flattenDeep } from 'remeda';
import { merge } from 'rxjs';
import { take } from 'rxjs/operators';
import { makeActions } from 'mediashare/store/factory';
import { ApiService } from 'mediashare/store/apis';
import { CreatePlaylistDto, UpdatePlaylistDto, CreatePlaylistResponseDto, PlaylistResponseDto, PlaylistItemResponseDto } from 'mediashare/rxjs-api';
import { reduceFulfilledState, reducePendingState, reduceRejectedState } from 'mediashare/store/helpers';

const PLAYLIST_ACTIONS = [
  'get_user_playlist',
  'add_user_playlist',
  'update_user_playlist',
  'share_user_playlist',
  'remove_user_playlist',
  'clear_user_playlist',
  'get_playlist_by_id',
] as const;

export const playlistActionTypes = makeActions(PLAYLIST_ACTIONS);

export const clearPlaylistAction = createAction('clearPlaylist');

export const addUserPlaylist = createAsyncThunk(playlistActionTypes.addUserPlaylist.type, async (playlist: CreatePlaylistDto, { extra }) => {
  const { api } = extra as { api: ApiService };
  return await api.playlists.playlistControllerCreate({ createPlaylistDto: playlist }).toPromise();
});

export const updateUserPlaylist = createAsyncThunk(playlistActionTypes.updateUserPlaylist.type, async (playlist: UpdatePlaylistDto, { extra }) => {
  const { api } = extra as { api: ApiService };
  // @ts-ignore - TODO: Fix _id property on UpdatePlaylistDto!
  return await api.playlists
    .playlistControllerUpdate({
      playlistId: playlist._id,
      updatePlaylistDto: playlist,
    })
    .toPromise();
});

export const shareUserPlaylist = createAsyncThunk(
  playlistActionTypes.shareUserPlaylist.type,
  async ({ userIds, playlistIds }: { userIds: string[]; playlistIds: string[] }, { extra }) => {
    const { api } = extra as { api: ApiService };
    const prom = ({ playlistId, userId }) => api.playlists.playlistControllerShare({ playlistId, userId });
    const promises = userIds.map((userId) => playlistIds.map((playlistId) => prom({ userId, playlistId })));
    const flat = flattenDeep(promises);
    return await merge(...flat).toPromise();
  }
);

export const removeUserPlaylist = createAsyncThunk(playlistActionTypes.removeUserPlaylist.type, async (id: string, { extra }) => {
  const { api } = extra as { api: ApiService };
  return await api.playlists.playlistControllerRemove({ playlistId: id }).toPromise();
});

export const getPlaylistById = createAsyncThunk(playlistActionTypes.getPlaylistById.type, async (id: string, { extra }) => {
  const { api } = extra as { api: ApiService };
  const response = await api.playlists.playlistControllerFindOne({ playlistId: id }).toPromise();
  api.views.viewsControllerCreatePlaylistView({ playlistId: id }).pipe(take(1)).subscribe();
  return response;
});

export interface PlaylistInitialState {
  created: CreatePlaylistResponseDto | undefined;
  selected: PlaylistResponseDto | undefined;
  loading: boolean;
  loaded: boolean;
}

export const PLAYLIST_INITIAL_STATE: PlaylistInitialState = {
  created: undefined,
  selected: undefined,
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
      .addCase(addUserPlaylist.rejected, reduceRejectedState())
      .addCase(addUserPlaylist.fulfilled, reduceFulfilledState((state, action) => ({
        ...state, created: action.payload
      })))
      .addCase(clearPlaylistAction, (state) => ({
        ...state, created: undefined
      }))
      .addCase(getPlaylistById.pending, reducePendingState((state) => ({
        ...state, selected: undefined
      })))
      .addCase(getPlaylistById.rejected, reduceRejectedState())
      .addCase(getPlaylistById.fulfilled, reduceFulfilledState((state, action) => ({
        ...state, selected: action.payload
      })))
      .addCase(removeUserPlaylist.pending, reducePendingState((state) => ({
        ...state, selected: undefined
      })))
      .addCase(removeUserPlaylist.rejected, reduceRejectedState())
      .addCase(removeUserPlaylist.fulfilled, reduceFulfilledState((state) => ({
        ...state, selected: undefined
      })));
  },
});

export default playlistSlice;
export const reducer = playlistSlice.reducer;
