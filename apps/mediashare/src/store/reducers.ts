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
import { reducer as tagsReducer } from './modules/tags/index';

// Combine our reducers and export
const rootReducer = combineReducers({
  app: appStateReducer,
  profile: profileReducer,
  user: userReducer,
  userPlaylists: playlistsReducer,
  createPlaylist: createPlaylistReducer,
  playlist: playlistReducer,
  mediaItem: mediaItemReducer,
  mediaItems: mediaItemsReducer,
  shareItems: shareItemsReducer,
  tags: tagsReducer,
  users: usersReducer,
});

export { rootReducer };
