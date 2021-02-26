import { ObjectId } from 'mongodb';

import * as R from 'remeda';

const mapPlaylistItem = (ids: string[]) => ids.map((mediaId) => ({ mediaId: toObjectId(mediaId) }));

const mapUserIdToPlaylistItem = (userId: ObjectId) => ({ userId });

const mapPlaylistId = (playlistId: ObjectId) => ({ playlistId });

const toObjectId = (id: string) => new ObjectId(id);

function mapPlaylistItems(ids: string[], params: { userId: ObjectId; playlistId: ObjectId }) {
  const { userId: dtoUserId, playlistId: dtoPlaylistId } = params;

  const playlistId = mapPlaylistId(dtoPlaylistId);
  const userId = mapUserIdToPlaylistItem(dtoUserId);
  return R.pipe(
    mapPlaylistItem(ids),
    R.map((mediaItem) => R.merge(mediaItem, playlistId)),
    R.map((mediaItem) => R.merge(mediaItem, userId)),
    R.map((mediaItem) => R.merge(mediaItem, { _id: new ObjectId() }))
  );
}

export { mapPlaylistItem, mapUserIdToPlaylistItem, mapPlaylistId, toObjectId, mapPlaylistItems };
