import { PlaylistActionKeysType } from '.';
import { Playlist } from '../../../api';
import { getItems } from '../../core/actions';
import { ReducerFactory } from '../../core/reducer';

const reducersDict = {
  GET_ITEMS: (state, items) => getItems<Playlist[]>(state, items),
  SOME_ACTION: (state) => state,
};

const playlistReducer = ReducerFactory<PlaylistActionKeysType>(reducersDict);

export default playlistReducer;
