import { createReducer } from '@reduxjs/toolkit';

import { makeActions, makeEnum } from '../../core/factory';

import * as reducers from '../../core/reducers';

const MEDIA_ITEM_ACTIONS = ['ADD_MEDIA_ITEM', 'UPDATE_MEDIA_ITEM', 'REMOVE_MEDIA_ITEM'] as const;
const MEDIA_ITEMS_ACTIONS = ['ADD_MEDIA_ITEMS', 'UPDATE_MEDIA_ITEMS', 'REMOVE_MEDIA_ITEMS'] as const;

export const mediaItemActionTypes = makeEnum(MEDIA_ITEM_ACTIONS);
export const mediaItemsActionTypes = makeEnum(MEDIA_ITEMS_ACTIONS);

const [mediaItemActions, mediaItemsActions] = [makeActions(MEDIA_ITEM_ACTIONS), makeActions(MEDIA_ITEMS_ACTIONS)];

const initialState = {};

export const MEDIA_ITEMS_STATE_KEY = 'mediaItems';

const mediaItemReducer = createReducer(
  initialState,
  (builder) =>
    builder
      .addCase(mediaItemActions.addMediaItem, reducers.addItem(MEDIA_ITEMS_STATE_KEY))
      .addCase(mediaItemActions.updateMediaItem, reducers.updateItem(MEDIA_ITEMS_STATE_KEY))
  // .addCase(mediaItemActions.removeMediaItems, reducers.removeItem(MEDIA_ITEMS_STATE_KEY))
);
const mediaItemsReducer = createReducer(
  initialState,
  (builder) =>
    builder
      .addCase(mediaItemsActions.addMediaItems, reducers.addItems(MEDIA_ITEMS_STATE_KEY))
      .addCase(mediaItemsActions.updateMediaItems, reducers.updateItems(MEDIA_ITEMS_STATE_KEY))
  // .addCase(mediaItemActions.removeMediaItems, reducers.removeItem(MEDIA_ITEMS_STATE_KEY))
);

export { mediaItemActions, mediaItemsActions };
export { mediaItemReducer, mediaItemsReducer };
