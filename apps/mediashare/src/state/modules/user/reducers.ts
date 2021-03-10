import { makeActions, makeEnum } from '../../core/types';

import { createReducer } from '@reduxjs/toolkit';

const USER_ACTIONS = ['GET_USER', 'FIND_USER', 'REMOVE_USER', 'UPDATE_USER'] as const;
const USERS_ACTIONS = ['ADD_USERS', 'REMOVE_USERS', 'GET_USERS', 'FIND_USERS'] as const;
const USER_MEDIA_ITEMS_ACTIONS = [
  'ADD_USER_MEDIA_ITEMS',
  'REMOVE_USER_MEDIA_ITEMS',
  'GET_USER_MEDIA_ITEMS',
  'FIND_USER_MEDIA_ITEMS',
];

const ActionTypes = makeEnum(USER_ACTIONS);

const [userActions, usersActions, userMediActions] = [
  makeActions(USER_ACTIONS),
  makeActions(USERS_ACTIONS),
  makeActions(USER_MEDIA_ITEMS_ACTIONS),
];

const userReducer = createReducer([], (builder) => builder.addCase(ActionTypes.getUser));

export { userActions, usersActions, userMediActions };
