import { ObjectId } from 'mongodb';

import { mapPlaylistId, mapUserIdToPlaylistItem, mapPlaylistItem, mapPlaylistItems } from './map-playlist-item.functor';

import * as R from 'remeda';
const createId = () => new ObjectId().toHexString();

describe('mapPlaylistItem', () => {
  it('should map playlist items', () => {
    const ids = R.range(0, 5).map(() => createId());

    const playlistItems = mapPlaylistItem(ids);

    expect(playlistItems).toHaveLength(5);
    expect(playlistItems[0]).toHaveProperty('mediaId');
  });
});

describe('toObjectId', () => {
  it('should return objectId values', () => {
    const ids = R.range(0, 5).map(() => createId());

    const mapPlaylistItem = ids;

    expect(mapPlaylistItem).toHaveLength(5);
  });
});

describe('mapUserIdToPlaylistItem', () => {
  it('should return userId fragment', () => {
    const id = new ObjectId();

    const userIdPair = mapUserIdToPlaylistItem(id);

    expect(userIdPair.userId).toBe(id);
  });
});

describe('mapPlaylistId', () => {
  it('should create playlistId fragment', () => {
    const id = new ObjectId();

    const playlistId = mapPlaylistId(id);
    expect(playlistId).toHaveProperty('playlistId');
    expect(playlistId.playlistId).toBe(id);
  });
});

describe('mapPlaylistItems', () => {
  it("should return an array of playlistDto's", () => {
    const ids = R.range(0, 5).map(() => createId());

    const userId = new ObjectId();
    const playlistId = new ObjectId();

    const mediaIds = ids;

    const mappedPlaylistItems = mapPlaylistItems(mediaIds, { userId, playlistId });

    expect(mappedPlaylistItems).toHaveLength(5);
    expect(mappedPlaylistItems[0]).toHaveProperty('mediaId');
    expect(mappedPlaylistItems[0]).toHaveProperty('userId');
    expect(mappedPlaylistItems[0]).toHaveProperty('playlistId');

    expect(mappedPlaylistItems[0].mediaId.toHexString()).toEqual(ids[0]);
    expect(mappedPlaylistItems[0].userId).toEqual(userId);
    expect(mappedPlaylistItems[0].playlistId).toEqual(playlistId);
  });
});
