import { createAction, createAsyncThunk, createReducer } from '@reduxjs/toolkit';
import { forkJoin, from, merge } from 'rxjs';
import { switchMap, take, tap } from 'rxjs/operators';
import * as VideoThumbnails from 'expo-video-thumbnails';
import Config from 'react-native-config';

import { makeEnum } from '../../core/factory';
import { apis, ApiService } from '../../apis';
import { CreateMediaItemDto, MediaItemDto } from '../../../rxjs-api';
import { copyStorage, deleteStorage, fetchMedia, getStorage, listStorage, sanitizeFoldername, uploadMedia, uploadThumbnail, putToS3 } from './storage';
import { KeyFactory, mediaRoot, thumbnailRoot, uploadRoot, videoRoot } from './key-factory';
import { getAllMedia } from './media-items';
import { AwsMediaItem } from './aws-media-item.model';
import { MediaCategoryType } from '../../../rxjs-api/models/MediaCategoryType';

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
export const selectMediaItem = createAction<MediaItemDto, 'selectMediaItem'>('selectMediaItem');
export const toggleMediaItem = createAction<number, 'selectMediaItem'>('selectMediaItem');
export const clearMediaItemSelection = createAction('clearMediaItems');
export const clearMediaItem = createAction('clearMediaItem');

export const getMediaItemById = createAsyncThunk(mediaItemActionTypes.getMediaItem, async ({ uri, mediaId }: { uri: string; mediaId: string }) => {
  const result = await forkJoin({
    mediaItem: apis.mediaItems.mediaItemControllerFindOne({ mediaId }).toPromise(),
    src: getStorage(uri),
  }).toPromise();
  apis.views.viewsControllerCreateMediaView({ mediaId }).pipe(take(1)).subscribe();
  return { mediaItem: result.mediaItem as MediaItemDto, src: result.src };
});

export const createThumbnail = createAsyncThunk('preview', async ({ fileUri, key }: { fileUri: string; key: string }) => {
  console.log('Creating thumbnail...');
  const thumb = await uploadThumbnail({ fileUri, key });
  console.log('Thumbnail creation response');
  console.log(thumb);
  return thumb;
});
export const addMediaItem = createAsyncThunk(
  mediaItemActionTypes.addMediaItem,
  async (dto: Pick<CreateMediaItemDto, 'category' | 'description' | 'summary' | 'title' | 'key' | 'uri'>) => {
    const { uri: fileUri, title, category, summary, description } = dto;
    try {
      const options = { description: dto.description, summary: dto.summary, contentType: 'video/mp4' };

      const { video } = await uploadMedia({ fileUri, key: title, options });
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
  const mediaItems = (await listStorage(mediaRoot + uploadRoot)) as AwsMediaItem[];
  const items = mediaItems
    .filter((item) => item.key !== mediaRoot + uploadRoot)
    .map((item) => ({
      etag: item.etag,
      size: typeof item.size === 'number' ? `${(item.size / (1024 * 1024)).toFixed(2)} MB` : '',
      lastModified: new Date(Date.parse(item.lastModified)).toDateString(),
      key: sanitizeFoldername(item.key, mediaRoot + uploadRoot),
    }));

  return items;
});

export const saveFeedMediaItems = createAsyncThunk(mediaItemActionTypes.saveFeedMediaItems, async ({ items }: { items: AwsMediaItem[] }) => {
  // const promises = ;
  console.log(items);

  const createThumbnailFactory = (item: CreateMediaItemDto) =>
    from(VideoThumbnails.getThumbnailAsync(s3Url + mediaRoot + videoRoot + item.title.replace(/\s/g, '%20'), { time: 100 })).pipe(
      tap((res) => {
        console.log(item.key);
        console.log(res);
      }),
      switchMap((thumbnail) => from(fetchMedia(thumbnail.uri))),
      tap((res) => {
        console.log(res);
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
  const result = await merge(...dtoPromises).toPromise();
  return result;
});
export const loadUserMediaItems = createAsyncThunk(mediaItemActionTypes.loadUserMediaItems, async () => {
  const mediaItems = await apis.user.userControllerGetMediaItems().toPromise();
  return mediaItems;
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

export const deleteMediaItem = createAsyncThunk(mediaItemActionTypes.removeMediaItem, async function (args: { id: string; key: string }, { extra }) {
  const { api } = extra as { api: ApiService };
  const { id, key } = args;
  const response = await api.mediaItems.mediaItemControllerRemove({ mediaId: id }).toPromise();
  await deleteStorage(key);

  // @ts-ignore
  return response;
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
  builder
    .addCase(createThumbnail.fulfilled, (state, action) => ({
      ...state,
      mediaSrc: action.payload as string,
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
    .addCase(getMediaItemById.rejected, (state) => ({ ...state, mediaItem: null }))
    .addCase(addMediaItem.pending, (state) => {
      return { ...state };
    })
    .addCase(addMediaItem.rejected, (state) => {
      return { ...state };
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
      return { ...state };
    })
    .addCase(getFeedMediaItems.rejected, (state) => {
      return { ...state };
    })
    .addCase(getFeedMediaItems.fulfilled, (state, action) => {
      return { ...state, feed: action.payload };
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
      return { ...state };
    })

    .addCase(findMediaItems.pending, (state) => {
      return { ...state };
    })
    .addCase(findMediaItems.fulfilled, (state, action) => {
      return {
        ...state,
        mediaItems: action.payload,
        loading: false,
        loaded: true,
      };
    })
    .addCase(loadUserMediaItems.fulfilled, (state, action) => {
      return { ...state, mediaItems: action.payload };
    })
    .addCase(clearMediaItemSelection, (state) => {
      return { ...state, mediaItems: [] };
    })

    .addCase(saveFeedMediaItems.pending, (state) => {
      return { ...state };
    })
    .addCase(saveFeedMediaItems.rejected, (state) => {
      return { ...state };
    })

    .addCase(saveFeedMediaItems.fulfilled, (state) => {
      return { ...state };
    });
});

export { mediaItemReducer, mediaItemsReducer };
