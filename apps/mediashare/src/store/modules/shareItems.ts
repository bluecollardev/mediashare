// TODO: We need to finish this...
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { makeActions } from 'mediashare/store/factory';
import { reducePendingState, reduceRejectedState, reduceFulfilledState } from 'mediashare/store/helpers';
import { ApiService } from 'mediashare/store/apis';
import { ShareItemsResponseDto } from 'mediashare/rxjs-api';

// Define these in snake case or our converter won't work... we need to fix that
const shareItemActionNames = ['get_share_item', 'remove_share_item', 'find_items_i_am_sharing', 'find_items_shared_with_me', 'read_share_item'] as const;

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

export const findItemsIAmSharing = createAsyncThunk(shareItemsActions.findItemsIAmSharing.type, async (opts = undefined, { extra }) => {
  const { api } = extra as { api: ApiService };
  return await api.shareItems.shareItemControllerFindItemsSharedByUser().toPromise();
});

export const findItemsSharedWithMe = createAsyncThunk(shareItemsActions.findItemsSharedWithMe.type, async (opts = undefined, { extra }) => {
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
  sharedByUser: ShareItemsState;
  sharedWithUser: ShareItemsState;
} = {
  shareItem: {
    entity: undefined,
    loading: false,
    loaded: false,
  },
  sharedByUser: {
    selected: [],
    entities: [],
    loading: false,
    loaded: false,
  },
  sharedWithUser: {
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
        findItemsIAmSharing.pending,
        reducePendingState((state) => ({
          ...state,
          sharedByUser: { entities: [], loading: true, loaded: false },
        }))
      )
      .addCase(
        findItemsIAmSharing.rejected,
        reduceRejectedState((state) => ({
          ...state,
          sharedByUser: { entities: [], loading: false, loaded: true },
        }))
      )
      .addCase(
        findItemsIAmSharing.fulfilled,
        reduceFulfilledState((state, action) => ({
          ...state,
          sharedByUser: { entities: Array.isArray(action.payload.playlists) ? action.payload.playlists : [], loading: false, loaded: true },
        }))
      )
      .addCase(
        findItemsSharedWithMe.pending,
        reducePendingState((state) => ({
          ...state,
          sharedWithUser: { entities: [], loading: true, loaded: false },
        }))
      )
      .addCase(
        findItemsSharedWithMe.rejected,
        reduceRejectedState((state) => ({
          ...state,
          sharedWithUser: { entities: [], loading: false, loaded: true },
        }))
      )
      .addCase(
        findItemsSharedWithMe.fulfilled,
        reduceFulfilledState((state, action) => ({
          ...state,
          sharedWithUser: { entities: Array.isArray(action.payload.playlists) ? action.payload.playlists : [], loading: false, loaded: true },
        }))
      );
  },
});

export default shareItemsSlice;
export const reducer = shareItemsSlice.reducer;
