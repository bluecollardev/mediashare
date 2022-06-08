import { createAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { makeActions } from 'mediashare/store/factory';
import { reduceFulfilledState, reducePendingState, reduceRejectedState } from 'mediashare/store/helpers';
import { ApiService } from 'mediashare/store/apis';
import { CreateMediaItemDto, UpdateMediaItemDto, MediaItemResponseDto, MediaCategoryType } from 'mediashare/rxjs-api';
import { AwsMediaItem } from 'mediashare/core/aws/aws-media-item.model';
import { getVideoPath, getThumbnailPath, getUploadPath, awsUrl, KeyFactory } from 'mediashare/core/aws/key-factory';
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
} from 'mediashare/core/aws/storage';

import { take } from 'rxjs/operators';
import { forkJoin } from 'rxjs';

import Config from 'mediashare/config';

const s3Url = Config.AWS_URL;
const mediaPlaceholder = 'https://mediashare0079445c24114369af875159b71aee1c04439-dev.s3.us-west-2.amazonaws.com/public/temp/background-comp.jpg';

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

// Define these in snake case or our converter won't work... we need to fix that
const mediaItemActionNames = [
  'get_media_item',
  'create_media_item_thumbnail',
  'add_media_item',
  'update_media_item',
  'share_media_item',
  'remove_media_item',
  'upload_media_item',
  'get_feed_media_items',
  'save_feed_media_items',
] as const;

export const mediaItemActions = makeActions(mediaItemActionNames);

export const getMediaItemById = createAsyncThunk(mediaItemActions.getMediaItem.type, async ({ uri, mediaId }: { uri: string; mediaId: string }, { extra }) => {
  const { api } = extra as { api: ApiService };
  const result = await forkJoin({
    mediaItem: api.mediaItems.mediaItemControllerFindOne({ mediaId }).toPromise(),
    src: getStorage(uri),
  }).toPromise();
  api.views.viewsControllerCreateMediaView({ mediaId }).pipe(take(1)).subscribe();
  return { mediaItem: result.mediaItem as MediaItemResponseDto, src: result.src };
});

export const createThumbnail = createAsyncThunk(mediaItemActions.createMediaItemThumbnail.type, async ({ fileUri, key }: { fileUri: string; key: string }) => {
  return await uploadThumbnailToS3({ fileUri, key });
});

export const addMediaItem = createAsyncThunk(
  mediaItemActions.addMediaItem.type,
  async (dto: Pick<CreateMediaItemDto, 'key' | 'title' | 'description' | 'summary' | 'category' | 'tags' | 'uri'>, { extra }) => {
    const { api } = extra as { api: ApiService };
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

      return await api.mediaItems.mediaItemControllerCreate({ createMediaItemDto }).toPromise();
    } catch (err) {
      console.log(err);
    }
  }
);

export const updateMediaItem = createAsyncThunk(mediaItemActions.updateMediaItem.type, async (updateMediaItemDto: UpdateMediaItemDto, { extra }) => {
  const { api } = extra as { api: ApiService };
  return await api.mediaItems
    .mediaItemControllerUpdate({
      mediaId: updateMediaItemDto._id,
      updateMediaItemDto,
    })
    .toPromise();
});

export const shareMediaItem = createAsyncThunk(mediaItemActions.shareMediaItem.type, async (args: { id: string; userId: string }, { extra }) => {
  const { api } = extra as { api: ApiService };
  return await api.mediaItems
    .mediaItemControllerShare({
      mediaId: args.id,
      userId: args.userId,
    })
    .toPromise();
});

export const deleteMediaItem = createAsyncThunk(mediaItemActions.removeMediaItem.type, async (args: { id: string; key: string }, { extra }) => {
  const { api } = extra as { api: ApiService };
  const { id, key } = args;
  await deleteStorage(key);
  return await api.mediaItems.mediaItemControllerRemove({ mediaId: id }).toPromise();
});

export const getFeedMediaItems = createAsyncThunk(mediaItemActions.getFeedMediaItems.type, async () => {
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

export const saveFeedMediaItems = createAsyncThunk(mediaItemActions.saveFeedMediaItems.type, async ({ items }: { items: AwsMediaItem[] }, { extra }) => {
  const { api } = extra as { api: ApiService };

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
      // await deleteStorage(dto.title)), // TODO: DON'T DELETE THE ITEM FROM S3 STORAGE UPLOAD BUCKET UNTIL WE ARE READY FOR PROD
      return await api.mediaItems.mediaItemControllerCreate({ createMediaItemDto }).toPromise();
    });

  return await Promise.all(dtoPromises);
});

export const setActiveMediaItem = createAction<MediaItemResponseDto, 'setActiveMediaItem'>('setActiveMediaItem');

export const clearActiveMediaItem = createAction('clearActiveMediaItem');

export interface MediaItemState {
  getMediaItem: string;
  loading: boolean;
  file: any;
  entity: MediaItemResponseDto | undefined;
  mediaSrc: string;
  feed: { entities: AwsMediaItem[]; loading: boolean; loaded: boolean };
  loaded: boolean;
  createState: 'submitting' | 'progress' | 'empty';
}

export const mediaItemInitialState: MediaItemState = {
  getMediaItem: null,
  entity: undefined,
  loading: false,
  file: null,
  mediaSrc: mediaPlaceholder,
  createState: 'empty',
  feed: { entities: [] as AwsMediaItem[], loading: false, loaded: false },
  loaded: false,
};

const mediaItemSlice = createSlice({
  name: 'mediaItem',
  initialState: mediaItemInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMediaItemById.pending, (state) => ({
        ...state,
        entity: undefined,
        mediaSrc: mediaPlaceholder,
        loading: true,
        loaded: false,
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
      .addCase(
        addMediaItem.fulfilled,
        reduceFulfilledState((state, action) => ({
          ...state,
          getMediaItem: action.payload.uri,
          mediaSrc: mediaPlaceholder,
          loading: false,
          loaded: true,
        }))
      )
      // TODO: Finish implementing these!
      .addCase(updateMediaItem.pending, reducePendingState())
      .addCase(updateMediaItem.rejected, reduceRejectedState())
      .addCase(updateMediaItem.fulfilled, reduceFulfilledState())
      .addCase(shareMediaItem.pending, reducePendingState())
      .addCase(shareMediaItem.rejected, reduceRejectedState())
      .addCase(shareMediaItem.fulfilled, reduceFulfilledState())
      .addCase(deleteMediaItem.pending, reducePendingState())
      .addCase(deleteMediaItem.rejected, reduceRejectedState())
      .addCase(deleteMediaItem.fulfilled, reduceFulfilledState())
      .addCase(
        getFeedMediaItems.pending,
        reducePendingState((state) => ({
          ...state,
          feed: { entities: [], loading: true, loaded: false },
        }))
      )
      .addCase(
        getFeedMediaItems.rejected,
        reduceRejectedState((state) => ({
          ...state,
          feed: { entities: [], loading: false, loaded: true },
        }))
      )
      .addCase(
        getFeedMediaItems.fulfilled,
        reduceFulfilledState((state, action) => ({
          ...state,
          feed: { entities: Array.isArray(action.payload) ? action.payload : [], loading: false, loaded: true },
        }))
      )
      .addCase(saveFeedMediaItems.pending, reducePendingState())
      .addCase(saveFeedMediaItems.rejected, reduceRejectedState())
      .addCase(saveFeedMediaItems.fulfilled, reduceFulfilledState())
      .addCase(setActiveMediaItem, (state, action) => ({
        ...state,
        entity: action.payload,
        loading: false,
        loaded: true,
      }))
      .addCase(clearActiveMediaItem, (state) => ({
        ...state,
        entity: undefined,
        createState: 'empty',
        loading: false,
        loaded: true,
      }));
  },
});

export default mediaItemSlice;
export const reducer = mediaItemSlice.reducer;
