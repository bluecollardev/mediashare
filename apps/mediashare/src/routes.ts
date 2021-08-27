import Login from './container/LoginContainer';
import Home from './container/HomeContainer';
import Explore from './container/ExploreContainer';
import AddFromLibrary from './container/AddFromLibraryContainer';
import AddFromFeed from './container/AddFromFeedContainer';
import Playlists from './container/PlaylistsContainer';
import PlaylistDetail from './container/PlaylistDetailContainer';
import PlaylistEdit from './container/PlaylistEditContainer';
import Library from './container/LibraryContainer';
import LibraryItemDetail from './container/LibraryItemDetailContainer';
import LibraryItemEdit from './container/LibraryItemEditContainer';
import ShareWith from './container/ShareWithContainer';
import Settings from './container/SettingsContainer';

import { AppScreenHeader } from './components/layout/AppScreenHeader';
import { AddMediaContainer } from './container/AddMediaContainer/index';
import PlaylistAddContainer from './container/PlaylistAddContainer/index';

const routeConfig = {
  login: {
    name: 'login',
    component: Login,
    options: { title: 'Login', header: AppScreenHeader },
  },
  home: {
    name: 'home',
    component: Home,
    options: { title: 'Home', header: AppScreenHeader },
  },
  explore: {
    name: 'explore',
    component: Explore,
    options: { title: 'Explore', header: AppScreenHeader },
  },
  playlists: {
    name: 'Playlists',
    component: Playlists,
    options: { title: 'Playlists', header: AppScreenHeader },
  },
  addMediaItem: {
    name: 'addMediaItem',
    component: AddMediaContainer,
  },
  playlistDetail: {
    name: 'playlistDetail',
    component: PlaylistDetail,
    options: { title: 'Playlist', header: AppScreenHeader },
  },
  playlistEdit: {
    name: 'playlistEdit',
    component: PlaylistEdit,
    options: { title: 'Edit Playlist', header: AppScreenHeader },
  },
  playlistAdd: {
    name: 'playlistAdd',
    component: PlaylistAddContainer,
    options: { title: 'Edit Playlist', header: AppScreenHeader },
  },
  library: {
    name: 'library',
    component: Library,
    options: { title: 'Library', header: AppScreenHeader },
  },
  libraryItemDetail: {
    name: 'libraryItemDetail',
    component: LibraryItemDetail,
    options: { title: 'Library Item', header: AppScreenHeader },
  },
  libraryItemEdit: {
    name: 'libraryItemEdit',
    component: LibraryItemEdit,
    options: { title: 'Edit Library Item', header: AppScreenHeader },
  },
  addFromFeed: {
    name: 'addFromFeed',
    component: AddFromFeed,
    options: { title: 'Add From Feed', header: AppScreenHeader },
  },
  addFromLibrary: {
    name: 'addFromLibrary',
    component: AddFromLibrary,
    options: { title: 'Add From Library', header: AppScreenHeader },
  },
  addPlaylist: {
    name: 'addPlaylist',
    component: PlaylistEdit,
    options: { title: 'Add Playlist', header: AppScreenHeader },
  },
  addItemsToPlaylist: {
    name: 'addItemsToPlaylist',
    component: AddFromFeed,
    options: { title: 'Add Playlist', header: AppScreenHeader },
  },
  addMedia: {
    name: 'addToPlaylist',
    component: AddMediaContainer,
    options: { title: 'Upload Media', header: AppScreenHeader },
  },
  shareWith: {
    name: 'shareWith',
    component: ShareWith,
    options: { title: 'Share With', header: AppScreenHeader },
  },
  settings: {
    name: 'settings',
    component: Settings,
    options: { title: 'Settings', header: AppScreenHeader },
  },
} as const;
type RouteEnumKeys = keyof typeof routeConfig;
type RouteEnumType<Key extends RouteEnumKeys> = typeof routeConfig[Key]['name'];
type MappedRouteEnum = { [P in RouteEnumKeys]: RouteEnumType<P> };

function createRouteConfig(config: typeof routeConfig) {
  const obj: Partial<MappedRouteEnum> = Object.create({});
  for (let key in config) {
    console.log(key);
    if (config.hasOwnProperty(key)) {
      Object.assign(obj, { [key]: config[key].name });
    }
  }
  return obj;
}

const ROUTES = createRouteConfig(routeConfig);

export { routeConfig, ROUTES };
