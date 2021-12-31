import Config from '../../../config';

// type MediaKeyUnionType<K, L> = KeyLabelType<K>
// declare function MakeVideoKey<K, L>(label: L, key: K): MediaKeyType<L>
const mediaRoot = Config.AWS_ROOT;

const videoRoot = Config.VIDEO_ROOT;
const thumbnailRoot = Config.THUMBNAIL_ROOT;
const uploadRoot = Config.UPLOAD_ROOT;
const awsUrl = Config.AWS_URL;
export interface KeyFactoryProps {
  root: string;
  thumbnailRoot: string;
  videoRoot: string;
  uploadRoot: string;
}

// eslint-disable-next-line no-shadow
function createKeyFactory({ root, thumbnailRoot, videoRoot, uploadRoot }: KeyFactoryProps) {
  return function (title: string) {
    const makeKey = <K extends string>(key: K) => `${root}${key}${title}`;

    const labelledVideo = makeKey(videoRoot) + '.mp4';
    const labelledThumbnail = makeKey(thumbnailRoot) + '.jpeg';
    const uploadKey = makeKey(uploadRoot);

    return {
      videoKey: labelledVideo,
      thumbnailKey: labelledThumbnail,
      uploadKey,
    };
  };
}

export const getVideoPath = (key = '') => mediaRoot + videoRoot + key;
export const getThumbnailPath = (key = '') => mediaRoot + thumbnailRoot + key;
export const getUploadPath = (key = '') => mediaRoot + uploadRoot + key;

const KeyFactory = createKeyFactory({ root: mediaRoot, videoRoot, thumbnailRoot, uploadRoot });
export { KeyFactory, mediaRoot, videoRoot, thumbnailRoot, uploadRoot, awsUrl };
