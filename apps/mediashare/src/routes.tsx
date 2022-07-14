import React from 'react';

import { AppHeader } from 'mediashare/components/layout';

const routeConfig = {
  login: {
    name: 'login',
    options: { title: '', header: () => null },
  },
  browse: {
    name: 'browse',
    options: { title: 'My Feed', header: (props) => <AppHeader {...props} searchable={false} showDisplayControls={true} /> },
  },
  search: {
    name: 'search',
    options: { title: 'Search', header: (props) => <AppHeader {...props} searchable={true} searchTarget="playlists" hideSearchIcon={true} /> },
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
  playlistItemDetail: {
    name: 'playlistItemDetail',
    options: { title: 'Playlist Item', header: (props) => <AppHeader {...props} /> },
  },
  playlistItemEdit: {
    name: 'playlistItemEdit',
    options: { title: 'Edit Playlist Item', header: (props) => <AppHeader {...props} /> },
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
  addItemsToPlaylist: {
    name: 'addItemsToPlaylist',
    options: { title: 'Add Items To Playlist', header: (props) => <AppHeader {...props} searchable={true} searchTarget="playlists" /> },
  },
  shareWith: {
    name: 'shareWith',
    options: { title: 'Share With', header: (props) => <AppHeader {...props} searchable={true} /> },
  },
  account: {
    name: 'account',
    options: { title: 'My Account', header: (props) => <AppHeader {...props} showNotificationsMenu={true} /> },
  },
  accountEdit: {
    name: 'accountEdit',
    options: { title: 'Update Account', header: (props) => <AppHeader {...props} /> },
  },
  contact: {
    name: 'contact',
    options: { title: 'Contact', header: (props) => <AppHeader {...props} /> },
  },
  sharedWithContact: {
    name: 'sharedWithContact',
    options: { title: `Items You're Sharing`, header: (props) => <AppHeader {...props} /> },
  },
  sharedByContact: {
    name: 'sharedByContact',
    options: { title: `Items They're Sharing`, header: (props) => <AppHeader {...props} /> },
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
