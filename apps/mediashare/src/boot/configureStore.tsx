import thunk from 'redux-thunk';
import { rootReducer as reducer } from '../state/reducers';
import { bindActionCreators, configureStore } from '@reduxjs/toolkit';
// import { loggerMiddleware } from '../state/middlewares';
import { apis } from '../state/apis';
import { clearMediaItemSelection } from '../state/modules/media-items/index';
import { loading } from '../state/modules/app-state';

const store = configureStore({
  reducer,
  middleware: [thunk.withExtraArgument({ api: apis })],
});

const actions = bindActionCreators({ clearMediaItemSelection }, store.dispatch);
export const loadStateAction = bindActionCreators(loading, store.dispatch);

export { store, actions };
