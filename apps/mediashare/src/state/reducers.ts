/* eslint-disable @typescript-eslint/no-unused-vars */
import { combineReducers } from 'redux';
// import { ReducerFactory } from './core/reducer';
// import rootReducerDict from './root-reducer';
// const rootReducer = ReducerFactory(rootReducerDict);

import { userReducer, usersReducer } from './modules/user';
import { playlistReducer, playlistsReducer, playlistItemsReducer } from './modules/playlists';
import { mediaItemReducer, mediaItemsReducer } from './modules/media-items';
import { shareItemsReducer } from './modules/share-items';

const reducers = combineReducers({
  userReducer,
  usersReducer,
  mediaItemReducer,
  mediaItemsReducer,
  playlistReducer,
  playlistsReducer,
  playlistItemsReducer,
  shareItemsReducer,
});

export { reducers };
