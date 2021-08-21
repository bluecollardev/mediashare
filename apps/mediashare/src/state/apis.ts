import { Configuration, UserApiFactory } from '../api';
import { UserApi, UsersApi, PlaylistsApi, DefaultApi, MediaItemsApi, ShareItemsApi } from '../rxjs-api';
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
  default: new DefaultApi(),
  mediaItems: new MediaItemsApi(),
  shareItems: new ShareItemsApi(),
  playlists: new PlaylistsApi(),
  user: new UserApi(),
  users: new UsersApi(),
};

export { apis, userService };
