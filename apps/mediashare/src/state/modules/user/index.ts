import { createReducer } from '@reduxjs/toolkit';

import { makeActions, makeEnum } from '../../core/factory';
import { MediaItemDto, UserDto } from '../../../api';

import * as reducers from '../../core/reducers';

export interface UserState {
  users: UserDto[];
  user: UserDto;
  userMediaItems: MediaItemDto[];
}

const USER_ACTIONS = ['REMOVE_USER', 'UPDATE_USER'] as const;
const USERS_ACTIONS = ['ADD_USERS', 'REMOVE_USERS'] as const;
const USER_MEDIA_ITEMS_ACTIONS = [
  'ADD_USER_MEDIA_ITEMS',
  'REMOVE_USER_MEDIA_ITEMS'
];

const ActionTypes = makeEnum(USER_ACTIONS);

const [userActions, usersActions, userMediaActions] = [
  makeActions(USER_ACTIONS),
  makeActions(USERS_ACTIONS),
  makeActions(USER_MEDIA_ITEMS_ACTIONS),
];

const initialState = {};

export const USER_STATE_KEY = 'user';
export const USERS_STATE_KEY = 'users';

const userReducer = createReducer(initialState, (builder) => builder
  .addCase(userActions.updateUser, reducers.updateItem(USER_STATE_KEY))
  .addCase(userActions.removeUser, reducers.removeItem(USER_STATE_KEY))
);

const usersReducer = createReducer(initialState, (builder) => builder
  .addCase(usersActions.addUsers, reducers.addItems(USERS_STATE_KEY))
);

export { userActions, usersActions, userMediaActions, userReducer, usersReducer }
