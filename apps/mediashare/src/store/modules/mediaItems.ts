import { createAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { makeActions } from 'mediashare/store/factory';
import { reduceFulfilledState, reducePendingState, reduceRejectedState } from 'mediashare/store/helpers';
import { ApiService } from 'mediashare/store/apis';
import { MediaItemResponseDto } from 'mediashare/rxjs-api';

// Define these in snake case or our converter won't work... we need to fix that
const mediaItemsActionNames = ['find_media_items', 'load_user_media_items', 'select_media_item', 'clear_media_items'] as const;

export const mediaItemsActions = makeActions(mediaItemsActionNames);

export const loadUserMediaItems = createAsyncThunk(mediaItemsActions.loadUserMediaItems.type, async (opts = undefined, { extra }) => {
  const { api } = extra as { api: ApiService };
  return await api.user.userControllerGetUserMediaItems().toPromise();
});

export const findMediaItems = createAsyncThunk(mediaItemsActions.findMediaItems.type, async (args: { text?: string; tags?: string[] }, { extra }) => {
  const { api } = extra as { api: ApiService };
  const { text, tags = [] } = args;
  console.log(`Search media items args: ${JSON.stringify(args, null, 2)}`);
  console.log(`Searching media items for: text -> [${text}, tags -> [${JSON.stringify(tags)}]`);
  return await api.mediaItems.mediaItemControllerFindAll({ text, tags }).toPromise();
});

export const selectMediaItem = createAction<{ isChecked: boolean; item: MediaItemResponseDto }, typeof mediaItemsActions.selectMediaItem.type>(
  mediaItemsActions.selectMediaItem.type
);

export const clearMediaItems = createAction(mediaItemsActions.clearMediaItems.type);

export interface MediaItemsState {
  selected: MediaItemResponseDto[];
  entities: MediaItemResponseDto[];
  mediaItems: MediaItemResponseDto[];
  loading: boolean;
  loaded: boolean;
}

export const mediaItemsInitialState: MediaItemsState = {
  selected: [],
  entities: [],
  mediaItems: [],
  loading: false,
  loaded: false,
};

const mediaItemsSlice = createSlice({
  name: 'mediaItems',
  initialState: mediaItemsInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(findMediaItems.pending, reducePendingState())
      .addCase(findMediaItems.rejected, reduceRejectedState())
      .addCase(
        findMediaItems.fulfilled,
        reduceFulfilledState((state, action) => ({
          ...state,
          entities: action.payload,
          loading: false,
          loaded: true,
        }))
      )
      .addCase(loadUserMediaItems.pending, reducePendingState())
      .addCase(loadUserMediaItems.rejected, reduceRejectedState())
      .addCase(
        loadUserMediaItems.fulfilled,
        reduceFulfilledState((state, action) => ({
          ...state,
          mediaItems: action.payload,
          loading: false,
          loaded: true,
        }))
      )
      .addCase(selectMediaItem, (state, action) => {
        const updateSelection = function (bool: boolean, item: MediaItemResponseDto) {
          const { selected } = state;
          // Is it filtered?
          // @ts-ignore
          return bool ? selected.concat([item]) : selected.filter((item) => item._id !== item._id);
        };
        return { ...state, selected: updateSelection(action.payload.isChecked, action.payload.item), loading: false, loaded: true };
      })
      .addCase(clearMediaItems, (state) => ({
        // TODO: Shouldn't we be clearing selected media items?
        ...state,
        selected: [],
        loading: false,
        loaded: true,
        // ...state, entities: [], loading: false, loaded: true
      }));
  },
});

export default mediaItemsSlice;
export const reducer = mediaItemsSlice.reducer;
