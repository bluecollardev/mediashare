import React from 'react';

import { AppHeader } from './components/layout/AppHeader';

const routeConfig = {
  login: {
    name: 'login',
    options: { title: ' ', header: undefined },
  },
  browse: {
    name: 'browse',
    options: { title: 'My Feed', header: (props) => <AppHeader {...props} searchable={false} /> },
  },
  playlists: {
    name: 'playlists',
    options: { title: 'Playlists', header: (props) => <AppHeader {...props} searchable={true} /> },
  },
  addMediaItem: {
    name: 'addMediaItem',
    options: { title: 'Add / Upload Media' },
  },
  playlistDetail: {
    name: 'playlistDetail',
    options: { title: 'Playlist', header: (props) => <AppHeader {...props} /> },
  },
  playlistEdit: {
    name: 'playlistEdit',
    options: { title: 'Edit Playlist', header: (props) => <AppHeader {...props} /> },
  },
  playlistAdd: {
    name: 'playlistAdd',
    options: { title: 'Create Playlist', header: (props) => <AppHeader {...props} /> },
  },
  media: {
    name: 'media',
    options: { title: 'Media Library', header: (props) => <AppHeader {...props} searchable={true} /> },
  },
  mediaItemDetail: {
    name: 'mediaItemDetail',
    options: { title: 'View Media Item', header: (props) => <AppHeader {...props} /> },
  },
  mediaItemEdit: {
    name: 'mediaItemEdit',
    options: { title: 'Edit Media Item', header: (props) => <AppHeader {...props} /> },
  },
  addFromFeed: {
    name: 'addFromFeed',
    options: { title: 'Import From S3 Bucket', header: (props) => <AppHeader {...props} /> },
  },
  addFromMedia: {
    name: 'addFromMedia',
    options: { title: 'Add Existing Media Item', header: (props) => <AppHeader {...props} /> },
  },
  addPlaylist: {
    name: 'addPlaylist',
    options: { title: 'Add Playlist', header: (props) => <AppHeader {...props} /> },
  },
  addItemsToPlaylist: {
    name: 'addItemsToPlaylist',
    options: { title: 'Add To Playlist', header: (props) => <AppHeader {...props} searchable={true} /> },
  },
  addMedia: {
    name: 'addMediaItem',
    options: { title: 'Add Media', header: (props) => <AppHeader {...props} /> },
  },
  shareWith: {
    name: 'shareWith',
    options: { title: 'Share With', header: (props) => <AppHeader {...props} searchable={true} /> },
  },
  user: {
    name: 'user',
    options: { title: 'Manage Contact', header: (props) => <AppHeader {...props} /> },
  },
  account: {
    name: 'account',
    options: { title: 'My Account', header: (props) => <AppHeader {...props} /> },
  },
  accountEdit: {
    name: 'accountEdit',
    options: { title: 'Update Your Profile', header: (props) => <AppHeader {...props} /> },
  },
  profile: {
    name: 'profile',
    options: { title: 'User Profile', header: (props) => <AppHeader {...props} /> },
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
