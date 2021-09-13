/* eslint-disable @typescript-eslint/no-unused-vars */
import { combineReducers } from 'redux';

import { userReducer } from './modules/user';
import { usersReducer } from './modules/users';
import { mediaItemReducer, mediaItemsReducer } from './modules/media-items';
import { playlistItemsReducer, playlistReducer, playlistsReducer } from './modules/playlists';
import { reducer as createPlaylistReducer } from './modules/create-playlist';
import { reducer as appStateReducer } from './modules/app-state/index';

// Global app flags and data
const systemReducers = {
  isOffline: 'test',
};

// Media item and playlist data
const userOwnedReducers = {
  userMediaItems: mediaItemsReducer,
  userPlaylists: playlistsReducer,
  userPlaylistItems: playlistItemsReducer,
};

const userSharedReducers = {
  sharedMediaItems: mediaItemsReducer,
  sharedPlaylists: playlistsReducer,
  sharedPlaylistItems: playlistItemsReducer,
};

// Combine our reducers and export
const rootReducer = combineReducers({
  user: userReducer,
  playlists: playlistsReducer,
  playlist: playlistReducer,
  mediaItems: mediaItemsReducer,
  mediaItem: mediaItemReducer,
  createPlaylist: createPlaylistReducer,
  users: usersReducer,
  app: appStateReducer,
});

export { rootReducer };
