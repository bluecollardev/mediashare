export * from './middlewares';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { store } from '../boot/configureStore';
import { rootReducer } from './reducers';
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
export type AppDispatch = ReturnType<typeof store.dispatch>;
export const useAppDispatch = () => useDispatch<AppDispatch>();
