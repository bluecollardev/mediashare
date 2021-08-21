import { combineReducers, configureStore, createAction, createReducer } from '@reduxjs/toolkit';
import { playlistReducer } from './modules/playlists';
import { RootStateType } from './index';
import { PlaylistResponseDto } from '../rxjs-api';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { MediaItemDto } from '../api/models/media-item-dto';
const setUserPlaylistsAction = createAction<PlaylistResponseDto[], 'userPlaylists'>('userPlaylists');
const setMediaItemsAction = createAction<{ MediaItemDto }[], 'mediaItems'>('mediaItems');

const setUserPlaylistsReducer = createReducer(
  {
    [setUserPlaylistsAction.type]: null,
    [setMediaItemsAction.type]: null,
  },
  (builder) => {
    builder.addCase(setUserPlaylistsAction, (state, action) => {
      state.userPlaylists = action.payload;
    });
    builder.addCase(setMediaItemsAction, (state, action) => {
      state.mediaItems = action.payload;
    });
  }
);

const rootReducer = combineReducers({ setUserPlaylistsReducer });

const store = configureStore({
  reducer: rootReducer,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof rootReducer>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>(); // Export a hook that can be reused to resolve types

export default store;
