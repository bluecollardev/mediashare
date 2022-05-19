import React from 'react';

import { AppHeader } from 'mediashare/components/layout';

const routeConfig = {
  login: {
    name: 'login',
    options: { title: ' ', header: (props) => <AppHeader {...props} searchable={false} /> },
  },
  browse: {
    name: 'browse',
    options: { title: 'My Feed', header: (props) => <AppHeader {...props} searchable={false} showDisplayControls={true} /> },
  },
  playlists: {
    name: 'playlists',
    options: { title: 'Playlists', header: (props) => <AppHeader {...props} searchable={true} searchTarget="playlists" /> },
  },
  playlistAdd: {
    name: 'playlistAdd',
    options: { title: 'Create Playlist', header: (props) => <AppHeader {...props} /> },
  },
  playlistDetail: {
    name: 'playlistDetail',
    options: { title: 'Playlist', header: (props) => <AppHeader {...props} /> },
  },
  playlistEdit: {
    name: 'playlistEdit',
    options: { title: 'Edit Playlist', header: (props) => <AppHeader {...props} /> },
  },
  media: {
    name: 'media',
    options: { title: 'Media Library', header: (props) => <AppHeader {...props} searchable={true} searchTarget="media" /> },
  },
  mediaItemAdd: {
    name: 'addMediaItem',
    options: { title: 'Upload', header: (props) => <AppHeader {...props} /> },
  },
  mediaItemDetail: {
    name: 'mediaItemDetail',
    options: { title: 'File Details', header: (props) => <AppHeader {...props} /> },
  },
  mediaItemEdit: {
    name: 'mediaItemEdit',
    options: { title: 'Edit Media', header: (props) => <AppHeader {...props} /> },
  },
  addFromFeed: {
    name: 'addFromFeed',
    options: { title: 'Import From S3 Bucket', header: (props) => <AppHeader {...props} /> },
  },
  addFromMedia: {
    name: 'addFromMedia',
    options: { title: 'Add From Library', header: (props) => <AppHeader {...props} /> },
  },
  addItemsToPlaylist: {
    name: 'addItemsToPlaylist',
    options: { title: 'Add To Playlist', header: (props) => <AppHeader {...props} searchable={true} searchTarget="playlists" /> },
  },
  shareWith: {
    name: 'shareWith',
    options: { title: 'Share With', header: (props) => <AppHeader {...props} searchable={true} /> },
  },
  account: {
    name: 'account',
    options: { title: 'My Account', header: (props) => <AppHeader {...props} /> },
  },
  accountEdit: {
    name: 'accountEdit',
    options: { title: 'Update Account', header: (props) => <AppHeader {...props} /> },
  },
  profile: {
    name: 'profile',
    options: { title: 'Subscriber', header: (props) => <AppHeader {...props} /> },
  },
} as const;
type RouteEnumKeys = keyof typeof routeConfig;
type RouteEnumType<Key extends RouteEnumKeys> = typeof routeConfig[Key]['name'];
type MappedRouteEnum = { [P in RouteEnumKeys]: RouteEnumType<P> };

function mapRouteNames(config: typeof routeConfig): MappedRouteEnum {
  const obj = Object.create({});
  for (let key in config) {
    if (config.hasOwnProperty(key)) {
      Object.assign(obj, { [key]: config[key].name });
    }
  }
  return obj;
}

const routeNames = mapRouteNames(routeConfig);
export { routeConfig, routeNames };
