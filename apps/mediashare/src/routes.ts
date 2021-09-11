import Login from './components/pages/Login';
import Explore from './components/pages/Explore';
import ExploreDetail from './components/pages/ExploreDetail';
import ExploreItemDetail from './components/pages/ExploreItemDetail';
import AddFromCollection from './components/pages/AddFromCollection';
import AddMedia from './components/pages/AddMedia';
import AddFromFeed from './components/pages/AddFromFeed';
import Playlists from './components/pages/Playlists';
import PlaylistDetail from './components/pages/PlaylistDetail';
import PlaylistEdit from './components/pages/PlaylistEdit';
import PlaylistAdd from './components/pages/PlaylistAdd';
import AddToPlaylist from './components/pages/AddToPlaylist';
import Media from './components/pages/Media';
import MediaItemDetail from './components/pages/MediaItemDetail';
import MediaItemEdit from './components/pages/MediaItemEdit';
import ShareWith from './components/pages/ShareWith';
import Account from './components/pages/Account';
import Settings from './components/layout/Accordion';

import { AppScreenHeader } from './components/layout/AppScreenHeader';

const routeConfig = {
  login: {
    name: 'login',
    component: Login,
    options: { title: 'Login', header: AppScreenHeader },
  },
  explore: {
    name: 'explore',
    component: Explore,
    options: { title: 'Explore', header: AppScreenHeader },
  },
  sharedPlaylistDetail: {
    name: 'sharedPlaylistDetail',
    component: ExploreDetail,
    options: { title: "Adam Fehr's PLaylist", header: AppScreenHeader },
  },
  sharedItemDetail: {
    name: 'sharedItemDetail',
    component: ExploreItemDetail,
    options: { title: 'Title', header: AppScreenHeader },
  },
  playlists: {
    name: 'playlists',
    component: Playlists,
    options: { title: 'Playlists', header: AppScreenHeader },
  },
  addMediaItem: {
    name: 'addMediaItem',
    component: AddMedia,
    options: { title: 'Add Media' },
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
    component: PlaylistAdd,
    options: { title: 'Create Playlist', header: AppScreenHeader },
  },
  media: {
    name: 'media',
    component: Media,
    options: { title: 'Media', header: AppScreenHeader },
  },
  mediaItemDetail: {
    name: 'mediaItemDetail',
    component: MediaItemDetail,
    options: { title: 'Media Item', header: AppScreenHeader },
  },
  mediaItemEdit: {
    name: 'mediaItemEdit',
    component: MediaItemEdit,
    options: { title: 'Edit Media Item', header: AppScreenHeader },
  },
  addFromFeed: {
    name: 'addFromFeed',
    component: AddFromFeed,
    options: { title: 'Add From Feed', header: AppScreenHeader },
  },
  addFromMedia: {
    name: 'addFromMedia',
    component: AddFromCollection,
    options: { title: 'Add From Media', header: AppScreenHeader },
  },
  addPlaylist: {
    name: 'addPlaylist',
    component: PlaylistEdit,
    options: { title: 'Add Playlist', header: AppScreenHeader },
  },
  addItemsToPlaylist: {
    name: 'addItemsToPlaylist',
    component: AddToPlaylist,
    options: { title: 'Add Playlist', header: AppScreenHeader },
  },
  addMedia: {
    name: 'addMediaItem',
    component: AddMedia,
    options: { title: 'Add Media', header: AppScreenHeader },
  },
  shareWith: {
    name: 'shareWith',
    component: ShareWith,
    options: { title: 'Share With', header: AppScreenHeader },
  },
  account: {
    name: 'account',
    component: Account,
    options: { title: 'Account', header: AppScreenHeader },
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

function createRouteConfig(config: typeof routeConfig): MappedRouteEnum {
  const obj = Object.create({});
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
