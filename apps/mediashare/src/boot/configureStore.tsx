import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { persistStore } from 'redux-persist';
import reducers from '../state/reducers';
import { DefaultApi, MediaItemsApi, PlaylistsApi, ShareItemsApi, UserApi, UsersApi } from '../api';

export interface Apis {
  default: DefaultApi;
  mediaItems: MediaItemsApi;
  playlists: PlaylistsApi;
  shareItems: ShareItemsApi;
  user: UserApi;
  users: UsersApi;
}

export interface ThunkExtra extends Apis {}
const playlistsApi = new PlaylistsApi();

const apis: Apis = {
  default: new DefaultApi(),
  mediaItems: new MediaItemsApi(),
  shareItems: new ShareItemsApi(),
  user: new UserApi(),
  users: new UsersApi(),
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function configureStore(onCompletion: () => void): any {
  const middleware = [thunk.withExtraArgument({ api: apis })];
  // @ts-ignore
  const composeEnhancers = composeWithDevTools({
    name: 'nativestarterkit',
    realtime: true,
  });

  const store = createStore(
    reducers,
    // @ts-ignore
    composeEnhancers(applyMiddleware(...middleware))
  );
  // persistStore(store, onCompletion);
  return store;
}
