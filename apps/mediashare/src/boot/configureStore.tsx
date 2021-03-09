import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { persistStore } from 'redux-persist';
import reducer from '../../src/reducers';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function configureStore(onCompletion: () => void): any {
  const middleware = [thunk.withExtraArgument({})];
  // @ts-ignore
  const composeEnhancers = composeWithDevTools({
    name: 'nativestarterkit',
    realtime: true,
  });

  const store = createStore(
    reducer,
    // @ts-ignore
    composeEnhancers(applyMiddleware(...middleware))
  );
  // persistStore(store, onCompletion);
  return store;
}
