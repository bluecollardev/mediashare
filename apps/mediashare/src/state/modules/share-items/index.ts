import { createAsyncThunk, createReducer } from '@reduxjs/toolkit';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { makeActions, makeEnum } from '../../core/factory';

import * as reducers from '../../core/reducers';
import { ApiService } from '../../apis';

const SHARE_ITEM_ACTIONS = ['GET_SHARE_ITEM', 'REMOVE_SHARE_ITEM', 'FIND_SHARE_ITEMS'] as const;

export const shareItemsActionTypes = makeEnum(SHARE_ITEM_ACTIONS);

// export const shareItemsActions = makeActions(SHARE_ITEM_ACTIONS);

export const getShareItemById = createAsyncThunk(shareItemsActionTypes.getShareItem, async (id: string, { extra }) => {
  const { api } = extra as { api: ApiService };
  const response = await api.shareItems.shareItemsControllerFindOne({ shareId: id });
  return response;
});

export const findShareItems = createAsyncThunk(shareItemsActionTypes.findShareItems, async (opts: {} | undefined, { extra }) => {
  const { api } = extra as { api: ApiService };
  const response = await api.shareItems.shareItemsControllerFindAll(opts);
  return response;
});

export const removeShareItem = createAsyncThunk(shareItemsActionTypes.removeShareItem, async (id: string, { extra }) => {
  const { api } = extra as { api: ApiService };
  const response = await api.shareItems.shareItemsControllerRemove({ shareId: id });
  return response;
});

const initialState = {};

export const SHARE_ITEMS_STATE_KEY = 'shareItems';

const shareItemsReducer = createReducer(
  initialState,
  (builder) =>
    builder
      .addCase(getShareItemById.fulfilled, reducers.addItem(SHARE_ITEMS_STATE_KEY))
      .addCase(findShareItems.fulfilled, reducers.loadItems(SHARE_ITEMS_STATE_KEY))
  // .addCase(removeShareItem.fulfilled, reducers.removeItem(SHARE_ITEMS_STATE_KEY))
);

export { shareItemsReducer };
