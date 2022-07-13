// TODO: We need to finish this...
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { makeActions } from 'mediashare/store/factory';
import { reducePendingState, reduceRejectedState, reduceFulfilledState } from 'mediashare/store/helpers';
import { ApiService } from 'mediashare/store/apis';

// Define these in snake case or our converter won't work... we need to fix that
const shareItemActionNames = [
  'get_share_item',
  'remove_share_item',
  'remove_share_item_all',
  'find_items_shared_by_user',
  'find_items_shared_with_user',
  'read_share_item',
  'remove_share_item_all_by_user_id',
] as const;

export const shareItemsActions = makeActions(shareItemActionNames);

export const getShareItemById = createAsyncThunk(shareItemsActions.getShareItem.type, async (id: string, { extra }) => {
  const { api } = extra as { api: ApiService };
  return await api.shareItems.shareItemControllerFindShareItem({ shareId: id }).toPromise();
});

export const readShareItem = createAsyncThunk(shareItemsActions.readShareItem.type, async (id: string, { extra }) => {
  const { api } = extra as { api: ApiService };
  return await api.shareItems.shareItemControllerReadShareItem({ shareId: id }).toPromise();
});

export const removeShareItem = createAsyncThunk(shareItemsActions.removeShareItem.type, async (id: string, { extra }) => {
  const { api } = extra as { api: ApiService };
  return await api.shareItems.shareItemControllerRemoveShareItem({ shareId: id }).toPromise();
});

export const removeShareItemAll = createAsyncThunk(shareItemsActions.removeShareItemAll.type, async (shareIds: string[], { extra }) => {
  const { api } = extra as { api: ApiService };
  return await api.shareItems.shareItemControllerRemoveShareItemAll({ shareItemsDto: { shareItemIds: shareIds } }).toPromise();
});

export const removeShareItemAllByUserId = createAsyncThunk(shareItemsActions.removeShareItemAllByUserId.type, async (shareUserIds: string[], { extra }) => {
  const { api } = extra as { api: ApiService };
  return await api.shareItems.shareItemControllerRemoveShareItemAllByUserId({ shareItemsByUserIdDto: { shareItemByUserIds: shareUserIds } }).toPromise();
});

export const findItemsSharedByMe = createAsyncThunk(shareItemsActions.findItemsSharedByUser.type, async (opts = undefined, { extra }) => {
  const { api } = extra as { api: ApiService };
  return await api.shareItems.shareItemControllerFindItemsSharedByUser().toPromise();
});

export const findItemsSharedWithMe = createAsyncThunk(shareItemsActions.findItemsSharedWithUser.type, async (opts = undefined, { extra }) => {
  const { api } = extra as { api: ApiService };
  return await api.shareItems.shareItemControllerFindItemsSharedWithUser().toPromise();
});

interface ShareItemsState {
  selected: any[];
  entities: any[];
  loading: boolean;
  loaded: boolean;
}

interface ShareItemState {
  entity: any;
  loading: boolean;
  loaded: boolean;
}

const shareItemsInitialState: {
  shareItem: ShareItemState;
  sharedByMe: ShareItemsState;
  sharedWithMe: ShareItemsState;
} = {
  shareItem: {
    entity: undefined,
    loading: false,
    loaded: false,
  },
  sharedByMe: {
    selected: [],
    entities: [],
    loading: false,
    loaded: false,
  },
  sharedWithMe: {
    selected: [],
    entities: [],
    loading: false,
    loaded: false,
  },
};

const shareItemsSlice = createSlice({
  name: 'shareItems',
  initialState: shareItemsInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        getShareItemById.pending,
        reducePendingState((state) => ({
          ...state,
          shareItem: { entity: undefined, loading: true, loaded: false },
        }))
      )
      .addCase(
        getShareItemById.rejected,
        reduceRejectedState((state) => ({
          ...state,
          shareItem: { entity: undefined, loading: false, loaded: true },
        }))
      )
      .addCase(
        getShareItemById.fulfilled,
        reduceFulfilledState((state, action) => ({
          ...state,
          shareItem: { entity: action.payload, loading: false, loaded: true },
        }))
      )
      .addCase(
        readShareItem.pending,
        reducePendingState((state) => ({
          ...state,
          shareItem: { entity: undefined, loading: true, loaded: false },
        }))
      )
      .addCase(
        readShareItem.rejected,
        reduceRejectedState((state) => ({
          ...state,
          shareItem: { entity: undefined, loading: false, loaded: true },
        }))
      )
      .addCase(
        readShareItem.fulfilled,
        reduceFulfilledState((state, action) => ({
          ...state,
          shareItem: { entity: action.payload, loading: false, loaded: true },
        }))
      )
      .addCase(
        removeShareItem.pending,
        reducePendingState((state) => ({
          ...state,
          shareItem: { entity: undefined, loading: true, loaded: false },
        }))
      )
      .addCase(
        removeShareItem.rejected,
        reduceRejectedState((state) => ({
          ...state,
          shareItem: { entity: undefined, loading: false, loaded: true },
        }))
      )
      .addCase(
        removeShareItem.fulfilled,
        reduceFulfilledState((state, action) => ({
          ...state,
          shareItem: { entity: action.payload, loading: false, loaded: true },
        }))
      )
      .addCase(
        findItemsSharedByMe.pending,
        reducePendingState((state) => ({
          ...state,
          sharedByMe: { entities: [], loading: true, loaded: false },
        }))
      )
      .addCase(
        findItemsSharedByMe.rejected,
        reduceRejectedState((state) => ({
          ...state,
          sharedByMe: { entities: [], loading: false, loaded: true },
        }))
      )
      .addCase(
        findItemsSharedByMe.fulfilled,
        reduceFulfilledState((state, action) => ({
          ...state,
          sharedByMe: { entities: Array.isArray(action.payload.playlists) ? action.payload.playlists : [], loading: false, loaded: true },
        }))
      )
      .addCase(
        findItemsSharedWithMe.pending,
        reducePendingState((state) => ({
          ...state,
          sharedWithMe: { entities: [], loading: true, loaded: false },
        }))
      )
      .addCase(
        findItemsSharedWithMe.rejected,
        reduceRejectedState((state) => ({
          ...state,
          sharedWithMe: { entities: [], loading: false, loaded: true },
        }))
      )
      .addCase(
        findItemsSharedWithMe.fulfilled,
        reduceFulfilledState((state, action) => ({
          ...state,
          sharedWithMe: { entities: Array.isArray(action.payload.playlists) ? action.payload.playlists : [], loading: false, loaded: true },
        }))
      );
  },
});

export default shareItemsSlice;
export const reducer = shareItemsSlice.reducer;
