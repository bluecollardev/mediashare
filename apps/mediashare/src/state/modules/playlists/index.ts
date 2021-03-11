import { createReducer } from '@reduxjs/toolkit';

import { makeActions, makeEnum } from '../../core/factory';

import * as reducers from '../../core/reducers';

const PLAYLIST_ACTIONS = [
  'ADD_USER_PLAYLIST',
  'UPDATE_USER_PLAYLIST',
  'REMOVE_USER_PLAYLIST'
] as const;
const PLAYLISTS_ACTIONS = [
  'REMOVE_USER_PLAYLISTS'
] as const;
const PLAYLIST_ITEM_ACTIONS = [
  'ADD_USER_PLAYLIST_ITEM',
  'UPDATE_USER_PLAYLIST_ITEM',
  'REMOVE_USER_PLAYLIST_ITEM'
] as const;

export const playlistActionTypes = makeEnum(PLAYLIST_ACTIONS);

const [playlistActions, playlistsActions, playlistItemActions] = [
  makeActions(PLAYLIST_ACTIONS),
  makeActions(PLAYLISTS_ACTIONS),
  makeActions(PLAYLIST_ITEM_ACTIONS)
];

const initialState = {};

export const USER_PLAYLISTS_STATE_KEY = 'userPlaylists';

const playlistReducer = createReducer(initialState, (builder) => builder
  .addCase(playlistActions.addUserPlaylist, reducers.addItem(USER_PLAYLISTS_STATE_KEY))
  .addCase(playlistActions.updateUserPlaylist, reducers.updateItem(USER_PLAYLISTS_STATE_KEY))
  .addCase(playlistActions.removeUserPlaylist, reducers.removeItem(USER_PLAYLISTS_STATE_KEY))
);
const playlistsReducer = createReducer(initialState, (builder) => builder
  // .addCase(playlistsActions.removeUserPlaylists, reducers.removeItem(USER_PLAYLISTS_STATE_KEY))
);
const playlistItemsReducer = createReducer(initialState, (builder) => builder
  .addCase(playlistItemActions.addUserPlaylistItem, reducers.addItem(USER_PLAYLISTS_STATE_KEY))
  .addCase(playlistItemActions.updateUserPlaylistItem, reducers.updateItem(USER_PLAYLISTS_STATE_KEY))
  .addCase(playlistItemActions.removeUserPlaylistItem, reducers.removeItem(USER_PLAYLISTS_STATE_KEY))
);

export { playlistActions, playlistsActions, playlistItemActions };
export { playlistReducer, playlistsReducer, playlistItemsReducer };
