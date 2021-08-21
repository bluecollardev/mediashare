export * from './middlewares';
export interface ErrorType {
  description: string;
  message: string;
}

export type ApiResponse<T> = T;


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

export type RootState = typeof INITIAL_STATE


export  INITIAL_STATE;
