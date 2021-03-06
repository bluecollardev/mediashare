import { ObjectId } from 'mongodb';

function mapPlaylistItems(ids: string[], params: { userId: ObjectId; playlistId: ObjectId }) {
  const { userId, playlistId } = params;

  return ids.map((id) => ({
    userId,
    mediaId: new ObjectId(id),
    playlistId,
  }));
}

export { mapPlaylistItems };
