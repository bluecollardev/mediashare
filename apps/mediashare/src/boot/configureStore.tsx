import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore } from 'redux';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { persistStore } from 'redux-persist';

import INITIAL_STATE from '../state';

// import { rootReducer } from '../state/root';
import { reducers as reducer } from '../state/reducers';
import { configureStore } from '@reduxjs/toolkit';
import { apiMiddleware, loggerMiddleware } from '../state/middlewares';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
// export default function configureStore(onCompletion: () => void): any {
//   const middleware = [thunk.withExtraArgument({ api: apis })];
//   // @ts-ignore

//   const composeEnhancers = composeWithDevTools({
//     name: 'nativestarterkit',
//     realtime: true,
//   });

//   const store = createStore(
//     reducers,
//     INITIAL_STATE
//     // @ts-ignore
//     // composeEnhancers(applyMiddleware(...middleware))
//   );

//   // persistStore(store, onCompletion);
//   return store;
// }

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiMiddleware).concat([loggerMiddleware]),
});

export default store;
