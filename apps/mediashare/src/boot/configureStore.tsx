import thunk from 'redux-thunk';
import { rootReducer as reducer } from '../state/reducers';
import { configureStore } from '@reduxjs/toolkit';
import { loggerMiddleware } from '../state/middlewares';
import { apis } from '../state/apis';

const store = configureStore({
  reducer,
  middleware: [thunk.withExtraArgument({ api: apis })],
});

export { store };
