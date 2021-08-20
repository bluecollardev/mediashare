'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.routeConfig = void 0;
const LoginContainer_1 = __importDefault(require('./container/LoginContainer'));
const HomeContainer_1 = __importDefault(require('./container/HomeContainer'));
const ExploreContainer_1 = __importDefault(require('./container/ExploreContainer'));
const AddFromLibraryContainer_1 = __importDefault(require('./container/AddFromLibraryContainer'));
const AddToPlaylistContainer_1 = __importDefault(require('./container/AddToPlaylistContainer'));
const AddFromFeedContainer_1 = __importDefault(require('./container/AddFromFeedContainer'));
const PlaylistsContainer_1 = __importDefault(require('./container/PlaylistsContainer'));
const PlaylistDetailContainer_1 = __importDefault(require('./container/PlaylistDetailContainer'));
const PlaylistEditContainer_1 = __importDefault(require('./container/PlaylistEditContainer'));
const LibraryContainer_1 = __importDefault(require('./container/LibraryContainer'));
const LibraryItemDetailContainer_1 = __importDefault(require('./container/LibraryItemDetailContainer'));
const LibraryItemEditContainer_1 = __importDefault(require('./container/LibraryItemEditContainer'));
const ShareWithContainer_1 = __importDefault(require('./container/ShareWithContainer'));
const SettingsContainer_1 = __importDefault(require('./container/SettingsContainer'));
const AppScreenHeader_1 = require('./components/layout/AppScreenHeader');
exports.routeConfig = {
  login: {
    name: 'login',
    component: LoginContainer_1.default,
    options: { title: 'Login', header: AppScreenHeader_1.AppScreenHeader },
  },
  home: {
    name: 'home',
    component: HomeContainer_1.default,
    options: { title: 'Home', header: AppScreenHeader_1.AppScreenHeader },
  },
  explore: {
    name: 'explore',
    component: ExploreContainer_1.default,
    options: { title: 'Explore', header: AppScreenHeader_1.AppScreenHeader },
  },
  playlists: {
    name: 'playlists',
    component: PlaylistsContainer_1.default,
    options: { title: 'Playlists', header: AppScreenHeader_1.AppScreenHeader },
  },
  playlistDetail: {
    name: 'playlistDetail',
    component: PlaylistDetailContainer_1.default,
    options: { title: 'Playlist', header: AppScreenHeader_1.AppScreenHeader },
  },
  playlistEdit: {
    name: 'playlistEdit',
    component: PlaylistEditContainer_1.default,
    options: { title: 'Edit Playlist', header: AppScreenHeader_1.AppScreenHeader },
  },
  library: {
    name: 'library',
    component: LibraryContainer_1.default,
    options: { title: 'Library', header: AppScreenHeader_1.AppScreenHeader },
  },
  libraryItemDetail: {
    name: 'libraryItemDetail',
    component: LibraryItemDetailContainer_1.default,
    options: { title: 'Library Item', header: AppScreenHeader_1.AppScreenHeader },
  },
  libraryItemEdit: {
    name: 'libraryItemEdit',
    component: LibraryItemEditContainer_1.default,
    options: { title: 'Edit Library Item', header: AppScreenHeader_1.AppScreenHeader },
  },
  addFromFeed: {
    name: 'addFromFeed',
    component: AddFromFeedContainer_1.default,
    options: { title: 'Add From Feed', header: AppScreenHeader_1.AppScreenHeader },
  },
  addFromLibrary: {
    name: 'addFromLibrary',
    component: AddFromLibraryContainer_1.default,
    options: { title: 'Add From Library', header: AppScreenHeader_1.AppScreenHeader },
  },
  addToPlaylist: {
    name: 'addToPlaylist',
    component: AddToPlaylistContainer_1.default,
    options: { title: 'Add To Playlist', header: AppScreenHeader_1.AppScreenHeader },
  },
  shareWith: {
    name: 'shareWith',
    component: ShareWithContainer_1.default,
    options: { title: 'Share With', header: AppScreenHeader_1.AppScreenHeader },
  },
  settings: {
    name: 'settings',
    component: SettingsContainer_1.default,
    options: { title: 'Settings', header: AppScreenHeader_1.AppScreenHeader },
  },
};
