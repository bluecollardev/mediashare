import { PlaylistActionKeysType } from '.';
import { Playlist } from '../../../api';
import { getItems } from '../../core/actions';
import { ReducerDictionary, ReducerFactory } from '../../core/reducer';

const reducersDict: ReducerDictionary<PlaylistActionKeysType> = {
  getItems: (state, items) => getItems<Playlist[]>(state, items),
  someAction: (state) => state,
};

const playlistReducer = ReducerFactory<PlaylistActionKeysType>(reducersDict);

export default playlistReducer;
