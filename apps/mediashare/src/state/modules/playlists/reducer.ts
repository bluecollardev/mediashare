import { makeActions, makeEnum } from '../../core/types';

const PLAYLIST_ACTIONS = [
  'ADD_USER_PLAYLIST',
  'REMOVE_USER_PLAYLIST',
  'GET_USER_PLAYLIST',
  'FIND_USER_PLAYLIST',
] as const;

const playlistActionTypes = makeEnum(PLAYLIST_ACTIONS);

const playlistItemActions = makeActions(PLAYLIST_ACTIONS);

export { playlistActionTypes, playlistItemActions };
