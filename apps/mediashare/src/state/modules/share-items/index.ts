import { createReducer } from '@reduxjs/toolkit';

import { makeActions, makeEnum } from '../../core/factory';

import * as reducers from '../../core/reducers';

const SHARE_ITEM_ACTIONS = [
  'ADD_SHARE_ITEMS',
  'UPDATE_SHARE_ITEMS',
  'REMOVE_SHARE_ITEMS'
] as const;

export const ShareItemsActionTypes = makeEnum(SHARE_ITEM_ACTIONS);

export const shareItemsActions = makeActions(SHARE_ITEM_ACTIONS);

const initialState = {};

export const SHARE_ITEMS_STATE_KEY = 'shareItems';

const shareItemsReducer = createReducer(initialState, (builder) => builder
  .addCase(shareItemsActions.addShareItems, reducers.addItems(SHARE_ITEMS_STATE_KEY))
  .addCase(shareItemsActions.updateShareItems, reducers.updateItems(SHARE_ITEMS_STATE_KEY))
  // .addCase(shareItemActions.removeShareItems, reducers.removeItem(SHARE_ITEMS_STATE_KEY))
);

export { shareItemsReducer };
