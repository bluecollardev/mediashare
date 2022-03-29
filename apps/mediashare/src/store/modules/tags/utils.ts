// TODO: Where the f*ck is the _id property on Tag entity? Fix API...
// import { Tag } from 'mediashare/rxjs-api';

export const mapAvailableTags = (availableTags: any[]) =>
  [...availableTags]
    .filter((tag) => !!tag)
    .map(({ _id, key, value, isMediaTag, isPlaylistTag }) => ({
      _id,
      key: `${key}:${_id}`,
      value,
      isMediaTag,
      isPlaylistTag,
    }));

// Mapped tag id is formatted as follows: `${key}:${id}`
export const mapKeysToTags = (tagKeys: string[], availableTags: any[]) => {
  return [...tagKeys]
    .map((tagKey) => {
      return availableTags.find(({ key }) => {
        return key.split(':').shift() === tagKey;
      });
    });
}
