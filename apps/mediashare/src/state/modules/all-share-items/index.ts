import { createAsyncThunk, createReducer } from '@reduxjs/toolkit';

import { makeEnum } from '../../core/factory';

import * as reducers from '../../core/reducers';
import { ApiService } from '../../apis';

const SHARE_ITEM_ACTIONS = ['FIND_SHARE_ITEMS'] as const;

export const shareItemsActionTypes = makeEnum(SHARE_ITEM_ACTIONS);

export const findShareItems = createAsyncThunk(shareItemsActionTypes.findShareItems, async (opts: {} | undefined, { extra }) => {
  const { api } = extra as { api: ApiService };
  const response = await api.shareItems.shareItemsControllerFindAll(opts);
  return response && response.status === 200 ? response.data : undefined;
});

const initialState = {};

export const SHARE_ITEMS_STATE_KEY = 'shareItems';

const shareItemsReducer = createReducer(
  initialState,
  (builder) =>
    builder
      .addCase(findShareItems.fulfilled, reducers.loadItems(SHARE_ITEMS_STATE_KEY))
);

export { shareItemsReducer };
