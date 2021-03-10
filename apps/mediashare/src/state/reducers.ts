/* eslint-disable @typescript-eslint/no-unused-vars */
import { combineReducers } from 'redux';
import { ReducerFactory } from './core/reducer';
import playlistReducer from './modules/playlists/reducer';
import rootReducerDict from './root-reducer';

const rootReducer = ReducerFactory(rootReducerDict);

const reducers = combineReducers(rootReducer);

export { reducers };
