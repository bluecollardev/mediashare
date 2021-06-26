import { DefaultApi, MediaItemsApi, ShareItemsApi, PlaylistsApi, UserApi, UsersApi, Configuration } from '../api';

export interface ApiService {
  default: DefaultApi;
  mediaItems: MediaItemsApi;
  playlists: PlaylistsApi;
  shareItems: ShareItemsApi;
  user: UserApi;
  users: UsersApi;
}

export const configuration = {
  username: '',
  password: '',
  accessToken: '',
  baseOptions: {},
} as Configuration;

export const basePath = 'http://localhost:3333';

const apis: ApiService = {
  default: new DefaultApi(configuration, basePath),
  mediaItems: new MediaItemsApi(configuration, basePath),
  shareItems: new ShareItemsApi(configuration, basePath),
  playlists: new PlaylistsApi(configuration, basePath),
  user: new UserApi(configuration, basePath),
  users: new UsersApi(configuration, basePath),
};

export { apis };
