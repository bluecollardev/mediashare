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
  return key.replace(new RegExp(folder), '');
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

export function sanitizeKey(key: string) {
  return key.replace(/[\W_]+/g, '-');
}

export function titleFromKey(key: string) {
  // TODO: Decode all entities?
  return key.replace(/(\.(mp4|avi|mov))$/, '');
}

function copyStorageFactory({ root, uploadRoot, videoRoot }: Pick<KeyFactoryProps, 'root' | 'uploadRoot' | 'videoRoot'>) {
  return async (key: string) => {
    const from = root + uploadRoot + key;
    // We want to eliminate spaces (and possibly other things) from our filenames
    const to = root + videoRoot + sanitizeKey(key);
    try {
      return await Storage.copy({ key: from }, { key: to });
    } catch (err) {
      console.log(`[copyStorageFactory] Storage.copy from (${from}) to (${to}) failed`);
      console.log(err);
    }
  };
}

export const copyStorage = copyStorageFactory({ root: mediaRoot, uploadRoot, videoRoot });

export async function putToS3({ key, file, options = {} }: PutStorageParams) {
  const { title = '', description = '', summary = '', contentType = 'video/mp4' } = options;
  const result = await Storage.put(key, file, { contentType, metadata: { summary, description }, contentDisposition: title });
  console.log('PUT to S3 storage');
  console.log(result);
  return result;
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
  try {
    const file = await fetchMedia(fileUri);
    return await putToS3({ key, file, options });
  } catch (err) {
    console.log('[fetchAndPutToS3] fetchAndPutToS3 failed');
    console.log(err);
  }
}

async function getVideoThumbnailFromUri(fileUri) {
  let item;
  try {
    item = await VideoThumbnails.getThumbnailAsync(fileUri);
  } catch (err) {
    console.log('[getVideoThumbnailFromUri] Error getting thumbnail, getThumbnailAsync failed');
    console.log(`Make sure the file at [$fileUri] exists`);
    console.log('You may need to manually link the expo modules');
    console.log(err);
  }
  return item;
}

/**
 * @param fileUri The URI of the video file
 * @param key The ID key
 * @return string URL for uploaded AWS file
 */
export async function uploadThumbnailToS3({ fileUri, key }): Promise<string> {
  const { thumbnailKey } = KeyFactory(key);
  const { uri: thumbnailUri } = await getVideoThumbnailFromUri(fileUri);
  const payload = {
    key: thumbnailKey,
    fileUri: thumbnailUri,
    options: { contentType: 'image/jpeg' },
  };
  console.log(`[uploadThumbnailToS3] ${JSON.stringify(payload, null, 2)}`);
  const uploadResponse = await fetchAndPutToS3(payload);
  return await getStorage(uploadResponse.key);
}

export async function uploadMediaToS3({ fileUri, key, options }: { fileUri: string; key: string; options: StorageOptions }) {
  const { videoKey } = KeyFactory(key);
  const thumbnailResponse = uploadThumbnailToS3({ fileUri, key });
  const videoResponse = await fetchAndPutToS3({ fileUri, key: videoKey, options });
  return { thumb: thumbnailResponse, video: videoResponse };
}
