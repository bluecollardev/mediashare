import thunk from 'redux-thunk';

import { ApiService } from './apis';

export interface ThunkExtra extends ApiService {}

function middlewareFactory(api: ApiService) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return (store) => (next) => (action) => {
    return thunk.withExtraArgument({ api });
  };
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const loggerMiddleware = (store) => (next) => (action) => {
  /* console.group(action.type);
  console.info('dispatching', action);
  console.log('next state', store.getState());
  console.groupEnd(); */
  return next(action);
};

export { loggerMiddleware, middlewareFactory };
