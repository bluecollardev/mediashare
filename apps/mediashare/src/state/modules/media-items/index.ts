import { createAsyncThunk, createReducer } from '@reduxjs/toolkit';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { makeActions, makeEnum } from '../../core/factory';

import * as reducers from '../../core/reducers';

import { ApiService } from '../../apis';
import { CreateMediaItemDto, OperationOpts, UpdateMediaItemDto } from '../../../api';

const MEDIA_ITEM_ACTIONS = ['GET_MEDIA_ITEM', 'ADD_MEDIA_ITEM', 'UPDATE_MEDIA_ITEM', 'SHARE_MEDIA_ITEM', 'REMOVE_MEDIA_ITEM'] as const;
const MEDIA_ITEMS_ACTIONS = ['FIND_MEDIA_ITEMS'] as const;

export const mediaItemActionTypes = makeEnum(MEDIA_ITEM_ACTIONS);
export const mediaItemsActionTypes = makeEnum(MEDIA_ITEMS_ACTIONS);

// const [mediaItemActions, mediaItemsActions] = [makeActions(MEDIA_ITEM_ACTIONS), makeActions(MEDIA_ITEMS_ACTIONS)];

export const getMediaItemById = createAsyncThunk(mediaItemActionTypes.getMediaItem, async (id: string, { extra }) => {
  const { api } = extra as { api: ApiService };
  const response = api.mediaItems.mediaItemControllerFindOne({ mediaId: id }).toPromise();
  return response;
});

export const addMediaItem = createAsyncThunk(mediaItemActionTypes.addMediaItem, async (item: CreateMediaItemDto, { extra }) => {
  const { api } = extra as { api: ApiService };
  const response = api.mediaItems.mediaItemControllerCreate({ createMediaItemDto: item }).toPromise();
  return response;
});

export const updateMediaItem = createAsyncThunk(mediaItemActionTypes.updateMediaItem, async (item: UpdateMediaItemDto, { extra }) => {
  const { api } = extra as { api: ApiService };
  const response = api.mediaItems.mediaItemControllerUpdate({ mediaId: item._id, updateMediaItemDto: item }).toPromise();
  return response;
});

export const shareMediaItem = createAsyncThunk(
  mediaItemActionTypes.shareMediaItem,
  async (args: { id: string; userId: string; item: CreateMediaItemDto }, { extra }) => {
    const { api } = extra as { api: ApiService };
    const response = api.mediaItems.mediaItemControllerShare({ mediaId: args.id, userId: args.userId, createMediaItemDto: args.item }).toPromise();
    return response;
  }
);

export const removeMediaItem = createAsyncThunk(mediaItemActionTypes.updateMediaItem, async (id: string, { extra }) => {
  const { api } = extra as { api: ApiService };
  const response = api.mediaItems.mediaItemControllerRemove({ mediaId: id }).toPromise();
  return response;
});

export const findMediaItems = createAsyncThunk(mediaItemsActionTypes.findMediaItems, async (opts: OperationOpts | undefined, { extra }) => {
  const { api } = extra as { api: ApiService };
  const response = api.mediaItems.mediaItemControllerFindAll(opts).toPromise();
  return response;
});

const initialState = {};

export const MEDIA_ITEMS_STATE_KEY = 'mediaItems';

const mediaItemReducer = createReducer(initialState, (builder) =>
  builder
    .addCase(getMediaItemById.fulfilled, reducers.addItem(MEDIA_ITEMS_STATE_KEY))
    .addCase(addMediaItem.fulfilled, reducers.addItem(MEDIA_ITEMS_STATE_KEY))
    .addCase(updateMediaItem.fulfilled, reducers.updateItem(MEDIA_ITEMS_STATE_KEY))
    .addCase(shareMediaItem.fulfilled, reducers.updateItem(MEDIA_ITEMS_STATE_KEY))
    .addCase(removeMediaItem.fulfilled, reducers.removeItem(MEDIA_ITEMS_STATE_KEY))
);

const mediaItemsReducer = createReducer(initialState, (builder) =>
  builder
    .addCase(findMediaItems.fulfilled, reducers.loadItems(MEDIA_ITEMS_STATE_KEY))
);

export { mediaItemReducer, mediaItemsReducer };
