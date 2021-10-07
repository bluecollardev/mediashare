/* eslint-disable @typescript-eslint/no-unused-vars */
import { combineReducers } from 'redux';

import { userReducer } from './modules/user';
import { usersReducer } from './modules/users';
import { mediaItemReducer, mediaItemsReducer } from './modules/media-items';
import { playlistReducer, playlistsReducer } from './modules/playlists';
import { reducer as createPlaylistReducer } from './modules/create-playlist';
import { reducer as appStateReducer } from './modules/app-state/index';
import { reducer as profileReducer } from './modules/profile/index';
import { reducer as shareItemsReducer } from './modules/share-items/index';

// Global app flags and data
const systemReducers = {
  isOffline: 'test',
};

// Media item and playlist data
const userOwnedReducers = {
  userMediaItems: mediaItemsReducer,
  userPlaylists: playlistsReducer,
};

const userSharedReducers = {
  sharedMediaItems: mediaItemsReducer,
  sharedPlaylists: playlistsReducer,
};

// Combine our reducers and export
const rootReducer = combineReducers({
  app: appStateReducer,
  profile: profileReducer,
  user: userReducer,
  mediaItems: mediaItemsReducer,
  mediaItem: mediaItemReducer,
  createPlaylist: createPlaylistReducer,
  playlists: playlistsReducer,
  playlist: playlistReducer,
  shareItems: shareItemsReducer,
  users: usersReducer,
});

export { rootReducer };
