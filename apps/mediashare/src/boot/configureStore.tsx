// eslint-disable-next-line @typescript-eslint/no-unused-vars

// import { rootReducer } from '../state/root';
import { rootReducer as reducer } from '../state/reducers';
import { configureStore } from '@reduxjs/toolkit';
import { middlewareFactory, loggerMiddleware } from '../state/middlewares';
import { apis } from '../state/apis';

const store = configureStore({
  reducer,
  middleware: [loggerMiddleware, middlewareFactory(apis)],
});

export { store };
// import { rootReducer } from '../state/reducers';

// export interface Apis {
//   default: DefaultApi;
//   mediaItems: MediaItemsApi;
//   playlists: PlaylistsApi;
//   shareItems: ShareItemsApi;
//   user: UserApi;
//   users: UsersApi;
// }

// export interface ThunkExtra extends Apis {}

// // eslint-disable-next-line @typescript-eslint/no-unused-vars
// export default function configureStore(onCompletion: () => void): any {
//   const middleware = [thunk.withExtraArgument({ api: apis })];
//   // @ts-ignore
//   const composeEnhancers = composeWithDevTools({
//     name: 'nativestarterkit',
//     realtime: true,
//   });

//   const store = createStore(
//     rootReducer,
//     // @ts-ignore
//     composeEnhancers(applyMiddleware(...middleware))
//   );

//   // persistStore(store, onCompletion);
//   return store;
// }
