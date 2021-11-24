import { createAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { forkJoin, from, merge } from 'rxjs';
import { switchMap, take, tap } from 'rxjs/operators';
import * as VideoThumbnails from 'expo-video-thumbnails';
import Config from '../../../config';

import { makeEnum } from '../../core/factory';
import { copyStorage, deleteStorage, fetchMedia, getStorage, listStorage, putToS3, sanitizeFoldername, uploadMedia, uploadThumbnail } from './storage';
import { KeyFactory, mediaRoot, thumbnailRoot, uploadRoot, videoRoot } from './key-factory';
import { AwsMediaItem } from './aws-media-item.model';

import {
  CreateMediaItemDto,
  MediaCategoryType,
  MediaItemDto,
  UpdateMediaItemDto
} from '../../../rxjs-api';
import { apis, ApiService } from '../../apis';

import { reduceFulfilledState, reducePendingState, reduceRejectedState } from '../../helpers';

const s3Url = Config.AWS_URL;

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
  'LOAD_USER_MEDIA_ITEMS',
] as const;
export const mediaItemActionTypes = makeEnum(MEDIA_ITEM_ACTIONS);
export const mediaItemsActionTypes = makeEnum(MEDIA_ITEMS_ACTIONS);
export const setActiveMediaItem = createAction<MediaItemDto, 'setActiveMediaItem'>('setActiveMediaItem');
export const clearActiveMediaItem = createAction('clearActiveMediaItem');
export const selectMediaItem = createAction<{ isChecked: boolean; item: MediaItemDto}, 'selectMediaItem'>('selectMediaItem');
export const clearMediaItems = createAction('clearMediaItems');

export const getMediaItemById = createAsyncThunk(mediaItemActionTypes.getMediaItem, async ({ uri, mediaId }: { uri: string; mediaId: string }) => {
  const result = await forkJoin({
    mediaItem: apis.mediaItems.mediaItemControllerFindOne({ mediaId }).toPromise(),
    src: getStorage(uri),
  }).toPromise();
  apis.views.viewsControllerCreateMediaView({ mediaId }).pipe(take(1)).subscribe();
  return { mediaItem: result.mediaItem as MediaItemDto, src: result.src };
});

export const createThumbnail = createAsyncThunk('preview', async ({ fileUri, key }: { fileUri: string; key: string }) => {
  return await uploadThumbnail({ fileUri, key });
});
export const addMediaItem = createAsyncThunk(
  mediaItemActionTypes.addMediaItem,
  async (dto: Pick<CreateMediaItemDto, 'category' | 'description' | 'summary' | 'title' | 'key' | 'uri'>) => {
    const { uri: fileUri, title, category, summary, description } = dto;
    try {
      const options = { description: dto.description, summary: dto.summary, contentType: 'video/mp4' };

      const { video } = await uploadMedia({ fileUri, key: title, options });
      if (!video) {
        throw new Error('No response in add media item');
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

      return await apis.mediaItems.mediaItemControllerCreate({ createMediaItemDto }).toPromise();
    } catch (err) {
      console.log(err);
    }
  }
);

export const getFeedMediaItems = createAsyncThunk(mediaItemActionTypes.feedMediaItems, async () => {
  // TODO: Non-overlapping types here!
  const feedMediaItems = ((await listStorage(mediaRoot + uploadRoot)) as unknown) as AwsMediaItem[];
  return feedMediaItems
    .filter((item) => item.key !== mediaRoot + uploadRoot)
    .map((item) => ({
      etag: item.etag,
      size: typeof item.size === 'number' ? `${(item.size / (1024 * 1024)).toFixed(2)} MB` : '',
      lastModified: new Date(Date.parse(item.lastModified)).toDateString(),
      key: sanitizeFoldername(item.key, mediaRoot + uploadRoot),
    }));
});

export const saveFeedMediaItems = createAsyncThunk(mediaItemActionTypes.saveFeedMediaItems, async ({ items }: { items: AwsMediaItem[] }) => {
  const createThumbnailFactory = (item: CreateMediaItemDto) =>
    from(VideoThumbnails.getThumbnailAsync(s3Url + mediaRoot + videoRoot + item.title.replace(/\s/g, '%20'), { time: 100 })).pipe(
      tap((res) => {
        // console.log(item.key);
        // console.log(res);
      }),
      switchMap((thumbnail) => from(fetchMedia(thumbnail.uri))),
      tap((res) => {
        // console.log(res);
      }),

      switchMap((file) => from(putToS3({ key: mediaRoot + videoRoot + item.title, file, options: { contentType: 'image/jpeg' } })))
    );

  // TODO: Were we planning on doing something here?
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const copy = items.map((item) => copyStorage(item.key));
  const dtos: CreateMediaItemDto[] = items.map((item) => ({
    description: `${item.size} - ${item.lastModified}`,
    title: item.key,
    thumbnail: mediaRoot + thumbnailRoot + item.key,
    video: mediaRoot + videoRoot + item.key,
    uri: mediaRoot + videoRoot + item.key,
    isPlayable: true,
    category: MediaCategoryType.Free,
    eTag: item.etag,
    key: mediaRoot + videoRoot + item.key,
    summary: '',
  }));

  const dtoPromises = dtos.map((dto) =>
    from(copyStorage(dto.title)).pipe(
      switchMap(() => createThumbnailFactory(dto)),

      switchMap(() => deleteStorage(dto.title)),
      switchMap((_) => apis.mediaItems.mediaItemControllerCreate({ createMediaItemDto: dto }))
    )
  );
  // const save = merge(...dtoPromises).pipe(tap((res) => console.log(res)));
  // const deleted = items.map((item) => deleteStorage(mediaRoot + uploadRoot + item.key));
  // await Promise.all(thumbnailPromises);
  return await merge(...dtoPromises).toPromise();
});
export const loadUserMediaItems = createAsyncThunk(mediaItemActionTypes.loadUserMediaItems, async () => {
  return await apis.user.userControllerGetMediaItems().toPromise();
});

export const updateMediaItem = createAsyncThunk(mediaItemActionTypes.updateMediaItem, async (item: UpdateMediaItemDto, { extra }) => {
  const { api } = extra as { api: ApiService };
  return await api.mediaItems
    .mediaItemControllerUpdate({
      mediaId: item._id,
      updateMediaItemDto: item,
    })
    .toPromise();
});

export const shareMediaItem = createAsyncThunk(
  mediaItemActionTypes.shareMediaItem,
  async (args: { id: string; userId: string; item: CreateMediaItemDto }, { extra }) => {
    const { api } = extra as { api: ApiService };
    return await api.mediaItems
      .mediaItemControllerShare({
        mediaId: args.id,
        userId: args.userId,
        createMediaItemDto: args.item,
      })
      .toPromise();
  }
);

export const deleteMediaItem = createAsyncThunk(mediaItemActionTypes.removeMediaItem, async (args: { id: string; key: string }, { extra }) => {
  const { api } = extra as { api: ApiService };
  const { id, key } = args;
  await deleteStorage(key);
  return await api.mediaItems.mediaItemControllerRemove({ mediaId: id }).toPromise();
});

export const findMediaItems = createAsyncThunk(mediaItemsActionTypes.findMediaItems, async (args: { text?: string }, { extra }) => {
  const { api } = extra as { api: ApiService };
  const { text } = args;
  // console.log(`Search args: ${JSON.stringify(args, null, 2)}`);
  // console.log(`Searching media items for: ${text}`);
  return await api.mediaItems.mediaItemControllerFindAll({ text }).toPromise();
});

export interface MediaItemInitialState {
  getMediaItem: string;
  loading: boolean;
  file: any;
  entity: MediaItemDto | undefined;
  mediaSrc: string;
  feed: AwsMediaItem[];
  loaded: boolean;
  createState: 'submitting' | 'progress' | 'empty';
}

export const MEDIA_ITEM_INITIAL_STATE: MediaItemInitialState = {
  getMediaItem: null,
  entity: undefined,
  loading: false,
  file: null,
  mediaSrc: 'https://mediashare0079445c24114369af875159b71aee1c04439-dev.s3.us-west-2.amazonaws.com/public/temp/background-comp.jpg',
  createState: 'empty',
  feed: null,
  loaded: false,
};

const mediaItemSlice = createSlice({
  name: 'mediaItem',
  initialState: MEDIA_ITEM_INITIAL_STATE,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMediaItemById.pending, (state) => ({
        ...state,
        loading: true,
        loaded: false,
        entity: undefined,
        mediaSrc: 'https://mediashare0079445c24114369af875159b71aee1c04439-dev.s3.us-west-2.amazonaws.com/public/temp/background-comp.jpg',
      }))
      .addCase(getMediaItemById.rejected, (state) => ({ ...state, entity: undefined }))
      .addCase(getMediaItemById.fulfilled, (state, action) => ({
        ...state,
        entity: action.payload.mediaItem,
        mediaSrc: action.payload.src as string,
        loading: false,
        loaded: true,
      }))
      .addCase(createThumbnail.fulfilled, (state, action) => ({
        ...state,
        mediaSrc: action.payload as string,
      }))
      .addCase(addMediaItem.pending, reducePendingState())
      .addCase(addMediaItem.rejected, reduceRejectedState())
      .addCase(addMediaItem.fulfilled, (state, action) => {
        return {
          ...state,
          loading: false,
          loaded: false,
          getMediaItem: action.payload.uri,
          mediaSrc: 'https://mediashare0079445c24114369af875159b71aee1c04439-dev.s3.us-west-2.amazonaws.com/public/temp/background-comp.jpg',
        };
      })
      // TODO: Are we using these? Where?
      .addCase(getFeedMediaItems.pending, reducePendingState())
      .addCase(getFeedMediaItems.rejected, reduceRejectedState())
      .addCase(getFeedMediaItems.fulfilled, (state, action) => {
        return { ...state, feed: action.payload };
      })
      .addCase(setActiveMediaItem, (state, action) => {
        return { ...state, entity: action.payload };
      })
      .addCase(clearActiveMediaItem, (state) => {
        return { ...state, entity: undefined, createState: 'empty' };
      });
  },
});

export interface MediaItemsInitialState {
  selected: MediaItemDto[];
  entities: MediaItemDto[];
  loading: boolean;
  loaded: boolean;
}

export const MEDIA_ITEMS_INITIAL_STATE: MediaItemsInitialState = {
  selected: [],
  entities: [],
  loading: false,
  loaded: false,
};

const mediaItemsSlice = createSlice({
  name: 'mediaItems',
  initialState: MEDIA_ITEMS_INITIAL_STATE,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(findMediaItems.pending, reducePendingState())
      .addCase(findMediaItems.rejected, reduceRejectedState())
      .addCase(findMediaItems.fulfilled, (state, action) => {
        return {
          ...state,
          entities: action.payload,
          loading: false,
          loaded: true,
        };
      })
      .addCase(loadUserMediaItems.fulfilled, (state, action) => {
        return { ...state, mediaItems: action.payload };
      })
      .addCase(selectMediaItem, (state, action) => {
        const updateSelection = function(bool: boolean, item: MediaItemDto) {
          const { selected } = state;
          // Is it filtered?
          // @ts-ignore
          return bool ? selected.concat([item]) : selected.filter((item) => item._id !== item._id);
        };
        return { ...state, selected: updateSelection(action.payload.isChecked, action.payload.item) };
      })
      .addCase(clearMediaItems, (state) => {
        return { ...state, entities: [] };
      })
      .addCase(saveFeedMediaItems.pending, reducePendingState())
      .addCase(saveFeedMediaItems.rejected, reduceRejectedState())
      .addCase(saveFeedMediaItems.fulfilled, reduceFulfilledState());
  },
});

const mediaItemSliceReducer = mediaItemSlice.reducer;
const mediaItemsSliceReducer = mediaItemsSlice.reducer;
export { mediaItemSliceReducer as mediaItemReducer, mediaItemsSliceReducer as mediaItemsReducer };
