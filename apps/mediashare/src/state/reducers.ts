/* eslint-disable @typescript-eslint/no-unused-vars */
import { combineReducers } from 'redux';

import { userReducer, usersReducer } from './modules/user';
import { mediaItemReducer, mediaItemsReducer } from './modules/media-items';
import { playlistReducer, playlistsReducer, playlistItemsReducer } from './modules/playlists';
import { shareItemsReducer } from './modules/share-items';
import { loginReducer } from './modules/system';
import { RootState } from './index';

// Global app flags and data
const systemReducers = {
  isLoggedIn: authReducer,
  isOffline: loginReducer,
};

// User profile data
const userReducers = {
  user: userReducer, // The current user
  users: usersReducer, // Should be read only
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
  ...systemReducers,
  ...userReducers,
  ...userOwnedReducers,
  ...userSharedReducers,
});

export { rootReducer };
