import thunk from 'redux-thunk';
import { rootReducer as reducer } from '../state/reducers';
import { bindActionCreators, configureStore } from '@reduxjs/toolkit';
// import { loggerMiddleware } from '../state/middlewares';
import { apis } from '../state/apis';
import { clearMediaItemSelection } from '../state/modules/media-items';
import { loading, setError } from '../state/modules/app-state';
import { Middleware } from 'redux';

const errorMiddleware: Middleware = function exampleMiddleware(store) {
  return function wrapDispatch(next) {
    return function handleAction(action) {
      if (action.type.includes('rejected')) {
        const msg = `${JSON.stringify(action, null, 2)}`;
        action.error.name = `Ajax request was rejected`;
        action.error.message = `Action [${action.type}] failed.\nAPI returned ${action.error.message}.\n\n${msg}`;
        return store.dispatch(setError(action.error));
      }
      return next(action);
    };
  };
};

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .prepend(thunk.withExtraArgument({ api: apis }))
      .concat(errorMiddleware),
});

const actions = bindActionCreators({ clearMediaItemSelection }, store.dispatch);
export const loadStateAction = bindActionCreators(loading, store.dispatch);
export const setErrorAction = bindActionCreators(setError, store.dispatch);

export { store, actions };
