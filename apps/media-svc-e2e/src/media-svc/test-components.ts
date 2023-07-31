import { clone } from 'remeda';

export const testAndCloneMediaItem = (mediaItem, expected) => {
  expect(mediaItem._id).toBeDefined();
  expect(mediaItem.sub).toBeDefined();
  expect(mediaItem.mediaItemname).toEqual(expected.mediaItemname);
  expect(mediaItem.email).toEqual(expected.email);
  expect(mediaItem.firstName).toEqual(expected.firstName);
  expect(mediaItem.lastName).toEqual(expected.lastName);
  expect(mediaItem.createdAt).toBeDefined();
  expect(mediaItem.updatedDate).toBeDefined();
  return clone(mediaItem);
};

