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
    });
}

// Mapped tag id is formatted as follows: `${key}:${id}`
export const findMappedTagUsingKey = (mappedTags: any[], tagKey: string) => {
  return mappedTags.find(({ key }) => {
    return key.split(':').shift() === tagKey;
  });
}

// Maps selected tag keys to the TagKeyValue structure we use when embedding in Playlist or MediaItem docs
// Mapped (selectedTagKeys) tag id is formatted as follows: `${key}:${id}`
export const mapSelectedTagKeysToTagKeyValue = (selectedTagKeys: string[], availableTags: any[]) => {
  return selectedTagKeys.map((selectedTagKey) => {
      return availableTags.find(({ key }) => {
        return key === selectedTagKey
      });
    })
    .map(({ key, value }) => ({
      key: key.split(':').shift(),
      value
    }));
}



