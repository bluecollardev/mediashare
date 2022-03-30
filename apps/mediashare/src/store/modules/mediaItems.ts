import { createAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Config from 'mediashare/config';
import { makeActions } from 'mediashare/store/factory';
import { apis, ApiService } from 'mediashare/store/apis';
import { reduceFulfilledState, reducePendingState, reduceRejectedState } from 'mediashare/store/helpers';
import {
  copyStorage,
  listStorage,
  sanitizeFolderName,
  sanitizeKey,
  titleFromKey,
  uploadThumbnailToS3,
} from 'mediashare/core/aws/storage';
import { getVideoPath, getThumbnailPath, getUploadPath, awsUrl, KeyFactory } from 'mediashare/core/aws/key-factory';
import { AwsMediaItem } from 'mediashare/core/aws/aws-media-item.model';
import { CreateMediaItemDto, MediaItemResponseDto, MediaCategoryType } from 'mediashare/rxjs-api';

const s3Url = Config.AWS_URL;

const mediaItemsActionNames = [
  'find_media_items',
  'load_user_media_items',
  'get_feed_media_items',
  'save_feed_media_items',
] as const;

export const mediaItemsActionTypes = makeActions(mediaItemsActionNames);

export const clearActiveMediaItem = createAction('clearActiveMediaItem');
export const selectMediaItem = createAction<{ isChecked: boolean; item: MediaItemResponseDto }, 'selectMediaItem'>('selectMediaItem');
export const clearMediaItems = createAction('clearMediaItems');

export const getFeedMediaItems = createAsyncThunk(mediaItemsActionTypes.getFeedMediaItems.type, async () => {
  // TODO: Non-overlapping types here!
  const feedMediaItems = (await listStorage(getUploadPath())) as unknown as AwsMediaItem[];
  return feedMediaItems
    .filter((item) => item.key !== getUploadPath())
    .map((item) => ({
      etag: item.etag,
      size: typeof item.size === 'number' ? `${(item.size / (1024 * 1024)).toFixed(2)} MB` : '',
      lastModified: new Date(Date.parse(item.lastModified)).toDateString(),
      key: sanitizeFolderName(item.key, getUploadPath()),
    }));
});

export const saveFeedMediaItems = createAsyncThunk(mediaItemsActionTypes.saveFeedMediaItems.type, async ({ items }: { items: AwsMediaItem[] }) => {
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
      // TODO: Fix the thumbnail? We're doing this two ways...
      // const thumbnailUrl = await createFeedItemThumbnail(item.key);
      await createFeedItemThumbnail(item.key);
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

export const loadUserMediaItems = createAsyncThunk(mediaItemsActionTypes.loadUserMediaItems.type, async () => {
  return await apis.user.userControllerGetMediaItems().toPromise();
});

export const findMediaItems = createAsyncThunk(mediaItemsActionTypes.findMediaItems.type, async (args: { text?: string; tags?: string[] }, { extra }) => {
  const { api } = extra as { api: ApiService };
  const { text, tags = [] } = args;
  console.log(`Search args: ${JSON.stringify(args, null, 2)}`);
  console.log(`Searching media items for: [text] ${text}, [tags] ${JSON.stringify(tags)}`);
  return await api.mediaItems.mediaItemControllerFindAll({ text, tags }).toPromise();
});

export interface MediaItemsInitialState {
  selected: MediaItemResponseDto[];
  entities: MediaItemResponseDto[];
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
      .addCase(findMediaItems.fulfilled, reduceFulfilledState((state, action) => {
        return { ...state, entities: action.payload, loading: false, loaded: true };
      }))
      .addCase(loadUserMediaItems.pending, reducePendingState())
      .addCase(loadUserMediaItems.rejected, reduceRejectedState())
      .addCase(loadUserMediaItems.fulfilled, reduceFulfilledState((state, action) => {
        return { ...state, mediaItems: action.payload, loading: false, loaded: true };
      }))
      .addCase(selectMediaItem, (state, action) => {
        const updateSelection = function (bool: boolean, item: MediaItemResponseDto) {
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
      .addCase(getFeedMediaItems.pending, reducePendingState())
      .addCase(getFeedMediaItems.rejected, reduceRejectedState())
      .addCase(getFeedMediaItems.fulfilled, reduceFulfilledState((state, action) => {
        return { ...state, feed: action.payload };
      }))
      .addCase(saveFeedMediaItems.pending, reducePendingState())
      .addCase(saveFeedMediaItems.rejected, reduceRejectedState())
      .addCase(saveFeedMediaItems.fulfilled, reduceFulfilledState());
  },
});

export default mediaItemsSlice;
export const reducer = mediaItemsSlice.reducer;
