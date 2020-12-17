import devTools from 'remote-redux-devtools';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { persistStore } from 'redux-persist';
import reducer from '../../src/reducers';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function configureStore(onCompletion: () => void): any {
  const enhancer = compose(
    applyMiddleware(thunk),
    devTools({
      name: 'nativestarterkit',
      realtime: true
    })
  );

  const store = createStore(reducer, enhancer);
  // persistStore(store, onCompletion);

  return store;
}
