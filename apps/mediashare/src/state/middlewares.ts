import thunk from 'redux-thunk';
import { Configuration, MediaItemsApi, PlaylistsApi, ShareItemsApi, UserApi, UsersApi } from '../api';
import { DefaultApi } from '../api/apis/DefaultApi';

export interface ApiService {
  default: DefaultApi;
  mediaItems: MediaItemsApi;
  playlists: PlaylistsApi;
  shareItems: ShareItemsApi;
  user: UserApi;
  users: UsersApi;
}

export class ApiService {
  constructor(config: Configuration) {
    this.default = new DefaultApi(config);
    this.mediaItems = new MediaItemsApi(config);
    this.playlists = new PlaylistsApi(config);
    this.shareItems = new ShareItemsApi(config);
    this.user = new UserApi(config);
    this.users = new UsersApi(config);
  }
}

export interface ThunkExtra extends ApiService {}

function middlewareFactory() {
  const apiService = new ApiService(null);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return (store) => (next) => (action) => thunk.withExtraArgument({ api: apiService });
}

const loggerMiddleware = (store) => (next) => (action) => {
  console.group(action.type);
  console.info('dispatching', action);
  let result = next(action);
  console.log('next state', store.getState());
  console.groupEnd();
  return result;
};

const apiMiddleware = middlewareFactory();

export { apiMiddleware, loggerMiddleware };
