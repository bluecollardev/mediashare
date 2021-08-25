import { createAction, createAsyncThunk, createReducer } from '@reduxjs/toolkit';

import { makeEnum } from '../../core/factory';

import * as reducers from '../../core/reducers';

import { apis, ApiService } from '../../apis';
import { CreateMediaItemDto, UpdateMediaItemDto } from '../../../api';
import { MediaItem } from '../../../rxjs-api';
import { uploadMedia, getStorage } from './storage';
import { KeyFactory } from './key-factory';
import { getAllMedia } from './media-items';

const MEDIA_ITEMS_ACTIONS = ['FIND_MEDIA_ITEMS'] as const;
const MEDIA_ITEM_ACTIONS = ['GET_MEDIA_ITEM', 'ADD_MEDIA_ITEM', 'UPDATE_MEDIA_ITEM', 'SHARE_MEDIA_ITEM', 'REMOVE_MEDIA_ITEM', 'UPLOAD_MEDIA_ITEM'] as const;
export const mediaItemActionTypes = makeEnum(MEDIA_ITEM_ACTIONS);
export const mediaItemsActionTypes = makeEnum(MEDIA_ITEMS_ACTIONS);

export const selectMediaItem = createAction<MediaItem, 'selectMediaItem'>('selectMediaItem');
export const toggleMediaItem = createAction<number, 'selectMediaItem'>('selectMediaItem');

export const clearMediaItem = createAction('clearMediaItem');

export const getMediaItemById = createAsyncThunk(mediaItemActionTypes.getMediaItem, async (id: string) => {
  const response = await getStorage(id);

  if (typeof response !== 'string') {
    return '';
  }

  return response;
});

type MediaSelectionType = MediaItem & { checked: boolean };

export const addMediaItem = createAsyncThunk(
  mediaItemActionTypes.addMediaItem,
  async (dto: Pick<CreateMediaItemDto, 'category' | 'description' | 'summary' | 'title' | 'key' | 'uri'>) => {
    const { uri: fileUri, title, category, summary, description } = dto;
    console.log('starting this');
    try {
      const options = { description: dto.description, summary: dto.summary, contentType: 'video/mp4' };

      const { video, thumb } = await uploadMedia({ fileUri, key: title, options });
      console.log(video, thumb);
      if (!video) {
        throw new Error('no response in add media  item');
      }
      const { thumbnailKey, videoKey } = KeyFactory(title);
      const createMediaItemDto: CreateMediaItemDto = {
        category,
        summary,
        description,
        key: videoKey,
        uri: videoKey,
        isPlayable: true,
        thumbnail: thumbnailKey,
        // eTag: video.,
        eTag: '',
        title,
      };

      const mediaItem = await apis.mediaItems.mediaItemControllerCreate({ createMediaItemDto }).toPromise();
      return mediaItem;
    } catch (err) {
      console.log(err);
    }
  }
);

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
    return response;
  }
);

export const removeMediaItem = createAsyncThunk(mediaItemActionTypes.updateMediaItem, async function (id: string, { extra }) {
  const { api } = extra as { api: ApiService };
  const response = await api.mediaItems.mediaItemControllerRemove({ mediaId: id });
  return response && response.status === 200 ? response.data : undefined;
});

export const findMediaItems = createAsyncThunk(mediaItemsActionTypes.findMediaItems, async () => {
  const response = await getAllMedia();

  const mapped = response.map((mediaItem) => ({ ...mediaItem, checked: false }));
  return mapped;
});

const initialState: { mediaItems: MediaSelectionType[]; loading: boolean; loaded: boolean } = {
  loading: false,
  mediaItems: [],
  loaded: false,
};

const initialMediaItemState: {
  getMediaItem: string;
  loading: boolean;
  file: any;
  mediaItem: MediaItem;
  mediaSrc: string;
  createState: 'submitting' | 'progress' | 'empty';
} = {
  getMediaItem: null,
  mediaItem: null,
  loading: false,
  file: null,
  mediaSrc: null,
  createState: 'empty',
};

export const MEDIA_ITEMS_STATE_KEY = 'mediaItems';

const mediaItemReducer = createReducer(initialMediaItemState, (builder) => {
  // builder.addCase(findMediaItems.fulfilled, (state, action) => {
  //   return { ...state, mediaItems: action.payload, loading: false };
  // })

  // .addCase(findMediaItems.fulfilled, reducers.addItem(MEDIA_ITEMS_STATE_KEY))
  builder
    .addCase(getMediaItemById.rejected, reducers.rejectedReducer('getMediaItem'))
    .addCase(getMediaItemById.pending, (state) => ({ ...state, loading: true }))
    .addCase(getMediaItemById.fulfilled, (state, action) => ({ ...state, mediaSrc: action.payload, loading: false }))
    .addCase(addMediaItem.pending, (state, action) => {
      console.log(state, action);
      return { ...state, loading: true };
    })
    .addCase(addMediaItem.rejected, (state, action) => {
      console.log(state, action);
      return { ...state, loading: false };
    })

    .addCase(addMediaItem.fulfilled, (state, action) => {
      return { ...state, loading: false, mediaItem: action.payload, createState: 'submitting' };
    })
    .addCase(selectMediaItem, (state, action) => {
      return { ...state, mediaItem: action.payload };
    })
    .addCase(clearMediaItem, (state) => {
      return { ...state, mediaItem: null, createState: 'empty' };
    });
});

const mediaItemsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(findMediaItems.rejected, (state) => {
      return { ...state, loading: false, loaded: false };
    })
    .addCase(toggleMediaItem, (state, action) => {
      console.log('run action', action);
      if (state?.mediaItems[action.payload]) {
        state.mediaItems[action.payload].checked = !state.mediaItems[action.payload].checked;
      }
      return state;
    })
    .addCase(findMediaItems.pending, (state) => {
      return { ...state, loading: true, loaded: false };
    })
    .addCase(findMediaItems.fulfilled, (state, action) => {
      return {
        ...state,
        mediaItems: action.payload,
        loading: false,
        loaded: true,
      };
    });
});

export { mediaItemReducer, mediaItemsReducer };
