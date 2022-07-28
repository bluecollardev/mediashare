// TODO: Where the f*ck is the _id property on Tag entity? Fix API...
// import { Tag } from 'mediashare/rxjs-api';

export const mapAvailableTags = (availableTags: any[]) => {
  return [...availableTags]
    .filter((tag) => !!tag)
    .map(({ _id, key, value, isMediaTag, isPlaylistTag }) => ({
      _id,
      key: `${key}:${_id}`,
      value,
      isMediaTag,
      isPlaylistTag,
    }));
}

export const mappedKeysToTags = (mappedTagKeys: string[], availableTags: any[]) => {
  return [...mappedTagKeys]
    .map((mappedTagKey) => {
      return findMappedTagUsingKey(availableTags, mappedTagKey);
    }) // Filter out undefined tags so things don't blow up if that happens
    .filter((tag) => !!tag);
}

// Mapped tag id is formatted as follows: `${key}:${id}`
export const findMappedTagUsingKey = (mappedTags: any[], tagKey: string) => {
  return mappedTags.find(({ key }) => {
    return extractKey(key) === tagKey;
  });
}

// Maps selected tag keys to the TagKeyValue structure we use when embedding in Playlist or MediaItem docs
// Mapped (selectedTagKeys) tag id is formatted as follows: `${key}:${id}`
export const mapSelectedTagKeysToTagKeyValue = (selectedTagKeys: string[], availableTags: any[]) => {
  return selectedTagKeys.map((selectedTagKey) => {
      return availableTags.find(({ key }) => {
        return extractKey(key) === extractKey(selectedTagKey);
      });
    })
    .filter((tag) => !!tag) // If selectedTagKey isn't found, we could have undefined records, filter them out
    .map(({ key, value }) => ({
      key: extractKey(key),
      value
    }));
}

// Extract key from a string, this gets rid of the ObjectId in the string, returning just the key
export const extractKey = (key) => key.split(':').shift();



