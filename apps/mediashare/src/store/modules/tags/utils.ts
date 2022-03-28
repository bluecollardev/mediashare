export const mapAvailableTags = (availableTags) =>
  [...availableTags]
    .filter((tag) => !!tag)
    .map(({ _id, key, value, isMediaTag, isPlaylistTag }) => ({
      id: `${key}:${_id}`,
      name: value,
      isMediaTag,
      isPlaylistTag,
    }));

// Mapped tag id is formatted as follows: `${key}:${id}`
export const getMappedTagUsingKey = (mappedTags, selectedTagKey) =>
  [...mappedTags].find(({ id }) =>
    id.split(':').shift() === selectedTagKey);

