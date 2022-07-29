import { AppHeader } from 'mediashare/components/layout';
import React from 'react';

const routeConfig = {
  login: {
    name: 'login',
    options: { title: '', header: () => null },
  },
  search: {
    name: 'search',
    options: {
      title: 'Search',
      header: (props) => <AppHeader {...props} searchable={true} searchTarget="playlists" hideSearchIcon={true} showAccountMenu={true} />,
    },
  },
  playlists: {
    name: 'playlists',
    options: {
      title: 'Playlists',
      header: (props) => <AppHeader {...props} searchable={true} searchTarget="playlists" showAccountMenu={true} />,
    },
  },
  playlistAdd: {
    name: 'playlistAdd',
    options: { title: 'Create Playlist', header: (props) => <AppHeader {...props} showAccountMenu={true} /> },
  },
  playlistDetail: {
    name: 'playlistDetail',
    options: { title: 'Playlist', header: (props) => <AppHeader {...props} showAccountMenu={true} /> },
  },
  playlistEdit: {
    name: 'playlistEdit',
    options: { title: 'Edit Playlist', header: (props) => <AppHeader {...props} showAccountMenu={true} /> },
  },
  playlistItemDetail: {
    name: 'playlistItemDetail',
    options: { title: 'Playlist Item', header: (props) => <AppHeader {...props} showAccountMenu={true} /> },
  },
  playlistItemEdit: {
    name: 'playlistItemEdit',
    options: { title: 'Edit Playlist Item', header: (props) => <AppHeader {...props} showAccountMenu={true} /> },
  },
  media: {
    name: 'media',
    options: {
      title: 'Media Library',
      header: (props) => <AppHeader {...props} searchable={true} searchTarget="media" showAccountMenu={true} />,
    },
  },
  mediaItemAdd: {
    name: 'addMediaItem',
    options: { title: 'Upload', header: (props) => <AppHeader {...props} showAccountMenu={true} /> },
  },
  mediaItemDetail: {
    name: 'mediaItemDetail',
    options: { title: 'File Details', header: (props) => <AppHeader {...props} showAccountMenu={true} /> },
  },
  mediaItemEdit: {
    name: 'mediaItemEdit',
    options: { title: 'Edit Media', header: (props) => <AppHeader {...props} showAccountMenu={true} /> },
  },
  addFromFeed: {
    name: 'addFromFeed',
    options: { title: 'Import From S3 Bucket', header: (props) => <AppHeader {...props} showAccountMenu={true} /> },
  },
  addItemsToPlaylist: {
    name: 'addItemsToPlaylist',
    options: {
      title: 'Add Items To Playlist',
      header: (props) => <AppHeader {...props} searchable={true} searchTarget="playlists" showAccountMenu={true} />,
    },
  },
  shareWith: {
    name: 'shareWith',
    options: {
      title: 'Share With',
      header: (props) => <AppHeader {...props} searchable={true} showAccountMenu={true} />,
    },
  },
  account: {
    name: 'account',
    options: {
      title: 'My Account',
      header: (props) => <AppHeader {...props} showNotificationsMenu={true} showAccountMenu={false} />,
    },
  },
  accountEdit: {
    name: 'accountEdit',
    options: { title: 'Update Account', header: (props) => <AppHeader {...props} showAccountMenu={false} /> },
  },
  contact: {
    name: 'contact',
    options: {
      title: 'Contact',
      header: (props) => <AppHeader {...props} showAccountMenu={false} showNotificationsMenu={true} />,
    },
  },
  sharedWithContact: {
    name: 'sharedWithContact',
    options: { title: `Items You're Sharing`, header: (props) => <AppHeader {...props} showAccountMenu={true} /> },
  },
  sharedByContact: {
    name: 'sharedByContact',
    options: { title: `Items They're Sharing`, header: (props) => <AppHeader {...props} showAccountMenu={true} /> },
  },
  feed: {
    name: 'feed',
    options: {
      title: 'My Feed',
      header: (props) => <AppHeader {...props} searchable={true} showDisplayControls={false} showAccountMenu={true} />,
    },
  },
  feedSharedWithMe: {
    name: 'feedSharedWithMe',
    options: {
      title: 'Shared With Me',
      header: (props) => <AppHeader {...props} searchable={false} showDisplayControls={true} showAccountMenu={true} />,
    },
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
