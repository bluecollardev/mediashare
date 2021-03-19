/* eslint-disable @typescript-eslint/no-unused-vars */
import { combineReducers } from 'redux';

import { userReducer, usersReducer } from './modules/user';
import { mediaItemReducer, mediaItemsReducer } from './modules/media-items';
import { playlistReducer, playlistsReducer, playlistItemsReducer } from './modules/playlists';
import { shareItemsReducer } from './modules/share-items';
import { loginReducer } from './modules/login';
import { RootState } from './index';

const rootReducer = combineReducers({
  loginReducer,
  user: userReducer,
  users: usersReducer,
  mediaItem: mediaItemReducer,
  mediaItems: mediaItemsReducer,
  playlist: playlistReducer,
  playlists: playlistsReducer,
  playlistItems: playlistItemsReducer,
  shareItems: shareItemsReducer,
});

export { rootReducer };
