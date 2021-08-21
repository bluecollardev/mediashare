export * from './middlewares';
export interface ErrorType {
  description: string;
  message: string;
}

export type RootStateType = {

  userPlaylists: null,

  // offlineMode: null,
}
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

const mapState = (state: RootState) => ({
  userPlaylists: state.isOn
})

const mapDispatch = {
  toggleOn: () => ({ type: 'TOGGLE_IS_ON' })
}
export type RootState = typeof INITIAL_STATE


export  INITIAL_STATE;
