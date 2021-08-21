import { DefaultApi, MediaItemsApi, ShareItemsApi, Configuration, UserApiFactory } from '../api';
import { UserApi, UsersApi, PlaylistsApi } from '../rxjs-api';
import axios from 'axios';
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
  baseOptions: {
    headers: {},
  },
} as Configuration;

export const basePath = 'http://localhost:5000';

const userService = UserApiFactory(configuration, basePath, axios);

const apis: ApiService = {
  default: new DefaultApi(configuration, basePath),
  mediaItems: new MediaItemsApi(configuration, basePath),
  shareItems: new ShareItemsApi(configuration, basePath),
  playlists: new PlaylistsApi(),
  user: new UserApi(),
  users: new UsersApi(),
};

export { apis, userService };
