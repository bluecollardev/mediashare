/* eslint-disable @typescript-eslint/no-unused-vars */
import { combineReducers } from 'redux';

import { userReducer } from './modules/user';
import { usersReducer } from './modules/users';
import { reducer as mediaItemReducer } from './modules/mediaItem';
import { reducer as mediaItemsReducer } from './modules/mediaItems';
import { reducer as playlistReducer } from './modules/playlist';
import { reducer as playlistsReducer } from './modules/playlists';
import { reducer as createPlaylistReducer } from './modules/createPlaylist';
import { reducer as appStateReducer } from './modules/appState';
import { reducer as profileReducer } from './modules/profile';
import { reducer as shareItemsReducer } from './modules/shareItems';
import { reducer as tagsReducer } from './modules/tags';

// Combine our reducers and export
const rootReducer = combineReducers({
  app: appStateReducer,
  users: usersReducer,
  user: userReducer,
  userPlaylists: playlistsReducer,
  profile: profileReducer,
  createPlaylist: createPlaylistReducer,
  playlist: playlistReducer,
  playlists: playlistsReducer,
  mediaItem: mediaItemReducer,
  mediaItems: mediaItemsReducer,
  shareItems: shareItemsReducer,
  tags: tagsReducer,
});

export { rootReducer };
