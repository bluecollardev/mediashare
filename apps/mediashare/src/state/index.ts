export * from './middlewares';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { rootReducer } from './reducers';
import { AppDispatch, store } from './store';
export interface ErrorType {
  description: string;
  message: string;
}

export type RootStateType = {
  userPlaylists: null;

  // offlineMode: null,
};
// export const INITIAL_STATE = {
//   users: null,
//   user: null,
//   userMediaItems: null,
//   userPlaylists: null,
//   userPlaylistItems: null,
//   sharedMediaItems: null,
//   sharedPlaylists: null,
//   sharedPlaylistItems: null,
//   // offlineMode: null,
// } as const;

const mapDispatch = {
  toggleOn: () => ({ type: 'TOGGLE_IS_ON' }),
};
export type RootState = ReturnType<typeof store.getState>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useAppDispatch = () => useDispatch<AppDispatch>();
