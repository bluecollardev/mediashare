import { createReducer } from '@reduxjs/toolkit';

import { makeActions, makeEnum } from '../../core/factory';
import { UserDto } from '../../../api';

export const USER_STATE_KEY = 'user';

export interface UserState extends UserDto {}

// We don't define any 'get' actions as they don't update state - use redux selectors instead
const USER_ACTIONS = ['LOGIN', 'LOGOUT', 'UPDATE_ACCOUNT', 'DELETE_ACCOUNT'] as const;
export const ActionTypes = makeEnum(USER_ACTIONS);

console.log('🚀 --------------------------------------------------------');
console.log('🚀 ~ file: index.ts ~ line 13 ~ ActionTypes', ActionTypes.login);
console.log('🚀 --------------------------------------------------------');
export const UserActions = makeActions(USER_ACTIONS);

const initialState = {
  user: null,
};

export const userReducer = createReducer(initialState, (builder) =>
  builder
    .addCase(UserActions.login, (state) => state)
    .addCase(UserActions.logout, (state) => state)
    .addCase(UserActions.updateAccount, (state) => state)
    .addCase(UserActions.deleteAccount, (state) => state)
);
