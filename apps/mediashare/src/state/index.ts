export * from './middlewares';
export interface ErrorType {
  description: string;
  message: string;
}

export type ApiResponse<T> = T;
export interface AppForm {}

export interface RootState {}

export const INITIAL_STATE = {
  users: null,
  user: null,
  userMediaItems: null,
  userPlaylists: null,
  userPlaylistItems: null,
  sharedMediaItems: null,
  sharedPlaylists: null,
  sharedPlaylistItems: null,
  // offlineMode: null,
} as const;

export default INITIAL_STATE;
