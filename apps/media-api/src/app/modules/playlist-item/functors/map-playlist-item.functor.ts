import { ObjectId } from 'mongodb';

import * as R from 'remeda';

const mapPlaylistItem = (ids: string[]) => ids.map((mediaId) => ({ mediaId: mediaId }));

const mapUserIdToPlaylistItem = (userId: ObjectId) => ({ userId });

const mapPlaylistId = (playlistId: ObjectId) => ({ playlistId });

const toObjectId = (id: string) => new ObjectId(id);

function mapPlaylistItems(ids: string[], params: { userId: ObjectId; playlistId: ObjectId }) {
  const { userId, playlistId } = params;

  return ids.map((id) => ({
    userId,
    mediaId: new ObjectId(id),
    playlistId,
  }));
}

export { mapPlaylistItem, mapUserIdToPlaylistItem, mapPlaylistId, toObjectId, mapPlaylistItems };
