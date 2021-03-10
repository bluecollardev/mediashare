/* eslint-disable @typescript-eslint/no-unused-vars */
import { combineReducers } from 'redux';
import { ReducerFactory } from './core/reducer';
import playlistReducer from './modules/playlists/reducer';
import rootReducerDict from './root-reducer';

const rootReducer = ReducerFactory(rootReducerDict);
console.log('🚀 ----------------------------------------------------------');
console.log('🚀 ~ file: reducers.ts ~ line 8 ~ rootReducer', rootReducer);
console.log('🚀 ----------------------------------------------------------');

const reducers = combineReducers(rootReducer);

export { reducers };
