import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { makeActions } from 'mediashare/store/factory';

import { ApiService } from 'mediashare/store/apis';
import { ShareItemsResponseDto } from 'mediashare/rxjs-api';
import { reducePendingState, reduceRejectedState, reduceFulfilledState } from 'mediashare/store/helpers';

const shareItemActionNames = [
  'get_share_item',
  'remove_share_item',
  'find_items_i_am_sharing',
  'find_items_shared_with_me',
  'read_share_item'
] as const;

export const shareItemsActionTypes = makeActions(shareItemActionNames);

export const getShareItemById = createAsyncThunk(shareItemsActionTypes.getShareItem.type, async (id: string, { extra }) => {
  const { api } = extra as { api: ApiService };
  return await api.shareItems.shareItemsControllerFindOne({ shareId: id }).toPromise();
});

export const findItemsIAmSharing = createAsyncThunk(shareItemsActionTypes.findItemsIAmSharing.type, async (opts: {} | undefined, { extra }) => {
  const { api } = extra as { api: ApiService };
  return await api.user.userControllerGetSharesPlaylists(opts).toPromise();
});

export const findItemsSharedWithMe = createAsyncThunk(shareItemsActionTypes.findItemsSharedWithMe.type, async (opts: {} | undefined, { extra }) => {
  const { api } = extra as { api: ApiService };
  return await api.shareItems.shareItemsControllerFindAll(opts).toPromise();
});

export const readShareItem = createAsyncThunk(shareItemsActionTypes.readShareItem.type, async (id: string, { extra }) => {
  const { api } = extra as { api: ApiService };
  return await api.shareItems.shareItemsControllerReadSharedItem({ shareId: id }).toPromise();
});

export const removeShareItem = createAsyncThunk(shareItemsActionTypes.removeShareItem.type, async (id: string, { extra }) => {
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

export default shareItemsSlice;
export const reducer = shareItemsSlice.reducer;
