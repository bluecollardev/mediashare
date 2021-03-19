import { MediaItemsApi, ShareItemsApi, PlaylistsApi, UserApi, UsersApi } from '../api';
import { DefaultApi } from '../api/apis/DefaultApi';

export interface ApiService {
  default: DefaultApi;
  mediaItems: MediaItemsApi;
  playlists: PlaylistsApi;
  shareItems: ShareItemsApi;
  user: UserApi;
  users: UsersApi;
}
const apis: ApiService = {
  default: new DefaultApi(),
  mediaItems: new MediaItemsApi(),
  shareItems: new ShareItemsApi(),
  playlists: new PlaylistsApi(),
  user: new UserApi(),
  users: new UsersApi(),
};

export { apis };
