// type MediaKeyUnionType<K, L> = KeyLabelType<K>
// declare function MakeVideoKey<K, L>(label: L, key: K): MediaKeyType<L>

function KeyFactory<A extends string>(title: A) {
  const makeKey = <K extends string>(key: K) => `${key}/${title}`;
  const thumbnail = 'thumbnail' as const;
  const video = 'video' as const;

  const labelledVideo = makeKey(video) + '.mp4';
  const labelledThumbnail = makeKey(thumbnail) + '.jpeg';
  return {
    videoKey: labelledVideo,
    thumbnailKey: labelledThumbnail,
  };
}

export { KeyFactory };
