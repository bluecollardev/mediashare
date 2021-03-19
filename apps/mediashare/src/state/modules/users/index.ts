import { createReducer } from '@reduxjs/toolkit';

import { makeActions, makeEnum } from '../../core/factory';
// import { UserDto } from '../../../api';

import * as genericListReducers from '../../core/reducers';

export const USERS_STATE_KEY = 'users';

export interface UsersState {}

// We don't define any 'get' actions as they don't update state - use redux selectors instead
const USERS_ACTIONS = ['LOAD_USERS', 'ADD_USER', 'ADD_USERS', 'REMOVE_USER', 'REMOVE_USERS'] as const;
export const ActionTypes = makeEnum(USERS_ACTIONS);
export const UsersActions = makeActions(USERS_ACTIONS);

const initialState: UsersState = {};

export const usersReducer = createReducer(initialState, (builder) =>
  builder
    .addCase(UsersActions.loadUsers, genericListReducers.addItems(USERS_STATE_KEY))
    .addCase(UsersActions.addUser, genericListReducers.addItems(USERS_STATE_KEY))
    .addCase(UsersActions.addUsers, genericListReducers.addItems(USERS_STATE_KEY))
    .addCase(UsersActions.removeUser, genericListReducers.removeItem(USERS_STATE_KEY))
    .addCase(UsersActions.removeUsers, genericListReducers.removeItem(USERS_STATE_KEY))
);
