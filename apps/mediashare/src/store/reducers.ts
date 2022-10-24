/* eslint-disable @typescript-eslint/no-unused-vars */
import { combineReducers } from 'redux';

import { reducer as appStateReducer } from './modules/appState';
import { reducer as profileReducer } from './modules/profile';
import { reducer as usersReducer } from './modules/users';
import { reducer as userReducer } from './modules/user';
import { reducer as userConnectionsReducer } from './modules/userConnections';
import { reducer as searchReducer } from './modules/search';
import { reducer as playlistsReducer } from './modules/playlists';
import { reducer as playlistReducer } from './modules/playlist';
import { reducer as createPlaylistReducer } from './modules/createPlaylist';
import { reducer as playlistItemReducer } from './modules/playlistItem';
import { reducer as mediaItemsReducer } from './modules/mediaItems';
import { reducer as mediaItemReducer } from './modules/mediaItem';
import { reducer as shareItemsReducer } from './modules/shareItems';
import { reducer as tagsReducer } from './modules/tags';

// Combine our reducers and export
const rootReducer = combineReducers({
  app: appStateReducer,
  user: userReducer,
  userConnections: userConnectionsReducer,
  users: usersReducer,
  profile: profileReducer,
  search: searchReducer,
  userPlaylists: playlistsReducer,
  createPlaylist: createPlaylistReducer,
  playlist: playlistReducer,
  playlists: playlistsReducer,
  playlistItem: playlistItemReducer,
  mediaItem: mediaItemReducer,
  mediaItems: mediaItemsReducer,
  shareItems: shareItemsReducer,
  tags: tagsReducer,
});

export { rootReducer };
