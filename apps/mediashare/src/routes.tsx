import React from 'react';
import Login from './components/pages/Login';
import Browse from './components/pages/Browse';
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
import User from './components/pages/User';

import { AppHeader } from './components/layout/AppHeader';
import AccountEdit from './components/pages/AccountEdit';
import Profile from './components/pages/Profile';

const routeConfig = {
  login: {
    name: 'login',
    component: Login,
    options: { title: ' ', header: undefined },
  },
  browse: {
    name: 'browse',
    component: Browse,
    options: { title: 'My Feed', header: (props) => <AppHeader {...props} searchable={false} /> },
  },
  playlists: {
    name: 'playlists',
    component: Playlists,
    options: { title: 'Playlists', header: (props) => <AppHeader {...props} searchable={true} /> },
  },
  addMediaItem: {
    name: 'addMediaItem',
    component: AddMedia,
    options: { title: 'Add / Upload Media' },
  },
  playlistDetail: {
    name: 'playlistDetail',
    component: PlaylistDetail,
    options: { title: 'Playlist', header: (props) => <AppHeader {...props} /> },
  },
  playlistEdit: {
    name: 'playlistEdit',
    component: PlaylistEdit,
    options: { title: 'Edit Playlist', header: (props) => <AppHeader {...props} /> },
  },
  playlistAdd: {
    name: 'playlistAdd',
    component: PlaylistAdd,
    options: { title: 'Create Playlist', header: (props) => <AppHeader {...props} /> },
  },
  media: {
    name: 'media',
    component: Media,
    options: { title: 'My Media Collection', header: (props) => <AppHeader {...props} searchable={true} /> },
  },
  mediaItemDetail: {
    name: 'mediaItemDetail',
    component: MediaItemDetail,
    options: { title: 'View Media Item', header: (props) => <AppHeader {...props} /> },
  },
  mediaItemEdit: {
    name: 'mediaItemEdit',
    component: MediaItemEdit,
    options: { title: 'Edit Media Item', header: (props) => <AppHeader {...props} /> },
  },
  addFromFeed: {
    name: 'addFromFeed',
    component: AddFromFeed,
    options: { title: 'Import From S3 Bucket', header: (props) => <AppHeader {...props} /> },
  },
  addFromMedia: {
    name: 'addFromMedia',
    component: AddFromCollection,
    options: { title: 'Add Existing Media Item', header: (props) => <AppHeader {...props} /> },
  },
  addPlaylist: {
    name: 'addPlaylist',
    component: PlaylistEdit,
    options: { title: 'Add Playlist', header: (props) => <AppHeader {...props} /> },
  },
  addItemsToPlaylist: {
    name: 'addItemsToPlaylist',
    component: AddToPlaylist,
    options: { title: 'Add To Playlist', header: (props) => <AppHeader {...props} searchable={true} /> },
  },
  addMedia: {
    name: 'addMediaItem',
    component: AddMedia,
    options: { title: 'Add Media', header: (props) => <AppHeader {...props} /> },
  },
  shareWith: {
    name: 'shareWith',
    component: ShareWith,
    options: { title: 'Share With', header: (props) => <AppHeader {...props} searchable={true} /> },
  },
  user: {
    name: 'user',
    component: User,
    options: { title: 'Manage Contact', header: (props) => <AppHeader {...props} /> },
  },
  account: {
    name: 'account',
    component: Account,
    options: { title: 'Account', header: (props) => <AppHeader {...props} /> },
  },
  accountEdit: {
    name: 'accountEdit',
    component: AccountEdit,
    options: { title: 'Update Your Profile', header: (props) => <AppHeader {...props} /> },
  },
  profile: {
    name: 'profile',
    component: Profile,
    options: { title: 'Profile', header: (props) => <AppHeader {...props} /> },
  },
} as const;
type RouteEnumKeys = keyof typeof routeConfig;
type RouteEnumType<Key extends RouteEnumKeys> = typeof routeConfig[Key]['name'];
type MappedRouteEnum = { [P in RouteEnumKeys]: RouteEnumType<P> };

function createRouteConfig(config: typeof routeConfig): MappedRouteEnum {
  const obj = Object.create({});
  for (let key in config) {
    if (config.hasOwnProperty(key)) {
      Object.assign(obj, { [key]: config[key].name });
    }
  }
  return obj;
}

const ROUTES = createRouteConfig(routeConfig);

export { routeConfig, ROUTES };
