import { createAsyncThunk, createReducer } from '@reduxjs/toolkit';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { makeEnum } from '../../core/factory';

import * as reducers from '../../core/reducers';
import { ApiService } from '../../apis';

const SHARE_ITEM_ACTIONS = ['GET_SHARE_ITEM', 'REMOVE_SHARE_ITEM', 'FIND_ITEMS_I_AM_SHARING', 'FIND_ITEMS_SHARED_WITH_ME'] as const;

export const shareItemsActionTypes = makeEnum(SHARE_ITEM_ACTIONS);

export const getShareItemById = createAsyncThunk(shareItemsActionTypes.getShareItem, async (id: string, { extra }) => {
  const { api } = extra as { api: ApiService };
  const response = await api.shareItems.shareItemsControllerFindOne({ shareId: id });
  return response && response.status === 200 ? response.data : undefined;
});

export const findItemsIAmSharing = createAsyncThunk(shareItemsActionTypes.findItemsIAmSharing, async (opts: {} | undefined, { extra }) => {
  const { api } = extra as { api: ApiService };
  const response = await api.shareItems.shareItemsControllerFindAll(opts);
  return response && response.status === 200 ? response.data : undefined;
});

export const findItemsSharedWithMe = createAsyncThunk(shareItemsActionTypes.findItemsSharedWithMe, async (opts: {} | undefined, { extra }) => {
  const { api } = extra as { api: ApiService };
  const response = await api.shareItems.shareItemsControllerFindAll(opts);
  return response && response.status === 200 ? response.data : undefined;
});

export const removeShareItem = createAsyncThunk(shareItemsActionTypes.removeShareItem, async (id: string, { extra }) => {
  const { api } = extra as { api: ApiService };
  const response = await api.shareItems.shareItemsControllerRemove({ shareId: id });
  return response && response.status === 200 ? response.data : undefined;
});

const initialState = {};

export const SHARE_ITEMS_STATE_KEY = 'shareItems';

const shareItemsReducer = createReducer(
  initialState,
  (builder) =>
    builder
      .addCase(getShareItemById.fulfilled, reducers.addItem(SHARE_ITEMS_STATE_KEY))
      .addCase(findItemsSharedWithMe.fulfilled, reducers.loadItems(SHARE_ITEMS_STATE_KEY))
      .addCase(findItemsIAmSharing.fulfilled, reducers.loadItems(SHARE_ITEMS_STATE_KEY))
  // .addCase(removeShareItem.fulfilled, reducers.removeItem(SHARE_ITEMS_STATE_KEY))
);

export { shareItemsReducer };
