import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';

import home from '../container/HomeContainer/reducer';
import explore from '../container/ExploreContainer/reducer';
import library from '../container/LibraryContainer/reducer';
import libraryItemDetail from '../container/LibraryItemDetailContainer/reducer';
import playlistDetail from '../container/PlaylistDetailContainer/reducer';
import playlistEdit from '../container/PlaylistEditContainer/reducer';
import playlists from '../container/PlaylistsContainer/reducer';

export default combineReducers({
  form,
  home,
  explore,
  library,
  libraryItemDetail,
  playlistDetail,
  playlistEdit,
  playlists
});
