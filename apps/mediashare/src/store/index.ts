import { Middleware } from 'redux';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { bindActionCreators, configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';

import { apis } from './apis';
import { rootReducer as reducer } from './reducers';
import { loading, setError } from './modules/app-state';
import { clearMediaItemSelection } from './modules/media-items';

const errorMiddleware: Middleware = function exampleMiddleware(store) {
  return function wrapDispatch(next) {
    return function handleAction(action) {
      if (action.type.includes('rejected')) {
        const msg = `${JSON.stringify(action, null, 2)}`;
        action.error.name = 'Ajax request was rejected';
        action.error.message = `Action [${action.type}] failed.\nAPI returned ${action.error.message}.\n\n${msg}`;
        return store.dispatch(setError(action.error));
      }
      return next(action);
    };
  };
};

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .prepend(thunk.withExtraArgument({ api: apis }))
      .concat(errorMiddleware),
});
export const actions = bindActionCreators({ clearMediaItemSelection }, store.dispatch);

export const loadStateAction = bindActionCreators(loading, store.dispatch);
export const setErrorAction = bindActionCreators(setError, store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = ReturnType<typeof store.dispatch>;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
