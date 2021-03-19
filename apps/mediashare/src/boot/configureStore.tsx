// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { persistStore } from 'redux-persist';

// import { rootReducer } from '../state/root';
import { reducers as reducer } from '../state/reducers';
import { configureStore } from '@reduxjs/toolkit';
import { apiMiddleware, loggerMiddleware } from '../state/middlewares';

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiMiddleware).concat([loggerMiddleware]),
});

export default store;
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

// const apis = {
//   default: new DefaultApi(),
//   mediaItems: new MediaItemsApi(),
//   shareItems: new ShareItemsApi(),
//   user: new UserApi(),
//   users: new UsersApi(),
// };

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
