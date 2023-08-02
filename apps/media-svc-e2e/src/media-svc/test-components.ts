import { clone } from 'remeda';

export const testAndCloneMediaItem = (mediaItem, expected) => {
  expect(mediaItem._id).toBeDefined();
  expect(mediaItem.createdAt).toBeDefined();
  expect(mediaItem.updatedDate).toBeDefined();
  return clone(mediaItem);
};

export const testAndClonePlaylistItem = (playlistItem, expected) => {
  expect(playlistItem._id).toBeDefined();
  expect(playlistItem.createdAt).toBeDefined();
  expect(playlistItem.updatedDate).toBeDefined();
  return clone(playlistItem);
};

export const testAndClonePlaylist = (playlist, expected) => {
  expect(playlist._id).toBeDefined();
  expect(playlist.createdAt).toBeDefined();
  expect(playlist.updatedDate).toBeDefined();
  return clone(playlist);
};
