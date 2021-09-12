import { createAction, createAsyncThunk, createReducer } from '@reduxjs/toolkit';

import { makeEnum } from '../../core/factory';

import { apis, ApiService } from '../../apis';
import { CreateMediaItemDto, UpdateMediaItemDto } from '../../../api';
import { copyStorage, deleteStorage, getStorage, listStorage, sanitizeFoldername, uploadMedia, uploadThumbnail } from './storage';
import { KeyFactory } from './key-factory';
import { getAllMedia } from './media-items';
import { AwsMediaItem } from './aws-media-item.model';
import { concat, forkJoin, merge } from 'rxjs';
import { tap } from 'rxjs/operators';
import { MediaItemDto } from '../../../rxjs-api/models/MediaItemDto';
import { CreateMediaItemDtoCategoryEnum } from '../../../rxjs-api/models/CreateMediaItemDto';

const MEDIA_ITEMS_ACTIONS = ['FIND_MEDIA_ITEMS'] as const;
const MEDIA_ITEM_ACTIONS = [
  'GET_MEDIA_ITEM',
  'ADD_MEDIA_ITEM',
  'UPDATE_MEDIA_ITEM',
  'SHARE_MEDIA_ITEM',
  'REMOVE_MEDIA_ITEM',
  'UPLOAD_MEDIA_ITEM',
  'FEED_MEDIA_ITEMS',
  'SAVE_FEED_MEDIA_ITEMS',
] as const;
export const mediaItemActionTypes = makeEnum(MEDIA_ITEM_ACTIONS);
export const mediaItemsActionTypes = makeEnum(MEDIA_ITEMS_ACTIONS);

export const selectMediaItem = createAction<MediaItemDto, 'selectMediaItem'>('selectMediaItem');
export const toggleMediaItem = createAction<number, 'selectMediaItem'>('selectMediaItem');
export const clearMediaItemSelection = createAction('clearMediaItems');
export const clearMediaItem = createAction('clearMediaItem');

export const getMediaItemById = createAsyncThunk(mediaItemActionTypes.getMediaItem, async ({ uri, mediaId }: { uri: string; mediaId: string }) => {
  const result = await forkJoin({
    mediaItem: apis.mediaItems.mediaItemControllerFindOne({ mediaId }).toPromise(),
    src: getStorage(uri),
  }).toPromise();

  return { mediaItem: result.mediaItem as MediaItemDto, src: result.src };
});

export const createThumbnail = createAsyncThunk('preview', async ({ fileUri, key }: { fileUri: string; key: string }) => {
  const thumb = await uploadThumbnail({ fileUri, key });
  return thumb;
});
export const addMediaItem = createAsyncThunk(
  mediaItemActionTypes.addMediaItem,
  async (dto: Pick<CreateMediaItemDto, 'category' | 'description' | 'summary' | 'title' | 'key' | 'uri'>) => {
    const { uri: fileUri, title, category, summary, description } = dto;
    try {
      const options = { description: dto.description, summary: dto.summary, contentType: 'video/mp4' };

      const { video, thumb } = await uploadMedia({ fileUri, key: title, options });
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

export const getFeedMediaItems = createAsyncThunk(mediaItemActionTypes.feedMediaItems, async () => {
  const mediaItems = (await listStorage('uploads/')) as AwsMediaItem[];
  const items = mediaItems
    .filter((item) => item.key !== 'uploads/')
    .map((item) => ({
      ...item,
      key: sanitizeFoldername(item.key),
    }));
  console.log(items);
  return items;
});

export const saveFeedMediaItems = createAsyncThunk(mediaItemActionTypes.saveFeedMediaItems, async ({ keys }: { keys: string[] }) => {
  // const promises = ;
  const copy = keys.map((key) => copyStorage(key));

  const dtos: CreateMediaItemDto[] = keys.map((key) => ({
    description: `Uploaded to bucket on ${new Date()}`,
    title: key,
    thumbnail: 'thumbnail/' + key,
    video: 'video/' + key,
    uri: 'video/' + key,
    isPlayable: false,
    category: CreateMediaItemDtoCategoryEnum.Endurance,
    eTag: '',
    key: key,
    summary: '',
  }));

  const dtoPromises = dtos.map((dto) => apis.mediaItems.mediaItemControllerCreate({ createMediaItemDto: dto }));
  const save = merge(...dtoPromises).pipe(tap((res) => console.log(res)));
  const deleted = keys.map((key) => deleteStorage('uploads/' + key));

  const result = await concat(copy, save, deleted).toPromise();
  return result;
});

export const updateMediaItem = createAsyncThunk(mediaItemActionTypes.updateMediaItem, async (item: UpdateMediaItemDto, { extra }) => {
  const { api } = extra as { api: ApiService };
  const response = await api.mediaItems
    .mediaItemControllerUpdate({
      mediaId: item._id,
      updateMediaItemDto: item,
    })
    .toPromise();
  return response;
});

export const shareMediaItem = createAsyncThunk(
  mediaItemActionTypes.shareMediaItem,
  async (args: { id: string; userId: string; item: CreateMediaItemDto }, { extra }) => {
    const { api } = extra as { api: ApiService };
    const response = await api.mediaItems.mediaItemControllerShare({
      mediaId: args.id,
      userId: args.userId,
      createMediaItemDto: args.item,
    });
    return response;
  }
);

export const removeMediaItem = createAsyncThunk(mediaItemActionTypes.updateMediaItem, async function (id: string, { extra }) {
  const { api } = extra as { api: ApiService };
  const response = await api.mediaItems.mediaItemControllerRemove({ mediaId: id });
  // @ts-ignore
  return response && response.status === 200 ? response.data : undefined;
});

export const findMediaItems = createAsyncThunk(mediaItemsActionTypes.findMediaItems, async () => {
  const response = await getAllMedia();

  return response;
});

const initialState: { mediaItems: MediaItemDto[]; loading: boolean; loaded: boolean } = {
  loading: false,
  mediaItems: [],
  loaded: false,
};

const initialMediaItemState: {
  getMediaItem: string;
  loading: boolean;
  file: any;
  mediaItem: MediaItemDto;
  mediaSrc: string;
  feed: AwsMediaItem[];
  loaded: boolean;
  createState: 'submitting' | 'progress' | 'empty';
} = {
  getMediaItem: null,
  mediaItem: null,
  loading: false,
  file: null,
  mediaSrc: 'https://mediashare0079445c24114369af875159b71aee1c04439-dev.s3.us-west-2.amazonaws.com/public/temp/background-comp.jpg',
  createState: 'empty',
  feed: null,
  loaded: false,
};

export const MEDIA_ITEMS_STATE_KEY = 'mediaItems';

const mediaItemReducer = createReducer(initialMediaItemState, (builder) => {
  // builder.addCase(findMediaItems.fulfilled, (state, action) => {
  //   return { ...state, mediaItems: action.payload, loading: false };
  // })

  // .addCase(findMediaItems.fulfilled, reducers.addItem(MEDIA_ITEMS_STATE_KEY))
  builder
    .addCase(createThumbnail.fulfilled, (state, action) => ({
      ...state,
      getMediaItem: action.payload as string,
    }))
    .addCase(getMediaItemById.pending, (state) => ({
      ...state,
      loading: true,
      loaded: false,
      mediaItem: null,
      mediaSrc: 'https://mediashare0079445c24114369af875159b71aee1c04439-dev.s3.us-west-2.amazonaws.com/public/temp/background-comp.jpg',
    }))
    .addCase(getMediaItemById.fulfilled, (state, action) => ({
      ...state,
      mediaItem: action.payload.mediaItem,
      mediaSrc: action.payload.src as string,
      loading: false,
      loaded: true,
    }))
    .addCase(getMediaItemById.rejected, (state) => ({ ...state, loading: false, loaded: true, mediaItem: null }))
    .addCase(addMediaItem.pending, (state) => {
      return { ...state, loading: true };
    })
    .addCase(addMediaItem.rejected, (state) => {
      return { ...state, loading: false };
    })

    .addCase(addMediaItem.fulfilled, (state, action) => {
      return {
        ...state,
        loading: false,
        loaded: false,
        getMediaItem: action.payload.uri,
        mediaSrc: 'https://mediashare0079445c24114369af875159b71aee1c04439-dev.s3.us-west-2.amazonaws.com/public/temp/background-comp.jpg',
      };
    })
    .addCase(getFeedMediaItems.pending, (state) => {
      return { ...state, loading: true };
    })
    .addCase(getFeedMediaItems.rejected, (state) => {
      return { ...state, loading: false };
    })

    .addCase(getFeedMediaItems.fulfilled, (state, action) => {
      return { ...state, loading: false, feed: action.payload };
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
    })
    .addCase(clearMediaItemSelection, (state) => {
      return { ...state, mediaItems: [] };
    })

    .addCase(saveFeedMediaItems.pending, (state) => {
      return { ...state, loading: true };
    })
    .addCase(saveFeedMediaItems.rejected, (state) => {
      return { ...state, loading: false };
    })

    .addCase(saveFeedMediaItems.fulfilled, (state) => {
      return { ...state, loading: false, loaded: false };
    });
});

export { mediaItemReducer, mediaItemsReducer };
