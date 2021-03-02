import { ObjectId } from 'mongodb';

import * as R from 'remeda';

const mapPlaylistItem = (ids: string[]) => ids.map((mediaId) => ({ mediaId: mediaId }));

const mapUserIdToPlaylistItem = (userId: ObjectId) => ({ userId });

const mapPlaylistId = (playlistId: ObjectId) => ({ playlistId });

const toObjectId = (id: string) => new ObjectId(id);

function mapPlaylistItems(ids: string[], params: { userId: ObjectId }) {
  const { userId: dtoUserId } = params;

  const userId = mapUserIdToPlaylistItem(dtoUserId);
  return ids.map((id) => ({
    ...userId,
    mediaId: new ObjectId(id),
  }));
}

export { mapPlaylistItem, mapUserIdToPlaylistItem, mapPlaylistId, toObjectId, mapPlaylistItems };
