import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { makeEnum } from '../../core/factory';

import { ApiService } from '../../apis';
import { ShareItemsResponseDto } from '../../../../../media-api/src/app/controllers/share-items/share-items.dto';
import { reducePendingState, reduceRejectedState, reduceFulfilledState } from '../../helpers';

const SHARE_ITEM_ACTIONS = ['GET_SHARE_ITEM', 'REMOVE_SHARE_ITEM', 'FIND_ITEMS_I_AM_SHARING', 'FIND_ITEMS_SHARED_WITH_ME', 'READ_SHARE_ITEM'] as const;

export const shareItemsActionTypes = makeEnum(SHARE_ITEM_ACTIONS);

export const getShareItemById = createAsyncThunk(shareItemsActionTypes.getShareItem, async (id: string, { extra }) => {
  const { api } = extra as { api: ApiService };
  return await api.shareItems.shareItemsControllerFindOne({ shareId: id }).toPromise();
});

export const findItemsIAmSharing = createAsyncThunk(shareItemsActionTypes.findItemsIAmSharing, async (opts: {} | undefined, { extra }) => {
  const { api } = extra as { api: ApiService };
  return await api.user.userControllerGetSharesPlaylists(opts).toPromise();
});

export const findItemsSharedWithMe = createAsyncThunk(shareItemsActionTypes.findItemsSharedWithMe, async (opts: {} | undefined, { extra }) => {
  const { api } = extra as { api: ApiService };
  return await api.shareItems.shareItemsControllerFindAll(opts).toPromise();
});
export const readShareItem = createAsyncThunk(shareItemsActionTypes.readShareItem, async (id: string, { extra }) => {
  const { api } = extra as { api: ApiService };
  return await api.shareItems.shareItemsControllerReadSharedItem({ shareId: id }).toPromise();
});

export const removeShareItem = createAsyncThunk(shareItemsActionTypes.removeShareItem, async (id: string, { extra }) => {
  const { api } = extra as { api: ApiService };
  return await api.shareItems.shareItemsControllerRemove({ shareId: id }).toPromise();
});

interface InitialState {
  selected: ShareItemsResponseDto[];
  entities: ShareItemsResponseDto[];
  loading: boolean;
  loaded: boolean;
}

const INITIAL_STATE: InitialState = {
  selected: [],
  entities: [],
  loading: false,
  loaded: false,
};

const shareItemsSlice = createSlice({
  name: 'shareItems',
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getShareItemById.pending, reducePendingState())
      .addCase(getShareItemById.rejected, reduceRejectedState())
      .addCase(getShareItemById.fulfilled, reduceFulfilledState())
      .addCase(findItemsIAmSharing.pending, reducePendingState())
      .addCase(findItemsIAmSharing.rejected, reduceRejectedState())
      .addCase(findItemsIAmSharing.fulfilled, reduceFulfilledState())
      .addCase(findItemsSharedWithMe.pending, reducePendingState())
      .addCase(findItemsSharedWithMe.rejected, reduceRejectedState())
      .addCase(findItemsSharedWithMe.fulfilled, reduceFulfilledState())
      .addCase(readShareItem.pending, reducePendingState())
      .addCase(readShareItem.rejected, reduceRejectedState())
      .addCase(readShareItem.fulfilled, reduceFulfilledState())
      .addCase(removeShareItem.pending, reducePendingState())
      .addCase(removeShareItem.rejected, reduceRejectedState())
      .addCase(removeShareItem.fulfilled, reduceFulfilledState());
  },
});

const { reducer } = shareItemsSlice;
export { reducer };
