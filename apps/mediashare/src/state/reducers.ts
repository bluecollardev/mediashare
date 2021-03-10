/* eslint-disable @typescript-eslint/no-unused-vars */
import { combineReducers } from 'redux';
// import { ReducerFactory } from './core/reducer';
// import rootReducerDict from './root-reducer';
// const rootReducer = ReducerFactory(rootReducerDict);

import { userReducer, usersReducer } from './modules/user';

const reducers = combineReducers({
  userReducer,
  usersReducer
});

export { reducers };
