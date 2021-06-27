import { createAsyncThunk, createReducer } from '@reduxjs/toolkit';

import { makeEnum } from '../../core/factory';

import * as reducers from '../../core/reducers';
import { ApiService } from '../../apis';

const ALL_PLAYLISTS_ACTIONS = ['FIND_ALL_PLAYLISTS'] as const;

export const playlistsActionTypes = makeEnum(ALL_PLAYLISTS_ACTIONS);

export const findAllPlaylists = createAsyncThunk(playlistsActionTypes.findAllPlaylists, async (opts: {} | undefined, { extra }) => {
  const { api } = extra as { api: ApiService };
  // @ts-ignore - TODO: Add playlistControllerFindAll to API service!
  api.playlists
    .playlistControllerFindAll({ query: {}, headers: {} })
    .then((response) => {
      return response && response.status === 200 ? response.data : undefined;
    })
    .catch((err) => {
      throw err;
    });
});

const initialState = {};

export const ALL_PLAYLISTS_STATE_KEY = 'allPlaylists';

const allPlaylistsReducer = createReducer(initialState, (builder) => builder.addCase(findAllPlaylists.fulfilled, reducers.loadItems(ALL_PLAYLISTS_STATE_KEY)));

export { allPlaylistsReducer };
