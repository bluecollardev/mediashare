import { createAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { forkJoin } from 'rxjs';
import { take } from 'rxjs/operators';
import Config from '../../../config';

import { makeEnum } from '../../core/factory';
import {
  copyStorage,
  deleteStorage,
  getFileExtension,
  getStorage,
  listStorage,
  sanitizeFolderName,
  sanitizeKey,
  titleFromKey,
  uploadMediaToS3,
  uploadThumbnailToS3,
} from './storage';
import { getVideoPath, getThumbnailPath, getUploadPath, awsUrl, KeyFactory } from './key-factory';
import { AwsMediaItem } from './aws-media-item.model';

import { CreateMediaItemDto, MediaCategoryType, MediaItemDto, UpdateMediaItemDto } from '../../../rxjs-api';
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
export const selectMediaItem = createAction<{ isChecked: boolean; item: MediaItemDto }, 'selectMediaItem'>('selectMediaItem');
export const clearMediaItems = createAction('clearMediaItems');

export const getMediaItemById = createAsyncThunk(mediaItemActionTypes.getMediaItem, async ({ uri, mediaId }: { uri: string; mediaId: string }) => {
  const result = await forkJoin({
    mediaItem: apis.mediaItems.mediaItemControllerFindOne({ mediaId }).toPromise(),
    src: getStorage(uri),
  }).toPromise();
  apis.views.viewsControllerCreateMediaView({ mediaId }).pipe(take(1)).subscribe();
  const response = { mediaItem: result.mediaItem as MediaItemDto, src: result.src };
  console.log(`[getMediaItemById] response: ${JSON.stringify(response, null, 2)}`);
  return response;
});

export const createThumbnail = createAsyncThunk('preview', async ({ fileUri, key }: { fileUri: string; key: string }) => {
  return await uploadThumbnailToS3({ fileUri, key });
});

export const addMediaItem = createAsyncThunk(
  mediaItemActionTypes.addMediaItem,
  async (dto: Pick<CreateMediaItemDto, 'key' | 'title' | 'description' | 'summary' | 'category' | 'tags' | 'uri'>) => {
    const { uri: fileUri, title, category, tags = [], summary, description } = dto;
    try {
      const options = { description: dto.description, summary: dto.summary, contentType: 'video/mp4' };
      const sanitizedKey = sanitizeKey(`${title}.${getFileExtension(fileUri)}`);
      const { video, thumbnail } = await uploadMediaToS3({ fileUri, key: sanitizedKey, options });
      if (!video) {
        throw new Error('[addMediaItem] video upload to S3 failed');
      }
      if (!thumbnail) {
        console.warn('[addMediaItem] thumbnail generation failed');
      }

      const { videoKey } = KeyFactory(sanitizedKey);
      const createMediaItemDto: CreateMediaItemDto = {
        key: videoKey,
        title,
        description,
        summary,
        category: category || MediaCategoryType.Free,
        tags: tags || [],
        thumbnail: awsUrl + getThumbnailPath(sanitizedKey) + '.jpeg',
        // video: awsUrl + getVideoPath(sanitizedKey),
        uri: awsUrl + getVideoPath(sanitizedKey),
        isPlayable: true,
        eTag: '',
      };

      return await apis.mediaItems.mediaItemControllerCreate({ createMediaItemDto }).toPromise();
    } catch (err) {
      console.log(err);
    }
  }
);

export const getFeedMediaItems = createAsyncThunk(mediaItemActionTypes.feedMediaItems, async () => {
  // TODO: Non-overlapping types here!
  const feedMediaItems = ((await listStorage(getUploadPath())) as unknown) as AwsMediaItem[];
  return feedMediaItems
    .filter((item) => item.key !== getUploadPath())
    .map((item) => ({
      etag: item.etag,
      size: typeof item.size === 'number' ? `${(item.size / (1024 * 1024)).toFixed(2)} MB` : '',
      lastModified: new Date(Date.parse(item.lastModified)).toDateString(),
      key: sanitizeFolderName(item.key, getUploadPath()),
    }));
});

export const saveFeedMediaItems = createAsyncThunk(mediaItemActionTypes.saveFeedMediaItems, async ({ items }: { items: AwsMediaItem[] }) => {
  const createFeedItemThumbnail = async (key) => {
    try {
      // AWS will replace spaces with a '+' in the actual Object URL
      const fileUri = s3Url + getUploadPath(key.replace(/\s/g, '+'));
      console.log(`[createFeedItemThumbnail] Creating thumbnail for file at ${fileUri}`);
      const sanitizedKey = sanitizeKey(key);
      return await uploadThumbnailToS3({ fileUri, key: sanitizedKey });
    } catch (err) {
      console.log('[createFeedItemThumbnail] createFeedItemThumbnail failed');
      console.log(err);
    }
  };

  const dtoPromises = items
    .map((item) => {
      // Copy storage will sanitize the 'to' key automatically
      const s3KeyString = item.key;
      copyStorage(s3KeyString);
      return item;
    })
    .map(async (item) => {
      const sanitizedKey = sanitizeKey(item.key);
      // TODO: Is there a better way to set the title?
      const automaticTitle = titleFromKey(item.key);
      const thumbnailUrl = await createFeedItemThumbnail(item.key);
      console.log('Compare URLs...');
      console.log(`thumbnailUrl: ${thumbnailUrl}`);
      console.log(`dto thumbnailUrl: ${awsUrl + getThumbnailPath(sanitizedKey) + '.jpeg'}`);
      const { videoKey } = KeyFactory(sanitizedKey);
      const createMediaItemDto: CreateMediaItemDto = {
        key: videoKey,
        title: automaticTitle,
        description: `${item.size} - ${item.lastModified}`,
        summary: '',
        category: MediaCategoryType.Free,
        tags: [],
        thumbnail: awsUrl + getThumbnailPath(sanitizedKey) + '.jpeg',
        // video: awsUrl + getVideoPath(sanitizedKey),
        uri: awsUrl + getVideoPath(sanitizedKey),
        isPlayable: true,
        eTag: item.etag,
      };
      // await deleteStorage(dto.title)),
      return await apis.mediaItems.mediaItemControllerCreate({ createMediaItemDto }).toPromise();
    });

  return await Promise.all(dtoPromises);
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
  console.log(`Search args: ${JSON.stringify(args, null, 2)}`);
  console.log(`Searching media items for: ${text}`);
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
        const updateSelection = function (bool: boolean, item: MediaItemDto) {
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
