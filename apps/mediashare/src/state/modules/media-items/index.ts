import { createAction, createAsyncThunk, createReducer } from '@reduxjs/toolkit';
import { Storage } from 'aws-amplify';

import { makeEnum } from '../../core/factory';

import * as reducers from '../../core/reducers';

import { ApiService } from '../../apis';
import { CreateMediaItemDto, UpdateMediaItemDto } from '../../../api';
import { number, string } from '@hapi/joi';
import { AwsMediaItem } from './aws-media-item.model';
import { MediaViewItem } from './media-view-item.model';

const MEDIA_ITEM_ACTIONS = ['GET_MEDIA_ITEM', 'ADD_MEDIA_ITEM', 'UPDATE_MEDIA_ITEM', 'SHARE_MEDIA_ITEM', 'REMOVE_MEDIA_ITEM'] as const;
const MEDIA_ITEMS_ACTIONS = ['FIND_MEDIA_ITEMS'] as const;

export const mediaItemActionTypes = makeEnum(MEDIA_ITEM_ACTIONS);
export const mediaItemsActionTypes = makeEnum(MEDIA_ITEMS_ACTIONS);

export const selectMediaItem = createAction<MediaViewItem, 'selectMediaItem'>('selectMediaItem');
export const getMediaItemById = createAsyncThunk(mediaItemActionTypes.getMediaItem, async (id: string) => {
  const response = (await Storage.get(id, {})) as string;
  return response;
});

export const addMediaItem = createAsyncThunk(mediaItemActionTypes.addMediaItem, async (item: CreateMediaItemDto, { extra }) => {
  const { api } = extra as { api: ApiService };
  // const response = await Storage.put('');
  // return response && response.status === 200 ? response.data : undefined;
});

export const updateMediaItem = createAsyncThunk(mediaItemActionTypes.updateMediaItem, async (item: UpdateMediaItemDto, { extra }) => {
  const { api } = extra as { api: ApiService };
  const response = await api.mediaItems.mediaItemControllerUpdate({ mediaId: item._id, updateMediaItemDto: item });
  return response && response.status === 200 ? response.data : undefined;
});

export const shareMediaItem = createAsyncThunk(
  mediaItemActionTypes.shareMediaItem,
  async (args: { id: string; userId: string; item: CreateMediaItemDto }, { extra }) => {
    const { api } = extra as { api: ApiService };
    const response = await api.mediaItems.mediaItemControllerShare({ mediaId: args.id, userId: args.userId, createMediaItemDto: args.item });
    return response && response.status === 200 ? response.data : undefined;
  }
);

export const removeMediaItem = createAsyncThunk(mediaItemActionTypes.updateMediaItem, async (id: string, { extra }) => {
  const { api } = extra as { api: ApiService };
  const response = await api.mediaItems.mediaItemControllerRemove({ mediaId: id });
  return response && response.status === 200 ? response.data : undefined;
});

export const findMediaItems = createAsyncThunk(mediaItemsActionTypes.findMediaItems, async () => {
  // @ts-ignore
  const response = await Storage.list('');

  return response as AwsMediaItem[];
});

const initialState: { mediaItems: AwsMediaItem[]; loading: boolean } = {
  loading: false,
  mediaItems: [],
};

const initialMediaItemState: { getMediaItem: string; loading: boolean; selectedMediaItem: MediaViewItem } = {
  getMediaItem: null,
  selectedMediaItem: null,
  loading: false,
};

export const MEDIA_ITEMS_STATE_KEY = 'mediaItems';

const mediaItemReducer = createReducer(
  initialMediaItemState,
  (builder) => {
    // builder.addCase(findMediaItems.fulfilled, (state, action) => {
    //   return { ...state, mediaItems: action.payload, loading: false };
    // })

    // .addCase(findMediaItems.fulfilled, reducers.addItem(MEDIA_ITEMS_STATE_KEY))
    builder.addCase(getMediaItemById.rejected, reducers.rejectedReducer('getMediaItem'));

    builder.addCase(getMediaItemById.pending, (state) => ({ ...state, loading: true }));

    builder.addCase(getMediaItemById.fulfilled, (state, action) => ({ ...state, getMediaItem: action.payload, loading: false }));
    builder.addCase(selectMediaItem, (state, action) => {
      return { ...state, selectedMediaItem: action.payload };
    });
  }
  // .addCase(addMediaItem.fulfilled, reducers.addItem(MEDIA_ITEMS_STATE_KEY))
  // .addCase(updateMediaItem.fulfilled, reducers.updateItem(MEDIA_ITEMS_STATE_KEY))
  // .addCase(shareMediaItem.fulfilled, reducers.updateItem(MEDIA_ITEMS_STATE_KEY))
  // .addCase(removeMediaItem.fulfilled, reducers.removeItem(MEDIA_ITEMS_STATE_KEY))
);

const mediaItemsReducer = createReducer(initialState, (builder) => {
  builder.addCase(findMediaItems.rejected, (state, action) => {
    return { ...state, loading: false };
  });

  builder.addCase(findMediaItems.pending, (state, action) => {
    return { ...state, mediaItems: action.payload, loading: true };
  });

  builder.addCase(findMediaItems.fulfilled, (state, action) => {
    return { ...state, mediaItems: action.payload, loading: false };
  });
});

export { mediaItemReducer, mediaItemsReducer };
