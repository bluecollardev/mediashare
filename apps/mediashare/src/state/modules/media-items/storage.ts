import { Storage } from 'aws-amplify';
import * as VideoThumbnails from 'expo-video-thumbnails';

import { KeyFactory, KeyFactoryProps, mediaRoot, uploadRoot, videoRoot } from './key-factory';

export interface StorageOptions {
  title?: string;
  description?: string;
  summary?: string;
  contentType?: string;
}

export interface PutStorageParams {
  file: any;
  key: string;
  options?: StorageOptions;
}

export function sanitizeFoldername(key: string, folder: string) {
  const test = key.replace(new RegExp(folder), '');
  return test;
}

export function getStorage(key: string) {
  return Storage.get(key);
}

export function downloadStorage(key: string): Promise<Object> {
  return Storage.get(key);
}

export function deleteStorage(key: string) {
  return Storage.remove(key);
}

export function listStorage(key: string) {
  return Storage.list(key, { download: true });
}

function copyStorageFactory({ root, uploadRoot, videoRoot }: Pick<KeyFactoryProps, 'root' | 'uploadRoot' | 'videoRoot'>) {
  return (key: string) => {
    const from = root + uploadRoot + key;

    const to = root + videoRoot + key;
    return Storage.copy({ key: from }, { key: to });
  };
}

export const copyStorage = copyStorageFactory({ root: mediaRoot, uploadRoot, videoRoot });

export function putToS3({ key, file, options = {} }: PutStorageParams) {
  const { title = '', description = '', summary = '', contentType = 'video/mp4' } = options;
  return Storage.put(key, file, { contentType, metadata: { summary, description }, contentDisposition: title });
}

export async function fetchMedia(path: string) {
  const response = await fetch(path);
  const blob = await response.blob();
  if (!blob) {
    console.log('no blob in storage.service/fetchmedia');
  }
  return blob;
}

export async function fetchAndPutToS3({ fileUri, key, options }: { fileUri: string; key: string; options?: StorageOptions }) {
  const file = await fetchMedia(fileUri);
  const putFile = await putToS3({ key, file, options });
  return putFile;
}

export async function uploadThumbnail({ fileUri, key }) {
  const { thumbnailKey } = KeyFactory(key);
  let item;
  try {
    console.log(`Get thumbnail [getThumbnailAsync] for file at URI: ${fileUri}`);
    item = await VideoThumbnails.getThumbnailAsync(fileUri);
    console.log('getThumbnailAsync response');
    console.log(item);
  } catch (err) {
    console.log('Error getting thumbnail [getThumbnailAsync]');
    console.log('You probably need to run yarn pre-ios to link the expo module');
  }

  const thumbnailResponse = (await fetchAndPutToS3({
    key: thumbnailKey,
    fileUri: item.uri,
    options: { contentType: 'image/jpeg' },
  })) as any;
  const getItem = await getStorage(thumbnailResponse.key);
  console.log('🚀 --------------------------------------------------------------------');
  console.log('🚀 ~ file: storage.ts ~ line 80 ~ uploadThumbnail ~ getItem', getItem);
  console.log('🚀 --------------------------------------------------------------------');
  return getItem;
}

export async function uploadMedia({ key, fileUri, options }: { key: string; fileUri: string; options: StorageOptions }) {
  const { videoKey, thumbnailKey } = KeyFactory(key);

  const { uri: thumbUri } = await VideoThumbnails.getThumbnailAsync(fileUri);
  const thumbnailResponse = await fetchAndPutToS3({
    key: thumbnailKey,
    fileUri: thumbUri,
    options: { contentType: 'image/jpeg' },
  });
  const videoResponse = await fetchAndPutToS3({ fileUri, key: videoKey, options });
  return { thumb: thumbnailResponse, video: videoResponse };
}
