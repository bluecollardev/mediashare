export * from './middlewares';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { store } from '../boot/configureStore';
export interface ErrorType {
  description: string;
  message: string;
}

export type RootStateType = {
  userPlaylists: null;

  // offlineMode: null,
};

export type RootState = ReturnType<typeof store.getState>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export type AppDispatch = ReturnType<typeof store.dispatch>;
export const useAppDispatch = () => useDispatch<AppDispatch>();
