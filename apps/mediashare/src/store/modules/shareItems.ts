// TODO: We need to finish this...
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { makeActions } from 'mediashare/store/factory';
import { reducePendingState, reduceRejectedState, reduceFulfilledState } from 'mediashare/store/helpers';
import { ApiService } from 'mediashare/store/apis';
import { ShareItemsResponseDto } from 'mediashare/rxjs-api';

// Define these in snake case or our converter won't work... we need to fix that
const shareItemActionNames = [
  'get_share_item',
  'remove_share_item',
  'find_items_i_am_sharing',
  'find_items_shared_with_me',
  'read_share_item',
] as const;

export const shareItemsActions = makeActions(shareItemActionNames);

export const getShareItemById = createAsyncThunk(shareItemsActions.getShareItem.type, async (id: string, { extra }) => {
  const { api } = extra as { api: ApiService };
  return await api.shareItems.shareItemsControllerFindOne({ shareId: id }).toPromise();
});

export const findItemsIAmSharing = createAsyncThunk(shareItemsActions.findItemsIAmSharing.type, async (opts: {} | undefined, { extra }) => {
  const { api } = extra as { api: ApiService };
  return await api.user.userControllerGetSharesPlaylists(opts).toPromise();
});

export const findItemsSharedWithMe = createAsyncThunk(shareItemsActions.findItemsSharedWithMe.type, async (opts: {} | undefined, { extra }) => {
  const { api } = extra as { api: ApiService };
  return await api.shareItems.shareItemsControllerFindAll(opts).toPromise();
});

export const readShareItem = createAsyncThunk(shareItemsActions.readShareItem.type, async (id: string, { extra }) => {
  const { api } = extra as { api: ApiService };
  return await api.shareItems.shareItemsControllerReadSharedItem({ shareId: id }).toPromise();
});

export const removeShareItem = createAsyncThunk(shareItemsActions.removeShareItem.type, async (id: string, { extra }) => {
  const { api } = extra as { api: ApiService };
  return await api.shareItems.shareItemsControllerRemove({ shareId: id }).toPromise();
});

interface ShareItemsState {
  selected: ShareItemsResponseDto[];
  entities: ShareItemsResponseDto[];
  loading: boolean;
  loaded: boolean;
}

const shareItemsInitialState: ShareItemsState = {
  selected: [],
  entities: [],
  loading: false,
  loaded: false,
};

const shareItemsSlice = createSlice({
  name: 'shareItems',
  initialState: shareItemsInitialState,
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
      .addCase(removeShareItem.fulfilled, reduceFulfilledState())
  },
});

export default shareItemsSlice;
export const reducer = shareItemsSlice.reducer;
