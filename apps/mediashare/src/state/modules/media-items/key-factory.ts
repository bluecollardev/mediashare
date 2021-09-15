// type MediaKeyUnionType<K, L> = KeyLabelType<K>

import Config from 'react-native-config';

// declare function MakeVideoKey<K, L>(label: L, key: K): MediaKeyType<L>
const mediaRoot = Config.AWS_ROOT;

const videoRoot = Config.VIDEO_ROOT;
const thumbnailRoot = Config.THUMBNAIL_ROOT;
const uploadRoot = Config.UPLOAD_ROOT;
export interface KeyFactoryProps {
  root: string;
  thumbnailRoot: string;
  videoRoot: string;
  uploadRoot: string;
}

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
const KeyFactory = createKeyFactory({ root: mediaRoot, videoRoot, thumbnailRoot, uploadRoot });
export { KeyFactory, mediaRoot, videoRoot, thumbnailRoot, uploadRoot };
