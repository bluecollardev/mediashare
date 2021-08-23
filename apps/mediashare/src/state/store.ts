import { combineReducers, configureStore, createStore } from '@reduxjs/toolkit';
import { rootReducer } from './reducers';

export const store = createStore(rootReducer);

export type AppDispatch = typeof store.dispatch;
