import { createAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { makeActions } from 'mediashare/store/factory';
import { reduceFulfilledState, reducePendingState, reduceRejectedState } from 'mediashare/store/helpers';
import { ApiService } from 'mediashare/store/apis';
import { CreatePlaylistItemDto, UpdatePlaylistItemDto, PlaylistItemResponseDto, MediaCategoryType } from 'mediashare/rxjs-api';
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
const playlistItemActionNames = [
  'get_playlist_item',
  'create_playlist_item_thumbnail',
  'add_playlist_item',
  'update_playlist_item',
  'share_playlist_item',
  'remove_playlist_item',
  'upload_playlist_item',
  'get_feed_playlist_items',
  'save_feed_playlist_items',
  'clear_active_playlist_item',
] as const;

export const playlistItemActions = makeActions(playlistItemActionNames);

export const getPlaylistItemById = createAsyncThunk(playlistItemActions.getPlaylistItem.type, async ({ uri, playlistItemId }: { uri: string; playlistItemId: string }, { extra }) => {
  const { api } = extra as { api: ApiService };
  const result = await forkJoin({
    playlistItem: api.playlistItems.playlistItemControllerFindOne({ playlistItemId }).toPromise(),
    src: getStorage(uri),
  }).toPromise();
  // TODO: Update views, we don't have anything that handles playlist items
  // api.views.viewsControllerCreateMediaView({ playlistItemId }).pipe(take(1)).subscribe();
  return { playlistItem: result.playlistItem as PlaylistItemResponseDto, src: result.src };
});

export const createThumbnail = createAsyncThunk(playlistItemActions.createPlaylistItemThumbnail.type, async ({ fileUri, key }: { fileUri: string; key: string }) => {
  return await uploadThumbnailToS3({ fileUri, key });
});

export const addPlaylistItem = createAsyncThunk(
  playlistItemActions.addPlaylistItem.type,
  async (dto: Pick<CreatePlaylistItemDto, 'key' | 'title' | 'description' | 'summary' | 'category' | 'tags' | 'uri'>, { extra }) => {
    const { api } = extra as { api: ApiService };
    const { uri: fileUri, title, category, tags = [], summary, description } = dto;
    try {
      const options = { description: dto.description, summary: dto.summary, contentType: 'video/mp4' };
      const sanitizedKey = sanitizeKey(`${title}.${getFileExtension(fileUri)}`);
      const { video, thumbnail } = await uploadMediaToS3({ fileUri, key: sanitizedKey, options });
      if (!video) {
        throw new Error('[addPlaylistItem] video upload to S3 failed');
      }
      if (!thumbnail) {
        console.warn('[addPlaylistItem] thumbnail generation failed');
      }

      const { videoKey } = KeyFactory(sanitizedKey);
      const createPlaylistItemDto: CreatePlaylistItemDto = {
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

      return await api.playlistItems.playlistItemControllerCreate({ createPlaylistItemDto }).toPromise();
    } catch (err) {
      console.log(err);
    }
  }
);

export const updatePlaylistItem = createAsyncThunk(playlistItemActions.updatePlaylistItem.type, async (item: UpdatePlaylistItemDto, { extra }) => {
  const { api } = extra as { api: ApiService };
  return await api.playlistItems
    .playlistItemControllerUpdate({
      playlistItemId: item._id,
      updatePlaylistItemDto: item,
    })
    .toPromise();
});

export const sharePlaylistItem = createAsyncThunk(playlistItemActions.sharePlaylistItem.type, async (args: { id: string; userId: string }, { extra }) => {
  const { api } = extra as { api: ApiService };
  return await api.playlistItems
    .playlistItemControllerShare({
      playlistItemId: args.id,
      userId: args.userId,
    })
    .toPromise();
});

export const deletePlaylistItem = createAsyncThunk(playlistItemActions.removePlaylistItem.type, async (args: { id: string; key: string }, { extra }) => {
  const { api } = extra as { api: ApiService };
  const { id, key } = args;
  await deleteStorage(key);
  return await api.playlistItems.playlistItemControllerRemove({ playlistItemId: id }).toPromise();
});

export const getFeedPlaylistItems = createAsyncThunk(playlistItemActions.getFeedPlaylistItems.type, async () => {
  // TODO: Non-overlapping types here!
  const feedPlaylistItems = (await listStorage(getUploadPath())) as unknown as AwsMediaItem[];
  return feedPlaylistItems
    .filter((item) => item.key !== getUploadPath())
    .map((item) => ({
      etag: item.etag,
      size: typeof item.size === 'number' ? `${(item.size / (1024 * 1024)).toFixed(2)} MB` : '',
      lastModified: new Date(Date.parse(item.lastModified)).toDateString(),
      key: sanitizeFolderName(item.key, getUploadPath()),
    }));
});

export const saveFeedPlaylistItems = createAsyncThunk(playlistItemActions.saveFeedPlaylistItems.type, async ({ items }: { items: AwsMediaItem[] }, { extra }) => {
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
      const createPlaylistItemDto: CreatePlaylistItemDto = {
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
      return await api.playlistItems.playlistItemControllerCreate({ createPlaylistItemDto }).toPromise();
    });

  return await Promise.all(dtoPromises);
});

export const setActivePlaylistItem = createAction<PlaylistItemResponseDto, 'setActivePlaylistItem'>('setActivePlaylistItem');

export const clearActivePlaylistItem = createAction('clearActivePlaylistItem');

export interface PlaylistItemState {
  getPlaylistItem: string;
  loading: boolean;
  file: any;
  entity: PlaylistItemResponseDto | undefined;
  mediaSrc: string;
  feed: { entities: AwsMediaItem[]; loading: boolean; loaded: boolean };
  loaded: boolean;
  createState: 'submitting' | 'progress' | 'empty';
}

export const playlistItemInitialState: PlaylistItemState = {
  getPlaylistItem: null,
  entity: undefined,
  loading: false,
  file: null,
  mediaSrc: mediaPlaceholder,
  createState: 'empty',
  feed: { entities: [] as AwsMediaItem[], loading: false, loaded: false },
  loaded: false,
};

const playlistItemSlice = createSlice({
  name: 'playlistItem',
  initialState: playlistItemInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPlaylistItemById.pending, (state) => ({
        ...state,
        entity: undefined,
        mediaSrc: mediaPlaceholder,
        loading: true,
        loaded: false,
      }))
      .addCase(getPlaylistItemById.rejected, (state) => ({ ...state, entity: undefined }))
      .addCase(getPlaylistItemById.fulfilled, (state, action) => ({
        ...state,
        entity: action.payload.playlistItem,
        mediaSrc: action.payload.src as string,
        loading: false,
        loaded: true,
      }))
      .addCase(createThumbnail.fulfilled, (state, action) => ({
        ...state,
        mediaSrc: action.payload as string,
      }))
      .addCase(addPlaylistItem.pending, reducePendingState())
      .addCase(addPlaylistItem.rejected, reduceRejectedState())
      .addCase(
        addPlaylistItem.fulfilled,
        reduceFulfilledState((state, action) => ({
          ...state,
          getPlaylistItem: action.payload.uri,
          mediaSrc: mediaPlaceholder,
          loading: false,
          loaded: true,
        }))
      )
      // TODO: Finish implementing these!
      .addCase(updatePlaylistItem.pending, reducePendingState())
      .addCase(updatePlaylistItem.rejected, reduceRejectedState())
      .addCase(updatePlaylistItem.fulfilled, reduceFulfilledState())
      .addCase(sharePlaylistItem.pending, reducePendingState())
      .addCase(sharePlaylistItem.rejected, reduceRejectedState())
      .addCase(sharePlaylistItem.fulfilled, reduceFulfilledState())
      .addCase(deletePlaylistItem.pending, reducePendingState())
      .addCase(deletePlaylistItem.rejected, reduceRejectedState())
      .addCase(deletePlaylistItem.fulfilled, reduceFulfilledState())
      // TODO: Are we using these? Where?
      .addCase(
        getFeedPlaylistItems.pending,
        reducePendingState((state) => ({
          ...state,
          feed: { entities: [], loading: true, loaded: false },
        }))
      )
      .addCase(
        getFeedPlaylistItems.rejected,
        reduceRejectedState((state) => ({
          ...state,
          feed: { entities: [], loading: false, loaded: true },
        }))
      )
      .addCase(
        getFeedPlaylistItems.fulfilled,
        reduceFulfilledState((state, action) => ({
          ...state,
          feed: { entities: Array.isArray(action.payload) ? action.payload : [], loading: false, loaded: true },
        }))
      )
      .addCase(saveFeedPlaylistItems.pending, reducePendingState())
      .addCase(saveFeedPlaylistItems.rejected, reduceRejectedState())
      .addCase(saveFeedPlaylistItems.fulfilled, reduceFulfilledState())
      .addCase(setActivePlaylistItem, (state, action) => ({
        ...state,
        entity: action.payload,
        loading: false,
        loaded: true,
      }))
      .addCase(clearActivePlaylistItem, (state) => ({
        ...state,
        entity: undefined,
        createState: 'empty',
        loading: false,
        loaded: true,
      }));
  },
});

export default playlistItemSlice;
export const reducer = playlistItemSlice.reducer;
